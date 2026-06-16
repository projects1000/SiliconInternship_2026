import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HospitalService, ToastMessage, ChatChannel, ChatMessage } from './services/hospital.service';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  status: 'Available' | 'Busy' | 'Off Duty';
  phone: string;
  schedule: string;
}

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  disease: string;
  doctor: string;
  room: string;
  admissionDate: string;
}

interface Appointment {
  id: number;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

interface InvoiceItem {
  description: string;
  cost: number;
}

interface Invoice {
  id: string;
  patientName: string;
  date: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  insuranceCovered: number;
  patientCopay: number;
  insuranceProvider: string;
  total: number;
  status: 'Paid' | 'Unpaid' | 'Disputed' | 'Pending Insurance';
}

interface Bed {
  id: string;
  type: 'ICU' | 'General Ward' | 'Deluxe Cabin';
  status: 'Available' | 'Occupied' | 'Cleaning';
  patientName?: string;
}

interface Medicine {
  id: string;
  name: string;
  category: string;
  stock: number;
  unitPrice: number;
  expiryDate: string;
}

interface Prescription {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  medications: string;
  notes: string;
}

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit, OnDestroy {
  activeTab: 'dashboard' | 'appointments' | 'patients' | 'beds' | 'diagnostics' | 'pharmacy' | 'billing' | 'communications' = 'dashboard';

  @ViewChild('chatScrollContainer') private chatScrollContainer!: ElementRef;

  // Live Telemetry Vitals Simulation
  monitoredPatient = 'Alice Smith';
  heartRate = 72;
  bloodPressure = '120/80';
  oxygenSaturation = 98;
  temperature = 98.6;
  private vitalsTimer: any;

  // Search Filters
  searchPatientQuery = '';
  searchDoctorQuery = '';
  searchPharmacyQuery = '';
  searchProcedureQuery = '';
  chatSearchQuery = '';

  // Mock Databases
  doctors: Doctor[] = [
    { id: 1, name: 'Dr. Sarah Connor', specialty: 'Cardiology', status: 'Available', phone: '+1 555-0199', schedule: 'Mon - Fri, 9 AM - 4 PM' },
    { id: 2, name: 'Dr. John Doe', specialty: 'Neurology', status: 'Busy', phone: '+1 555-0182', schedule: 'Tue - Thu, 10 AM - 5 PM' },
    { id: 3, name: 'Dr. Elena Rostova', specialty: 'Pediatrics', status: 'Available', phone: '+1 555-0143', schedule: 'Mon - Thu, 8 AM - 2 PM' },
    { id: 4, name: 'Dr. Marcus Vance', specialty: 'Orthopedics', status: 'Off Duty', phone: '+1 555-0165', schedule: 'Fri - Sun, 12 PM - 8 PM' }
  ];

  patients: Patient[] = [
    { id: 101, name: 'Alice Smith', age: 34, gender: 'Female', disease: 'Chronic Arrhythmia', doctor: 'Dr. Sarah Connor', room: 'ICU-A1', admissionDate: '2026-06-05' },
    { id: 102, name: 'Bob Johnson', age: 45, gender: 'Male', disease: 'Migraine Aura', doctor: 'Dr. John Doe', room: 'Cabin-101', admissionDate: '2026-06-08' },
    { id: 103, name: 'Charlie Brown', age: 8, gender: 'Male', disease: 'Tonsillitis', doctor: 'Dr. Elena Rostova', room: 'Ward-B3', admissionDate: '2026-06-10' }
  ];

  appointments: Appointment[] = [
    { id: 1, patientName: 'David Miller', doctorName: 'Dr. Sarah Connor', date: '2026-06-11', time: '10:30 AM', priority: 'High', status: 'Scheduled' },
    { id: 2, patientName: 'Emma Watson', doctorName: 'Dr. Elena Rostova', date: '2026-06-11', time: '11:15 AM', priority: 'Medium', status: 'Scheduled' },
    { id: 3, patientName: 'Frank Sinatra', doctorName: 'Dr. John Doe', date: '2026-06-12', time: '02:00 PM', priority: 'Low', status: 'Scheduled' }
  ];

  beds: Bed[] = [
    { id: 'ICU-A1', type: 'ICU', status: 'Occupied', patientName: 'Alice Smith' },
    { id: 'ICU-A2', type: 'ICU', status: 'Available' },
    { id: 'ICU-A3', type: 'ICU', status: 'Cleaning' },
    { id: 'Ward-B1', type: 'General Ward', status: 'Available' },
    { id: 'Ward-B2', type: 'General Ward', status: 'Available' },
    { id: 'Ward-B3', type: 'General Ward', status: 'Occupied', patientName: 'Charlie Brown' },
    { id: 'Ward-B4', type: 'General Ward', status: 'Available' },
    { id: 'Cabin-101', type: 'Deluxe Cabin', status: 'Occupied', patientName: 'Bob Johnson' },
    { id: 'Cabin-102', type: 'Deluxe Cabin', status: 'Available' },
    { id: 'Cabin-103', type: 'Deluxe Cabin', status: 'Available' }
  ];

  pharmacy: Medicine[] = [
    { id: 'MED001', name: 'Amoxicillin 500mg', category: 'Antibiotic', stock: 120, unitPrice: 15.5, expiryDate: '2027-12-01' },
    { id: 'MED002', name: 'Insulin Glargine', category: 'Antidiabetic', stock: 45, unitPrice: 85.0, expiryDate: '2027-06-15' },
    { id: 'MED003', name: 'Atorvastatin 20mg', category: 'Cardiovascular', stock: 200, unitPrice: 22.0, expiryDate: '2028-02-28' },
    { id: 'MED004', name: 'Ibuprofen 400mg', category: 'Analgesic', stock: 18, unitPrice: 8.75, expiryDate: '2026-10-30' },
    { id: 'MED005', name: 'Albuterol Inhaler', category: 'Respiratory', stock: 65, unitPrice: 35.0, expiryDate: '2027-08-10' }
  ];

  prescriptions: Prescription[] = [
    { id: 'RX-8821', patientName: 'Alice Smith', doctorName: 'Dr. Sarah Connor', date: '2026-06-09', diagnosis: 'Heart Arrythmia', medications: 'Metoprolol 50mg (Once Daily), Aspirin 81mg (Morning)', notes: 'Avoid heavy cardiovascular strain for 1 week.' },
    { id: 'RX-9043', patientName: 'Bob Johnson', doctorName: 'Dr. John Doe', date: '2026-06-10', diagnosis: 'Acute Migraine', medications: 'Sumatriptan 50mg (At onset), Naproxen 500mg (As needed)', notes: 'Keep hydrated. Track trigger occurrences.' }
  ];

  invoices: Invoice[] = [
    {
      id: 'INV-2026-001',
      patientName: 'Alice Smith',
      date: '2026-06-09',
      items: [
        { description: 'Cardiology Consultation', cost: 150 },
        { description: 'ECG Test & Diagnostics', cost: 250 },
        { description: 'Room Rent (2 Days)', cost: 400 }
      ],
      subtotal: 800,
      tax: 80,
      insuranceCovered: 704,
      patientCopay: 176,
      insuranceProvider: 'Blue Cross Blue Shield',
      total: 176,
      status: 'Paid'
    },
    {
      id: 'INV-2026-002',
      patientName: 'Bob Johnson',
      date: '2026-06-10',
      items: [
        { description: 'Neurology Consultation', cost: 200 },
        { description: 'MRI Brain Scan', cost: 600 }
      ],
      subtotal: 800,
      tax: 80,
      insuranceCovered: 748,
      patientCopay: 132,
      insuranceProvider: 'Medicare Part B',
      total: 132,
      status: 'Unpaid'
    }
  ];

  // Forms Binding Models
  newAppointment: Partial<Appointment> = {
    patientName: '',
    doctorName: '',
    date: '',
    time: '',
    priority: 'Medium',
    status: 'Scheduled'
  };

  newPatient: Partial<Patient> = {
    name: '',
    age: undefined,
    gender: 'Male',
    disease: '',
    doctor: '',
    room: ''
  };

  newMedicine: Partial<Medicine> = {
    name: '',
    category: 'Analgesic',
    stock: undefined,
    unitPrice: undefined,
    expiryDate: ''
  };

  newPrescription: Partial<Prescription> = {
    patientName: '',
    doctorName: '',
    diagnosis: '',
    medications: '',
    notes: ''
  };

  newInvoice: Partial<Invoice> = {
    patientName: '',
    items: []
  };
  invoiceItemInput: InvoiceItem = { description: '', cost: undefined as any };

  selectedInvoice: Invoice | null = null;
  showInvoiceModal = false;

  // Bed allocation temp fields
  selectedBedForAllocation: Bed | null = null;
  allocationPatientName = '';
  showAllocationModal = false;

  // RxJS Streams State variables
  toasts: ToastMessage[] = [];
  channels: ChatChannel[] = [];
  activeChannelId = 'dr-sarah-alice';
  activeChannel: ChatChannel | null = null;
  newMessageText = '';
  activeChatRole: 'doctor' | 'patient' = 'patient';

  // Toggle Attachment Overlay
  showAttachmentOverlay = false;

  // SDE Billing Procedure Database
  procedures = [
    { code: 'CPT-99213', name: 'Cardiology Consultation', cost: 150 },
    { code: 'CPT-99214', name: 'Neurology Consultation', cost: 200 },
    { code: 'CPT-99215', name: 'Pediatric Consultation', cost: 120 },
    { code: 'CPT-70551', name: 'MRI Brain Scan', cost: 600 },
    { code: 'CPT-93000', name: 'ECG Diagnostic Test', cost: 250 },
    { code: 'CPT-36415', name: 'Blood Collection & Lab', cost: 80 },
    { code: 'CPT-99284', name: 'Emergency Room Services', cost: 450 },
    { code: 'CPT-94640', name: 'Inhalation Treatment', cost: 95 }
  ];

  // Insurance carrier profiles
  patientInsurances: { [patientName: string]: { provider: string; coveragePercent: number; policyNumber: string } } = {
    'Alice Smith': { provider: 'Blue Cross Blue Shield', coveragePercent: 80, policyNumber: 'POL-BC-99432' },
    'Bob Johnson': { provider: 'Medicare Part B', coveragePercent: 85, policyNumber: 'POL-MC-11043' },
    'Charlie Brown': { provider: 'Aetna Health Inc.', coveragePercent: 75, policyNumber: 'POL-AE-88432' }
  };

  activeInsuranceInfo = { provider: 'Uninsured', coveragePercent: 0, policyNumber: 'N/A' };

  private toastSub!: Subscription;
  private channelSub!: Subscription;
  private activeChannelSub!: Subscription;

  // Quick Suggestion Chips getter
  get currentSuggestionChips(): string[] {
    if (this.activeChannelId === 'dr-sarah-alice') {
      if (this.activeChatRole === 'patient') {
        return ['I feel dizzy 🤕', 'Ask about medications 💊', 'Thank you doctor! 👍', 'Morning report 📈'];
      } else {
        return ['Check your vitals please 🩺', 'Rest and stay hydrated 💧', 'The nurse is on the way 🏃‍♂️', 'Reviewing your charts 📋'];
      }
    } else if (this.activeChannelId === 'caresync-ai') {
      return ['analyze Alice Smith', 'suggest rx for Alice Smith', 'explain Arrhythmia', 'status', 'help ❓'];
    }
    return [];
  }

  constructor(private router: Router, private hospitalService: HospitalService) {}

  ngOnInit() {
    this.startVitalsSimulation();

    // Subscribe to custom Toast notifications stream
    this.toastSub = this.hospitalService.toast$.subscribe(toast => {
      this.toasts.push(toast);
      // Play a quick beep for incoming messages/success toasts
      if (toast.type === 'success') {
        this.playChatSound('receive');
      }
      setTimeout(() => {
        this.toasts = this.toasts.filter(t => t.id !== toast.id);
      }, toast.duration || 3000);
    });

    // Subscribe to Chat channels stream
    this.channelSub = this.hospitalService.channels$.subscribe(chans => {
      this.channels = chans;
      const prevActiveMsgsCount = this.activeChannel?.messages.length || 0;
      this.updateActiveChannel();
      
      // Auto-scroll and play sounds on message updates
      if (this.activeChannel && this.activeChannel.messages.length > prevActiveMsgsCount) {
        const lastMsg = this.activeChannel.messages[this.activeChannel.messages.length - 1];
        // Only play sound if it's an incoming message
        if (lastMsg && !lastMsg.isMe) {
          this.playChatSound('receive');
        }
        this.scrollToBottom();
      }
    });

    // Subscribe to active channel changes
    this.activeChannelSub = this.hospitalService.activeChannelId$.subscribe(id => {
      this.activeChannelId = id;
      this.updateActiveChannel();
      this.scrollToBottom();
    });
  }

  ngOnDestroy() {
    if (this.vitalsTimer) {
      clearInterval(this.vitalsTimer);
    }
    if (this.toastSub) this.toastSub.unsubscribe();
    if (this.channelSub) this.channelSub.unsubscribe();
    if (this.activeChannelSub) this.activeChannelSub.unsubscribe();
  }

  goBackToProfile() {
    this.router.navigate(['grp-a/member2']);
  }

  // ── Vitals Telemetry Simulator ──
  private startVitalsSimulation() {
    this.vitalsTimer = setInterval(() => {
      if (this.monitoredPatient === 'Alice Smith') {
        this.heartRate = Math.round(70 + Math.random() * 8);
        this.bloodPressure = '122/81';
        this.oxygenSaturation = Math.round(97 + Math.random() * 2);
        this.temperature = Math.round((98.4 + Math.random() * 0.4) * 10) / 10;
      } else if (this.monitoredPatient === 'Bob Johnson') {
        this.heartRate = Math.round(62 + Math.random() * 6);
        this.bloodPressure = '118/76';
        this.oxygenSaturation = Math.round(98 + Math.random() * 2);
        this.temperature = Math.round((97.9 + Math.random() * 0.3) * 10) / 10;
      } else if (this.monitoredPatient === 'Charlie Brown') {
        this.heartRate = Math.round(85 + Math.random() * 10);
        this.bloodPressure = '105/68';
        this.oxygenSaturation = Math.round(99 + Math.random() * 1);
        this.temperature = Math.round((99.1 + Math.random() * 0.5) * 10) / 10;
      } else {
        this.heartRate = Math.round(72 + Math.random() * 10);
        this.bloodPressure = '120/80';
        this.oxygenSaturation = 98;
        this.temperature = 98.6;
      }
    }, 2500);
  }

  // ── Dashboard Calculations ──
  get totalPatients() {
    return this.patients.length;
  }

  get activeDoctorsCount() {
    return this.doctors.filter(d => d.status === 'Available').length;
  }

  get pendingAppointments() {
    return this.appointments.filter(a => a.status === 'Scheduled').length;
  }

  get occupiedBedsCount() {
    return this.beds.filter(b => b.status === 'Occupied').length;
  }

  get roomOccupancyPercent() {
    return Math.round((this.occupiedBedsCount / this.beds.length) * 100) || 0;
  }

  get totalRevenue() {
    return this.invoices.filter(inv => inv.status === 'Paid').reduce((sum, inv) => sum + inv.patientCopay, 0);
  }

  get icuOccupancyPercent() {
    const icuBeds = this.beds.filter(b => b.type === 'ICU');
    const occupied = icuBeds.filter(b => b.status === 'Occupied').length;
    return Math.round((occupied / icuBeds.length) * 100) || 0;
  }

  get wardOccupancyPercent() {
    const wardBeds = this.beds.filter(b => b.type === 'General Ward');
    const occupied = wardBeds.filter(b => b.status === 'Occupied').length;
    return Math.round((occupied / wardBeds.length) * 100) || 0;
  }

  get cabinOccupancyPercent() {
    const cabinBeds = this.beds.filter(b => b.type === 'Deluxe Cabin');
    const occupied = cabinBeds.filter(b => b.status === 'Occupied').length;
    return Math.round((occupied / cabinBeds.length) * 100) || 0;
  }

  get hasLowStockMedicines() {
    return this.pharmacy.some(m => m.stock < 50);
  }

  // ── Search & Filter Getters ──
  get filteredPatients() {
    if (!this.searchPatientQuery.trim()) return this.patients;
    const q = this.searchPatientQuery.toLowerCase();
    return this.patients.filter(p => p.name.toLowerCase().includes(q) || p.disease.toLowerCase().includes(q) || p.doctor.toLowerCase().includes(q));
  }

  get filteredDoctors() {
    if (!this.searchDoctorQuery.trim()) return this.doctors;
    const q = this.searchDoctorQuery.toLowerCase();
    return this.doctors.filter(d => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q));
  }

  get filteredPharmacy() {
    if (!this.searchPharmacyQuery.trim()) return this.pharmacy;
    const q = this.searchPharmacyQuery.toLowerCase();
    return this.pharmacy.filter(m => m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q));
  }

  get filteredProcedures() {
    if (!this.searchProcedureQuery.trim()) return this.procedures;
    const q = this.searchProcedureQuery.toLowerCase();
    return this.procedures.filter(p => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q));
  }

  // Chat window message filter
  get filteredChatMessages(): ChatMessage[] {
    if (!this.activeChannel) return [];
    if (!this.chatSearchQuery.trim()) return this.activeChannel.messages;
    const q = this.chatSearchQuery.toLowerCase();
    return this.activeChannel.messages.filter(m => m.text.toLowerCase().includes(q) || m.sender.toLowerCase().includes(q));
  }

  // ── Doctor Availability Status ──
  toggleDoctorStatus(doctor: Doctor) {
    if (doctor.status === 'Available') {
      doctor.status = 'Busy';
    } else if (doctor.status === 'Busy') {
      doctor.status = 'Off Duty';
    } else {
      doctor.status = 'Available';
    }
    this.hospitalService.showToast(`Updated doctor status for ${doctor.name}`, 'info');
  }

  // ── Bed Allocation Methods ──
  openAllocationModal(bed: Bed) {
    this.selectedBedForAllocation = bed;
    this.allocationPatientName = '';
    this.showAllocationModal = true;
  }

  closeAllocationModal() {
    this.selectedBedForAllocation = null;
    this.showAllocationModal = false;
  }

  allocateBed() {
    if (!this.selectedBedForAllocation || !this.allocationPatientName.trim()) {
      this.hospitalService.showToast('Please select a patient to allocate.', 'error');
      return;
    }
    
    const bed = this.beds.find(b => b.id === this.selectedBedForAllocation!.id);
    if (bed) {
      bed.status = 'Occupied';
      bed.patientName = this.allocationPatientName;
      this.hospitalService.showToast(`Allocated bed ${bed.id} to ${this.allocationPatientName}`, 'success');
    }
    
    this.closeAllocationModal();
  }

  releaseBed(bed: Bed) {
    bed.status = 'Cleaning';
    const occupant = bed.patientName;
    bed.patientName = undefined;
    this.hospitalService.showToast(`Released occupant ${occupant} from bed ${bed.id}. Bed is sterilizing.`, 'info');
    
    setTimeout(() => {
      bed.status = 'Available';
      this.hospitalService.showToast(`Bed ${bed.id} is cleaned and available.`, 'success');
    }, 5000);
  }

  // ── Appointment Management ──
  bookAppointment() {
    if (!this.newAppointment.patientName || !this.newAppointment.doctorName || !this.newAppointment.date || !this.newAppointment.time) {
      this.hospitalService.showToast('Please fill out all fields to book an appointment.', 'error');
      return;
    }
    const id = this.appointments.length ? Math.max(...this.appointments.map(a => a.id)) + 1 : 1;
    this.appointments.unshift({
      id,
      patientName: this.newAppointment.patientName,
      doctorName: this.newAppointment.doctorName,
      date: this.newAppointment.date,
      time: this.newAppointment.time,
      priority: this.newAppointment.priority as any,
      status: 'Scheduled'
    });
    
    this.hospitalService.showToast(`Appointment booked successfully for ${this.newAppointment.patientName}`, 'success');

    this.newAppointment = {
      patientName: '',
      doctorName: '',
      date: '',
      time: '',
      priority: 'Medium',
      status: 'Scheduled'
    };
  }

  updateAppointmentStatus(appointment: Appointment, status: 'Scheduled' | 'Completed' | 'Cancelled') {
    appointment.status = status;
    this.hospitalService.showToast(`Appointment status changed to ${status}`, 'info');
  }

  // ── Patient Registrations ──
  registerPatient() {
    if (!this.newPatient.name || !this.newPatient.age || !this.newPatient.disease || !this.newPatient.doctor) {
      this.hospitalService.showToast('Please fill out all mandatory patient details.', 'error');
      return;
    }
    
    const id = this.patients.length ? Math.max(...this.patients.map(p => p.id)) + 1 : 101;
    const today = new Date().toISOString().split('T')[0];
    
    let allocatedRoom = this.newPatient.room || 'Unassigned';
    if (allocatedRoom) {
      const freeBed = this.beds.find(b => b.status === 'Available' && b.id.toLowerCase().includes(allocatedRoom.toLowerCase()));
      if (freeBed) {
        freeBed.status = 'Occupied';
        freeBed.patientName = this.newPatient.name;
        allocatedRoom = freeBed.id;
      }
    }

    this.patients.unshift({
      id,
      name: this.newPatient.name,
      age: Number(this.newPatient.age),
      gender: this.newPatient.gender || 'Male',
      disease: this.newPatient.disease,
      doctor: this.newPatient.doctor,
      room: allocatedRoom,
      admissionDate: today
    });
    
    this.hospitalService.showToast(`Patient ${this.newPatient.name} admitted successfully.`, 'success');

    this.newPatient = {
      name: '',
      age: undefined,
      gender: 'Male',
      disease: '',
      doctor: '',
      room: ''
    };
  }

  // ── Diagnostics & Prescription Builder ──
  generatePrescription() {
    if (!this.newPrescription.patientName || !this.newPrescription.doctorName || !this.newPrescription.diagnosis || !this.newPrescription.medications) {
      this.hospitalService.showToast('Please fill out diagnosis and medications.', 'error');
      return;
    }
    const id = `RX-${Math.round(1000 + Math.random() * 8999)}`;
    const today = new Date().toISOString().split('T')[0];

    this.prescriptions.unshift({
      id,
      patientName: this.newPrescription.patientName,
      doctorName: this.newPrescription.doctorName,
      date: today,
      diagnosis: this.newPrescription.diagnosis,
      medications: this.newPrescription.medications,
      notes: this.newPrescription.notes || 'No special dietary limits.'
    });

    this.hospitalService.showToast(`Generated Prescription Rx ${id}`, 'success');

    this.newPrescription = {
      patientName: '',
      doctorName: '',
      diagnosis: '',
      medications: '',
      notes: ''
    };
  }

  // ── Pharmacy Inventory Tracker ──
  restockMedicine(med: Medicine) {
    med.stock += 50;
    this.hospitalService.showToast(`Restocked ${med.name}: Added +50 units.`, 'success');
  }

  addNewMedicine() {
    if (!this.newMedicine.name || !this.newMedicine.category || !this.newMedicine.stock || !this.newMedicine.unitPrice || !this.newMedicine.expiryDate) {
      this.hospitalService.showToast('Please enter all details to register pharmacy items.', 'error');
      return;
    }
    const id = `MED00${this.pharmacy.length + 1}`;
    this.pharmacy.unshift({
      id,
      name: this.newMedicine.name,
      category: this.newMedicine.category,
      stock: Number(this.newMedicine.stock),
      unitPrice: Number(this.newMedicine.unitPrice),
      expiryDate: this.newMedicine.expiryDate
    });

    this.hospitalService.showToast(`Registered medicine ${this.newMedicine.name} to supply ledger`, 'success');

    this.newMedicine = {
      name: '',
      category: 'Analgesic',
      stock: undefined,
      unitPrice: undefined,
      expiryDate: ''
    };
  }

  // ── Advanced Billing System ──
  onInvoicePatientChange() {
    const patientName = this.newInvoice.patientName || '';
    const insurance = this.patientInsurances[patientName];
    if (insurance) {
      this.activeInsuranceInfo = { ...insurance };
    } else {
      this.activeInsuranceInfo = { provider: 'Uninsured', coveragePercent: 0, policyNumber: 'N/A' };
    }
    this.hospitalService.showToast(`Pulled insurance profile for ${patientName}`, 'info');
  }

  addProcedure(proc: any) {
    this.newInvoice.items = this.newInvoice.items || [];
    this.newInvoice.items.push({
      description: `${proc.name} (${proc.code})`,
      cost: proc.cost
    });
    this.hospitalService.showToast(`Added charge: ${proc.name} ($${proc.cost})`, 'success');
  }

  importBedCharges() {
    if (!this.newInvoice.patientName) {
      this.hospitalService.showToast('Please select a patient first.', 'warning');
      return;
    }
    const patient = this.patients.find(p => p.name === this.newInvoice.patientName);
    if (!patient) return;
    
    const bed = this.beds.find(b => b.patientName === patient.name || (b.status === 'Occupied' && b.id === patient.room));
    if (!bed) {
      this.hospitalService.showToast(`No active bed allocation found for ${patient.name}.`, 'warning');
      return;
    }
    
    const admission = new Date(patient.admissionDate);
    const today = new Date('2026-06-11');
    const diffTime = Math.abs(today.getTime() - admission.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    
    let rate = 50;
    if (bed.type === 'ICU') rate = 200;
    else if (bed.type === 'Deluxe Cabin') rate = 150;
    
    const totalCost = rate * diffDays;
    
    this.newInvoice.items = this.newInvoice.items || [];
    this.newInvoice.items.push({
      description: `Room Rent (${bed.type} - Bed ${bed.id}) for ${diffDays} days @ $${rate}/day`,
      cost: totalCost
    });
    
    this.hospitalService.showToast(`Imported bed charges: $${totalCost} for ${diffDays} days.`, 'success');
  }

  importPharmacyCharges() {
    if (!this.newInvoice.patientName) {
      this.hospitalService.showToast('Please select a patient first.', 'warning');
      return;
    }
    
    const prescription = this.prescriptions.find(p => p.patientName === this.newInvoice.patientName);
    if (!prescription) {
      this.hospitalService.showToast(`No prescription logs found for ${this.newInvoice.patientName}.`, 'warning');
      return;
    }
    
    let chargeAmount = 120;
    if (prescription.medications.toLowerCase().includes('metoprolol')) {
      chargeAmount += 45;
    }
    if (prescription.medications.toLowerCase().includes('amoxicillin')) {
      chargeAmount += 30;
    }
    if (prescription.medications.toLowerCase().includes('sumatriptan')) {
      chargeAmount += 60;
    }
    
    this.newInvoice.items = this.newInvoice.items || [];
    this.newInvoice.items.push({
      description: `Prescribed Medications (Rx: ${prescription.id})`,
      cost: chargeAmount
    });
    
    this.hospitalService.showToast(`Imported pharmacy medication charges: $${chargeAmount}`, 'success');
  }

  addInvoiceItem() {
    if (!this.invoiceItemInput.description || !this.invoiceItemInput.cost) {
      this.hospitalService.showToast('Please enter a description and cost.', 'error');
      return;
    }
    this.newInvoice.items = this.newInvoice.items || [];
    this.newInvoice.items.push({
      description: this.invoiceItemInput.description,
      cost: Number(this.invoiceItemInput.cost)
    });
    this.hospitalService.showToast(`Added custom charge: ${this.invoiceItemInput.description}`, 'success');
    this.invoiceItemInput = { description: '', cost: undefined as any };
  }

  removeInvoiceItem(index: number) {
    const item = this.newInvoice.items?.splice(index, 1)[0];
    if (item) {
      this.hospitalService.showToast(`Removed charge: ${item.description}`, 'info');
    }
  }

  get newInvoiceSubtotal() {
    return this.newInvoice.items?.reduce((sum, item) => sum + item.cost, 0) || 0;
  }

  createInvoice() {
    if (!this.newInvoice.patientName || !this.newInvoice.items || this.newInvoice.items.length === 0) {
      this.hospitalService.showToast('Please select a patient and add at least one charge.', 'error');
      return;
    }
    const subtotal = this.newInvoiceSubtotal;
    const tax = Math.round(subtotal * 0.1);
    const grossTotal = subtotal + tax;

    const insurance = this.patientInsurances[this.newInvoice.patientName];
    const provider = insurance ? insurance.provider : 'Uninsured';
    const coveragePercent = insurance ? insurance.coveragePercent : 0;

    const insuranceCovered = Math.round(grossTotal * (coveragePercent / 100));
    const patientCopay = grossTotal - insuranceCovered;

    const id = `INV-2026-00${this.invoices.length + 1}`;
    const today = new Date().toISOString().split('T')[0];

    const invoice: Invoice = {
      id,
      patientName: this.newInvoice.patientName,
      date: today,
      items: [...this.newInvoice.items],
      subtotal,
      tax,
      insuranceCovered,
      patientCopay,
      insuranceProvider: provider,
      total: patientCopay,
      status: insuranceCovered > 0 ? 'Pending Insurance' : 'Unpaid'
    };

    this.invoices.unshift(invoice);

    this.hospitalService.showToast(`Invoice ${id} generated successfully!`, 'success');

    this.newInvoice = {
      patientName: '',
      items: []
    };
    this.activeInsuranceInfo = { provider: 'Uninsured', coveragePercent: 0, policyNumber: 'N/A' };
  }

  payInvoice(invoice: Invoice) {
    invoice.status = 'Paid';
    this.hospitalService.showToast(`Payment approved: Invoice ${invoice.id} settled.`, 'success');
  }

  viewInvoice(invoice: Invoice) {
    this.selectedInvoice = invoice;
    this.showInvoiceModal = true;
  }

  closeInvoiceModal() {
    this.selectedInvoice = null;
    this.showInvoiceModal = false;
  }

  // ── WhatsApp Chat Methods ──
  updateActiveChannel() {
    this.activeChannel = this.channels.find(c => c.id === this.activeChannelId) || null;
  }

  selectChannel(id: string) {
    this.hospitalService.setActiveChannel(id);
    this.chatSearchQuery = ''; // Clear search on channel switch
    this.scrollToBottom();
  }

  sendChatMessage() {
    if (!this.newMessageText.trim() || !this.activeChannelId) return;

    let sender = 'Clinician';
    let isMe = true;

    if (this.activeChannelId === 'dr-sarah-alice') {
      if (this.activeChatRole === 'doctor') {
        sender = 'Dr. Sarah Connor';
        isMe = true;
      } else {
        sender = 'Alice Smith';
        isMe = false;
      }
    } else if (this.activeChannelId === 'caresync-ai') {
      sender = 'Clinician';
      isMe = true;
    }

    const currentVitals = {
      heartRate: this.heartRate,
      bloodPressure: this.bloodPressure,
      oxygenSaturation: this.oxygenSaturation,
      temperature: this.temperature,
      totalPatients: this.totalPatients,
      activeDoctorsCount: this.activeDoctorsCount,
      roomOccupancyPercent: this.roomOccupancyPercent
    };

    // Play sending beep sound
    this.playChatSound('send');

    this.hospitalService.sendMessage(
      this.activeChannelId,
      sender,
      this.newMessageText,
      isMe,
      currentVitals
    );

    this.newMessageText = '';
  }

  // Quick Send suggestions chips
  quickSendChip(chipText: string) {
    // Trim emoji icon from AI prompt if it's there
    let prompt = chipText;
    if (chipText.endsWith(' 🤕')) prompt = 'I feel dizzy';
    else if (chipText.endsWith(' 💊')) prompt = 'When should I take Metoprolol?';
    else if (chipText.endsWith(' 👍')) prompt = 'Thank you doctor!';
    else if (chipText.endsWith(' 📈')) prompt = 'Morning checkup request';
    else if (chipText.endsWith(' 🩺')) prompt = 'Check your vitals please';
    else if (chipText.endsWith(' 💧')) prompt = 'Rest and stay hydrated';
    else if (chipText.endsWith(' 🏃‍♂️')) prompt = 'The nurse is on the way';
    else if (chipText.endsWith(' 📋')) prompt = 'Reviewing your charts';
    else if (chipText.endsWith(' ❓')) prompt = 'help';

    this.newMessageText = prompt;
    this.sendChatMessage();
  }

  // Simulated File Attachment
  attachMockFile(fileType: 'ecg' | 'lab') {
    let text = '';
    if (fileType === 'ecg') {
      text = '📎 Attached Document: [ECG_Telemetry_AliceSmith.pdf]\nVisual analysis indicates stable QRS complex. Heart rate is active.';
    } else {
      text = '📎 Attached Document: [Diagnostic_Lab_Report_AliceSmith.pdf]\nHemoglobin: 14.2 g/dL, White Blood Cell: 7,500/mcL. Normal parameters.';
    }
    this.newMessageText = text;
    this.sendChatMessage();
    this.showAttachmentOverlay = false;
  }

  // Emoji input appender
  addEmoji(emoji: string) {
    this.newMessageText += emoji;
  }

  // Dynamic Scroll to Bottom
  scrollToBottom(): void {
    try {
      setTimeout(() => {
        if (this.chatScrollContainer) {
          this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
        }
      }, 50);
    } catch(err) {}
  }

  // Web Audio API Sound generator
  playChatSound(type: 'send' | 'receive') {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'send') {
        osc.frequency.setValueAtTime(650, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else {
        // Double chime
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
        
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.frequency.setValueAtTime(680, ctx.currentTime + 0.08);
        gain2.gain.setValueAtTime(0.04, ctx.currentTime + 0.08);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        osc2.start();
        osc2.stop(ctx.currentTime + 0.22);
      }
    } catch (e) {
      console.log('Audio Context error or block:', e);
    }
  }

  // Markdown formatter regex helper
  formatMessageText(text: string): string {
    if (!text) return '';
    let html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    // Convert Markdown syntax into HTML
    html = html.replace(/^### (.*$)/gim, '<h5 class="chat-md-header">$1</h5>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/^\s*[-*]\s+(.*$)/gim, '<li class="chat-md-li">$1</li>');
    html = html.replace(/`(.*?)`/g, '<code class="chat-md-code">$1</code>');
    html = html.replace(/\n/g, '<br/>');
    
    return html;
  }
}

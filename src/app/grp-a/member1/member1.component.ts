import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface AttendanceRecord {
  status: 'Present' | 'Absent' | 'Late' | 'Leave' | 'Unmarked';
  checkIn?: string;
  checkOut?: string;
  ip?: string;
  latitude?: number;
  longitude?: number;
  notes?: string;
}

interface CalendarDay {
  date: number | null;
  dateStr: string;
  isToday: boolean;
  isWeekend: boolean;
  record?: AttendanceRecord;
}

@Component({
  selector: 'app-member1',
  templateUrl: './member1.component.html',
  styleUrls: ['./member1.component.css']
})
export class Member1Component implements OnInit {
  // Navigation / View State
  activeTab: 'profile' | 'attendance' = 'profile';
  showSettings: boolean = false;

  // Profile Details
  profile = {
    name: 'Soyngsruti Jena',
    role: 'Member 1 - Group A | Angular Developer',
    headline: 'Creative Frontend Developer & UI/UX Enthusiast',
    bio: 'A technology enthusiast and creative thinker. I love developing responsive web applications using Angular, combining clean code with expressive, glassmorphic styles. Always eager to learn new paradigms and collaborate with peers to build products that make a difference.',
    email: 'soyngsruti.jena@gmail.com',
    phone: '+91 70081 23456',
    college: 'Silicon University, Bhubaneswar',
    course: 'B.Tech / Computer Science & Engineering',
    year: '3rd Year (Batch of 2026)',
    github: 'https://github.com/soyngsruti',
    linkedin: 'https://linkedin.com/in/soyngsruti',
    skills: ['Angular', 'TypeScript', 'HTML5 & CSS3', 'JavaScript (ES6+)', 'RxJS', 'Git & GitHub', 'Figma (UI/UX)', 'Responsive Web Design'],
    interests: ['Web Development', 'UI/UX Design', 'Open Source Contribution', 'Painting & Sketching', 'Digital Photography']
  };

  // Calendar State
  currentDate: Date = new Date();
  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();
  calendarDays: CalendarDay[] = [];
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Attendance Records Store
  // Key format: YYYY-MM-DD
  attendanceRecords: { [key: string]: AttendanceRecord } = {};

  // Advanced Attendance Settings
  settings = {
    targetPercentage: 85,
    shiftStartTime: '09:00',
    shiftEndTime: '17:00',
    gracePeriod: 15, // in minutes
    geofenceEnabled: true,
    campusLat: 20.3503, // Silicon University Latitude
    campusLng: 85.8033, // Silicon University Longitude
    geofenceRadius: 150, // in meters
    mockUserLat: 20.3501, // Mock user within geofence
    mockUserLng: 85.8031,
    ipEnabled: true,
    campusSubnet: '192.168.1',
    mockUserIp: '192.168.1.45',
    emailAlerts: true,
    lowAttendanceWarning: true
  };

  // Live Stats
  stats = {
    totalLogged: 0,
    present: 0,
    absent: 0,
    late: 0,
    leave: 0,
    percentage: 0,
    meetsTarget: true,
    streak: 0
  };

  // Check-in Simulation State
  checkInMessage: string = '';
  checkInMessageType: 'success' | 'error' | 'info' | '' = '';
  isTodayCheckedIn: boolean = false;
  isTodayCheckedOut: boolean = false;
  todayCheckInTime: string = '--:--';
  todayCheckOutTime: string = '--:--';

  // Local Storage Keys
  private STORAGE_RECORDS_KEY = 'sruti_attendance_records';
  private STORAGE_SETTINGS_KEY = 'sruti_attendance_settings';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadSettings();
    this.loadRecords();
    this.generateCalendar();
    this.calculateStats();
    this.checkTodayStatus();
  }

  // Go back to the Group page
  goBackToGroup(): void {
    this.router.navigate(['grp-a']);
  }

  // Load from Local Storage
  loadSettings(): void {
    const saved = localStorage.getItem(this.STORAGE_SETTINGS_KEY);
    if (saved) {
      try {
        this.settings = { ...this.settings, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Failed to parse settings', e);
      }
    }
  }

  loadRecords(): void {
    const saved = localStorage.getItem(this.STORAGE_RECORDS_KEY);
    if (saved) {
      try {
        this.attendanceRecords = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse records', e);
      }
    } else {
      // Seed some demo records for the current and previous month to look realistic
      this.seedDemoData();
    }
  }

  // Save to Local Storage
  saveSettings(): void {
    localStorage.setItem(this.STORAGE_SETTINGS_KEY, JSON.stringify(this.settings));
    this.calculateStats();
    this.checkTodayStatus();
  }

  saveRecords(): void {
    localStorage.setItem(this.STORAGE_RECORDS_KEY, JSON.stringify(this.attendanceRecords));
    this.calculateStats();
    this.generateCalendar();
    this.checkTodayStatus();
  }

  // Seed data to make the initial screen look rich and filled
  seedDemoData(): void {
    const today = new Date();
    // Generate records for the last 30 days (excluding weekends)
    for (let i = 25; i > 0; i--) {
      const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const dayOfWeek = d.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) continue; // Skip weekends

      const dateStr = this.formatDate(d);
      
      // Randomly assign statuses: 75% Present, 15% Late, 5% Leave, 5% Absent
      const rand = Math.random();
      let status: 'Present' | 'Absent' | 'Late' | 'Leave';
      let checkIn = '08:50';
      let checkOut = '17:05';
      let notes = 'Regular workday';

      if (rand < 0.75) {
        status = 'Present';
        checkIn = `08:${String(Math.floor(Math.random() * 10) + 45).padStart(2, '0')}`;
      } else if (rand < 0.90) {
        status = 'Late';
        const mins = Math.floor(Math.random() * 20) + 16; // past 9:15
        checkIn = `09:${String(mins).padStart(2, '0')}`;
        notes = 'Arrived late due to heavy traffic';
      } else if (rand < 0.95) {
        status = 'Leave';
        checkIn = '';
        checkOut = '';
        notes = 'Medical leave';
      } else {
        status = 'Absent';
        checkIn = '';
        checkOut = '';
        notes = 'Absent without notice';
      }

      this.attendanceRecords[dateStr] = {
        status,
        checkIn: checkIn || undefined,
        checkOut: checkOut || undefined,
        ip: '192.168.1.12',
        latitude: 20.3503,
        longitude: 85.8033,
        notes
      };
    }
    this.saveRecords();
  }

  // Format date helper
  formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // Calendar Engine
  generateCalendar(): void {
    this.calendarDays = [];
    
    // First day of the month
    const firstDayIndex = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
    // Number of days in current month
    const totalDays = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
    // Number of days in previous month
    const prevMonthDays = new Date(this.selectedYear, this.selectedMonth, 0).getDate();

    // Fill previous month's empty padding slots
    for (let i = firstDayIndex; i > 0; i--) {
      const dayNum = prevMonthDays - i + 1;
      const prevDate = new Date(this.selectedYear, this.selectedMonth - 1, dayNum);
      const dateStr = this.formatDate(prevDate);
      this.calendarDays.push({
        date: null, // represents inactive/padding days
        dateStr,
        isToday: false,
        isWeekend: prevDate.getDay() === 0 || prevDate.getDay() === 6,
        record: this.attendanceRecords[dateStr] || { status: 'Unmarked' }
      });
    }

    // Fill current month days
    const todayStr = this.formatDate(new Date());
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(this.selectedYear, this.selectedMonth, i);
      const dateStr = this.formatDate(date);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      
      this.calendarDays.push({
        date: i,
        dateStr,
        isToday: dateStr === todayStr,
        isWeekend,
        record: this.attendanceRecords[dateStr] || { status: 'Unmarked' }
      });
    }

    // Fill next month's padding slots to complete calendar grid rows
    const totalSlots = this.calendarDays.length;
    const remainingSlots = totalSlots % 7 === 0 ? 0 : 7 - (totalSlots % 7);
    for (let i = 1; i <= remainingSlots; i++) {
      const nextDate = new Date(this.selectedYear, this.selectedMonth + 1, i);
      const dateStr = this.formatDate(nextDate);
      this.calendarDays.push({
        date: null,
        dateStr,
        isToday: false,
        isWeekend: nextDate.getDay() === 0 || nextDate.getDay() === 6,
        record: this.attendanceRecords[dateStr] || { status: 'Unmarked' }
      });
    }
  }

  // Navigate Months
  prevMonth(): void {
    if (this.selectedMonth === 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.selectedMonth === 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }
    this.generateCalendar();
  }

  // Manual Toggle Attendance on Calendar Click
  toggleDayStatus(day: CalendarDay): void {
    if (!day.date) return; // Pad slots are not toggleable

    const dateStr = day.dateStr;
    const currentRecord = this.attendanceRecords[dateStr] || { status: 'Unmarked' };
    let newStatus: 'Present' | 'Absent' | 'Late' | 'Leave' | 'Unmarked';

    switch (currentRecord.status) {
      case 'Unmarked':
        newStatus = 'Present';
        break;
      case 'Present':
        newStatus = 'Late';
        break;
      case 'Late':
        newStatus = 'Leave';
        break;
      case 'Leave':
        newStatus = 'Absent';
        break;
      case 'Absent':
      default:
        newStatus = 'Unmarked';
        break;
    }

    if (newStatus === 'Unmarked') {
      delete this.attendanceRecords[dateStr];
    } else {
      this.attendanceRecords[dateStr] = {
        status: newStatus,
        checkIn: newStatus === 'Present' ? '08:55' : (newStatus === 'Late' ? '09:20' : undefined),
        checkOut: (newStatus === 'Present' || newStatus === 'Late') ? '17:00' : undefined,
        ip: '192.168.1.45',
        latitude: 20.3503,
        longitude: 85.8033,
        notes: `Manually marked as ${newStatus}`
      };
    }

    this.saveRecords();
  }

  // Live Stats calculations
  calculateStats(): void {
    let present = 0;
    let absent = 0;
    let late = 0;
    let leave = 0;

    const keys = Object.keys(this.attendanceRecords);
    keys.forEach(key => {
      const record = this.attendanceRecords[key];
      if (record.status === 'Present') present++;
      else if (record.status === 'Absent') absent++;
      else if (record.status === 'Late') late++;
      else if (record.status === 'Leave') leave++;
    });

    const totalLogged = present + absent + late + leave;
    
    // Attendance rate formula: (Present + Late) / (Total logged) * 100
    // Leaves do not count against the rate in standard systems, or we can include them.
    // Let's use (Present + Late) / (Present + Late + Absent) as standard.
    const denominator = present + late + absent;
    const rate = denominator > 0 ? Math.round(((present + late) / denominator) * 100) : 100;

    this.stats.totalLogged = totalLogged;
    this.stats.present = present;
    this.stats.absent = absent;
    this.stats.late = late;
    this.stats.leave = leave;
    this.stats.percentage = rate;
    this.stats.meetsTarget = rate >= this.settings.targetPercentage;

    // Calculate Streak (Consecutive Present/Late days backwards from today)
    this.stats.streak = this.calculateStreak();
  }

  calculateStreak(): number {
    let streak = 0;
    const today = new Date();
    
    // Check backwards day-by-day
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const isWeekend = checkDate.getDay() === 0 || checkDate.getDay() === 6;
      if (isWeekend) continue; // Skip weekend in streak calculation

      const dateStr = this.formatDate(checkDate);
      const record = this.attendanceRecords[dateStr];

      if (record && (record.status === 'Present' || record.status === 'Late')) {
        streak++;
      } else if (record && (record.status === 'Absent' || record.status === 'Leave')) {
        break; // Streak broken
      } else {
        // Unmarked day. If it's today and not checked in yet, continue check.
        if (i === 0) continue;
        break; // Otherwise, break
      }
    }
    return streak;
  }

  // Check today's check-in/out status
  checkTodayStatus(): void {
    const todayStr = this.formatDate(new Date());
    const todayRecord = this.attendanceRecords[todayStr];
    
    if (todayRecord) {
      this.isTodayCheckedIn = !!todayRecord.checkIn;
      this.isTodayCheckedOut = !!todayRecord.checkOut;
      this.todayCheckInTime = todayRecord.checkIn || '--:--';
      this.todayCheckOutTime = todayRecord.checkOut || '--:--';
    } else {
      this.isTodayCheckedIn = false;
      this.isTodayCheckedOut = false;
      this.todayCheckInTime = '--:--';
      this.todayCheckOutTime = '--:--';
    }
  }

  // Geofence Distance Calculator (Haversine Formula)
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Earth radius in meters
    const phi1 = lat1 * Math.PI / 180;
    const phi2 = lat2 * Math.PI / 180;
    const deltaPhi = (lat2 - lat1) * Math.PI / 180;
    const deltaLambda = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }

  // Check-In Action simulation
  simulateCheckIn(): void {
    const todayStr = this.formatDate(new Date());
    
    if (this.isTodayCheckedIn) {
      this.checkInMessage = 'You are already checked in for today!';
      this.checkInMessageType = 'info';
      return;
    }

    // 1. Geofence Verification
    if (this.settings.geofenceEnabled) {
      const distance = this.calculateDistance(
        this.settings.mockUserLat, this.settings.mockUserLng,
        this.settings.campusLat, this.settings.campusLng
      );
      
      if (distance > this.settings.geofenceRadius) {
        this.checkInMessage = `Check-In Failed! You are outside the campus boundary. Distance: ${Math.round(distance)}m (Allowed: ${this.settings.geofenceRadius}m)`;
        this.checkInMessageType = 'error';
        return;
      }
    }

    // 2. IP Subnet Verification
    if (this.settings.ipEnabled) {
      if (!this.settings.mockUserIp.startsWith(this.settings.campusSubnet)) {
        this.checkInMessage = `Check-In Failed! Connected to untrusted network IP: ${this.settings.mockUserIp} (Expected subnet: ${this.settings.campusSubnet}.x)`;
        this.checkInMessageType = 'error';
        return;
      }
    }

    // 3. Time Evaluation for Late Status
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const currentTimeStr = `${hh}:${mm}`;

    // Parse shift start time and grace period
    const [startH, startM] = this.settings.shiftStartTime.split(':').map(Number);
    const limitMinutes = startH * 60 + startM + this.settings.gracePeriod;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    let status: 'Present' | 'Late' = 'Present';
    let notes = 'Checked in via web portal';

    if (currentMinutes > limitMinutes) {
      status = 'Late';
      notes = `Late check-in at ${currentTimeStr} (Grace limit: ${this.settings.shiftStartTime} + ${this.settings.gracePeriod} mins)`;
    }

    // Save record
    this.attendanceRecords[todayStr] = {
      status,
      checkIn: currentTimeStr,
      ip: this.settings.mockUserIp,
      latitude: this.settings.mockUserLat,
      longitude: this.settings.mockUserLng,
      notes
    };

    this.checkInMessage = `Check-in successful! Logged as ${status} at ${currentTimeStr}.`;
    this.checkInMessageType = 'success';
    
    this.saveRecords();
  }

  // Check-Out Action simulation
  simulateCheckOut(): void {
    const todayStr = this.formatDate(new Date());

    if (!this.isTodayCheckedIn) {
      this.checkInMessage = 'You must check in first before checking out!';
      this.checkInMessageType = 'error';
      return;
    }

    if (this.isTodayCheckedOut) {
      this.checkInMessage = 'You have already checked out for today!';
      this.checkInMessageType = 'info';
      return;
    }

    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const currentTimeStr = `${hh}:${mm}`;

    const record = this.attendanceRecords[todayStr];
    record.checkOut = currentTimeStr;
    record.notes += `, checked out at ${currentTimeStr}.`;

    this.checkInMessage = `Check-out successful! Logged at ${currentTimeStr}.`;
    this.checkInMessageType = 'success';

    this.saveRecords();
  }

  // Quick preset simulation to check in at exactly 8:52 AM (On-time)
  simulateOnTimeCheckIn(): void {
    const todayStr = this.formatDate(new Date());
    
    this.attendanceRecords[todayStr] = {
      status: 'Present',
      checkIn: '08:52',
      checkOut: '17:02',
      ip: this.settings.mockUserIp,
      latitude: 20.3503,
      longitude: 85.8033,
      notes: 'Simulated On-Time check-in'
    };

    this.checkInMessage = 'Simulated on-time check-in successfully!';
    this.checkInMessageType = 'success';
    this.saveRecords();
  }

  // Quick preset simulation to check in at exactly 9:25 AM (Late)
  simulateLateCheckIn(): void {
    const todayStr = this.formatDate(new Date());
    
    this.attendanceRecords[todayStr] = {
      status: 'Late',
      checkIn: '09:25',
      checkOut: '17:05',
      ip: this.settings.mockUserIp,
      latitude: 20.3503,
      longitude: 85.8033,
      notes: 'Simulated Late check-in (grace exceeded)'
    };

    this.checkInMessage = 'Simulated late check-in successfully!';
    this.checkInMessageType = 'success';
    this.saveRecords();
  }

  // Clear / Reset All Data
  resetAllData(): void {
    const confirmReset = confirm('Are you sure you want to delete all attendance history and restore default settings? This cannot be undone.');
    if (confirmReset) {
      localStorage.removeItem(this.STORAGE_RECORDS_KEY);
      localStorage.removeItem(this.STORAGE_SETTINGS_KEY);
      this.attendanceRecords = {};
      this.settings = {
        targetPercentage: 85,
        shiftStartTime: '09:00',
        shiftEndTime: '17:00',
        gracePeriod: 15,
        geofenceEnabled: true,
        campusLat: 20.3503,
        campusLng: 85.8033,
        geofenceRadius: 150,
        mockUserLat: 20.3501,
        mockUserLng: 85.8031,
        ipEnabled: true,
        campusSubnet: '192.168.1',
        mockUserIp: '192.168.1.45',
        emailAlerts: true,
        lowAttendanceWarning: true
      };
      
      this.seedDemoData();
      this.checkInMessage = 'All attendance records and settings have been reset.';
      this.checkInMessageType = 'info';
    }
  }

  // Export Data to CSV
  exportToCSV(): void {
    const sortedKeys = Object.keys(this.attendanceRecords).sort();
    if (sortedKeys.length === 0) {
      alert('No attendance data available to export.');
      return;
    }

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Date,Status,Check-In,Check-Out,IP Address,Location (Lat/Lng),Notes\n';

    sortedKeys.forEach(key => {
      const r = this.attendanceRecords[key];
      const checkIn = r.checkIn || '--:--';
      const checkOut = r.checkOut || '--:--';
      const ip = r.ip || 'N/A';
      const lat = r.latitude || '';
      const lng = r.longitude || '';
      const location = lat && lng ? `"${lat}, ${lng}"` : 'N/A';
      const notes = r.notes ? `"${r.notes.replace(/"/g, '""')}"` : 'N/A';

      csvContent += `${key},${r.status},${checkIn},${checkOut},${ip},${location},${notes}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Attendance_Report_Sruti_Jena.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Get sorted list of recent logs
  getRecentLogs(): Array<{ date: string; record: AttendanceRecord }> {
    return Object.keys(this.attendanceRecords)
      .sort((a, b) => b.localeCompare(a)) // Sort descending (most recent first)
      .slice(0, 10) // Take top 10 logs
      .map(key => ({
        date: key,
        record: this.attendanceRecords[key]
      }));
  }
}


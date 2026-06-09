import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

Chart.register(...registerables);

export interface Member {
  id: string;
  name: string;
  group: string;
  regNo: string;
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit, AfterViewInit {
  @ViewChild('statsChart') statsChartCanvas!: ElementRef<HTMLCanvasElement>;

  // Theme State
  isDarkMode: boolean = true;

  // Search and Filters
  searchQuery: string = '';
  selectedGroup: string = '';
  selectedDate: string = ''; // YYYY-MM-DD format

  // Main Database
  members: Member[] = [
    // Group A
    { id: '1', name: 'Soyngsruti Jena', group: 'Group A', regNo: 'A001' },
    { id: '2', name: 'Swagat Das', group: 'Group A', regNo: 'A002' },
    { id: '3', name: 'Samikshya Samadarshini', group: 'Group A', regNo: 'A003' },
    { id: '4', name: 'Archana Devi', group: 'Group A', regNo: 'A004' },
    { id: '5', name: 'Roshan Mishra', group: 'Group A', regNo: 'A005' },
    { id: '6', name: 'Satyabrat Sarangi', group: 'Group A', regNo: 'A006' },
    { id: '7', name: 'Priyanshu Sekhar Badhei', group: 'Group A', regNo: 'A007' },
    { id: '8', name: 'Ankit Prasad', group: 'Group A', regNo: 'A008' },
    { id: '9', name: 'Ronit Kumar Swain', group: 'Group A', regNo: 'A009' },
    // Group B
    { id: '10', name: 'Jagannath Padhi', group: 'Group B', regNo: 'B001' },
    { id: '11', name: 'Rohan Kumar Nayak', group: 'Group B', regNo: 'B002' },
    { id: '12', name: 'Tushar Ranjan Muduli', group: 'Group B', regNo: 'B003' },
    { id: '13', name: 'Snehasis Das', group: 'Group B', regNo: 'B004' },
    { id: '14', name: 'Omkar Sahoo', group: 'Group B', regNo: 'B005' },
    { id: '15', name: 'Motilal Turuk', group: 'Group B', regNo: 'B006' },
    // Group C
    { id: '16', name: 'Gayatri Pati', group: 'Group C', regNo: 'C001' },
    { id: '17', name: 'Gaurav Patra', group: 'Group C', regNo: 'C002' },
    { id: '18', name: 'Ayush Guharay', group: 'Group C', regNo: 'C003' },
    { id: '19', name: 'Anup Mohanty', group: 'Group C', regNo: 'C004' },
    { id: '20', name: 'Adil Khan', group: 'Group C', regNo: 'C005' },
    { id: '21', name: 'Anurag Mohanty', group: 'Group C', regNo: 'C006' },
    { id: '22', name: 'Debashis Tripathy', group: 'Group C', regNo: 'C007' },
    { id: '23', name: 'Safaq Jamal', group: 'Group C', regNo: 'C008' },
    { id: '24', name: 'Sohan Mohanty', group: 'Group C', regNo: 'C009' },
    { id: '25', name: 'Hrushikesh Pattnaik', group: 'Group C', regNo: 'C010' },
    // Group D
    { id: '26', name: 'Chandan Kumar Sahu', group: 'Group D', regNo: 'D001' },
    { id: '27', name: 'Sitikantha Dalal', group: 'Group D', regNo: 'D002' },
    { id: '28', name: 'Titiksha Sahu', group: 'Group D', regNo: 'D003' },
    { id: '29', name: 'Anjali Sahoo', group: 'Group D', regNo: 'D004' },
    { id: '30', name: 'Sushree Sangita Sethi', group: 'Group D', regNo: 'D005' },
    { id: '31', name: 'Mama Bisoi', group: 'Group D', regNo: 'D006' },
    { id: '32', name: 'Tanmay Sahu', group: 'Group D', regNo: 'D007' },
    { id: '33', name: 'Pratik Parag Pani', group: 'Group D', regNo: 'D008' },
    { id: '34', name: 'Ranit Das', group: 'Group D', regNo: 'D009' },
    { id: '35', name: 'Shobha Kumari', group: 'Group D', regNo: 'D010' },
    { id: '36', name: 'CS Vishal Rout', group: 'Group D', regNo: 'D011' },
    // Group E
    { id: '37', name: 'Rajesh Behera', group: 'Group E', regNo: 'E001' },
    { id: '38', name: 'Maniket Padhan', group: 'Group E', regNo: 'E002' },
    { id: '39', name: 'Jeevan Jyoti Panigrahi', group: 'Group E', regNo: 'E003' },
    { id: '40', name: 'Ayush Mishra', group: 'Group E', regNo: 'E004' },
    { id: '41', name: 'Mohit Singal', group: 'Group E', regNo: 'E005' },
    { id: '42', name: 'Dhiraj Mahapatra', group: 'Group E', regNo: 'E006' },
    { id: '43', name: 'Swayam Sahu', group: 'Group E', regNo: 'E007' },
    { id: '44', name: 'Subhashree Mohapatra', group: 'Group E', regNo: 'E008' },
    { id: '45', name: 'Subhalaxmi Sahoo', group: 'Group E', regNo: 'E009' },
    // Group F
    { id: '46', name: 'Rajshree Panda', group: 'Group F', regNo: 'F001' },
    { id: '47', name: 'Soumyashree Panda', group: 'Group F', regNo: 'F002' },
    { id: '48', name: 'Rupali Jena', group: 'Group F', regNo: 'F003' },
    { id: '49', name: 'Lipsa Panda', group: 'Group F', regNo: 'F004' },
    { id: '50', name: 'Shreshtha Mohanty', group: 'Group F', regNo: 'F005' },
    { id: '51', name: 'Sukanya Subhadarshini', group: 'Group F', regNo: 'F006' },
    { id: '52', name: 'Anjali Mishra', group: 'Group F', regNo: 'F007' },
    { id: '53', name: 'Prachi Pratyasha Das', group: 'Group F', regNo: 'F008' },
    { id: '54', name: 'Nirmit Nayak', group: 'Group F', regNo: 'F009' },
    { id: '55', name: 'Padmalaya Meher', group: 'Group F', regNo: 'F010' },
    // Group G
    { id: '56', name: 'Shubham Kumar', group: 'Group G', regNo: 'G001' },
    { id: '57', name: 'Yash Kumar', group: 'Group G', regNo: 'G002' },
    { id: '58', name: 'Sasawat Rout', group: 'Group G', regNo: 'G003' },
    { id: '59', name: 'Adarsh Kumar', group: 'Group G', regNo: 'G004' },
    { id: '60', name: 'Amit Kumar Yash', group: 'Group G', regNo: 'G005' },
    { id: '61', name: 'C H Tanisha', group: 'Group G', regNo: 'G006' },
    { id: '62', name: 'Pratikshya Acharya', group: 'Group G', regNo: 'G007' },
    { id: '63', name: 'Mahesh Dakua', group: 'Group G', regNo: 'G008' },
    { id: '64', name: 'Anil Kumar Nayak', group: 'Group G', regNo: 'G009' },
    { id: '65', name: 'Khushi Sahu', group: 'Group G', regNo: 'G010' },
    { id: '66', name: 'Swarna Sharma', group: 'Group G', regNo: 'G011' }
  ];

  filteredMembers: Member[] = [];
  groups: string[] = ['Group A', 'Group B', 'Group C', 'Group D', 'Group E', 'Group F', 'Group G'];

  // Persistent Storage Keys
  private ATTENDANCE_KEY = 'swagat_member2_attendance_store';

  // State maps
  attendanceRecords: { [key: string]: boolean } = {}; // Format: memberId_YYYY-MM-DD -> boolean
  lockedDates: string[] = []; // YYYY-MM-DD

  // Sliding 5 Dates Grid
  slidingDates: string[] = [];

  // Summary Metrics
  stats = {
    presentCount: 0,
    absentCount: 0,
    totalCount: 0,
    dailyPercentage: 0,
    activeGroupPercentage: 0,
    overallPercentage: 0,
    lockedDaysCount: 0
  };

  // ChartJS reference
  chart: Chart | null = null;

  ngOnInit() {
    this.initDefaultDate();
    this.loadFromLocalStorage();
    this.updateSlidingDates();
    this.filterMembers();
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  initDefaultDate() {
    const today = new Date();
    this.selectedDate = this.formatDate(today);
  }

  formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  formatDisplayDate(dateStr: string): string {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  updateSlidingDates() {
    this.slidingDates = [];
    if (!this.selectedDate) return;
    const parts = this.selectedDate.split('-');
    const currentDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));

    // Generate 5 days sliding: 4 past days + selected day (at the end)
    for (let i = 4; i >= 0; i--) {
      const pastDate = new Date(currentDate.getTime() - i * 24 * 60 * 60 * 1000);
      this.slidingDates.push(this.formatDate(pastDate));
    }
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem(this.ATTENDANCE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        this.attendanceRecords = parsed.records || {};
        this.lockedDates = parsed.lockedDates || [];
      } catch (e) {
        console.error('Error loading attendance data', e);
      }
    }
  }

  saveToLocalStorage() {
    const data = {
      records: this.attendanceRecords,
      lockedDates: this.lockedDates
    };
    localStorage.setItem(this.ATTENDANCE_KEY, JSON.stringify(data));
  }

  filterMembers() {
    let result = [...this.members];

    if (this.selectedGroup) {
      result = result.filter(m => m.group === this.selectedGroup);
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase().trim();
      result = result.filter(m => m.name.toLowerCase().includes(query) || m.regNo.toLowerCase().includes(query));
    }

    this.filteredMembers = result;
    this.calculateStats();
  }

  onGroupChange(groupName: string) {
    this.selectedGroup = groupName;
    this.filterMembers();
  }

  onSearchChange() {
    this.filterMembers();
  }

  onDateChange() {
    this.updateSlidingDates();
    this.filterMembers();
  }

  // Attendance Records management
  getRecordKey(memberId: string, dateStr: string): string {
    return `${memberId}_${dateStr}`;
  }

  getAttendance(memberId: string, dateStr: string): boolean {
    const key = this.getRecordKey(memberId, dateStr);
    return !!this.attendanceRecords[key];
  }

  isDateLocked(dateStr: string): boolean {
    return this.lockedDates.includes(dateStr);
  }

  get isActiveDateLocked(): boolean {
    return this.isDateLocked(this.selectedDate);
  }

  toggleAttendance(memberId: string, dateStr: string) {
    if (this.isDateLocked(dateStr)) return;
    const key = this.getRecordKey(memberId, dateStr);
    this.attendanceRecords[key] = !this.attendanceRecords[key];
    this.saveToLocalStorage();
    this.calculateStats();
  }

  // Bulk Actions
  markAllPresent() {
    if (this.isActiveDateLocked) return;
    this.filteredMembers.forEach(m => {
      const key = this.getRecordKey(m.id, this.selectedDate);
      this.attendanceRecords[key] = true;
    });
    this.saveToLocalStorage();
    this.calculateStats();
  }

  markAllAbsent() {
    if (this.isActiveDateLocked) return;
    this.filteredMembers.forEach(m => {
      const key = this.getRecordKey(m.id, this.selectedDate);
      this.attendanceRecords[key] = false;
    });
    this.saveToLocalStorage();
    this.calculateStats();
  }

  resetAttendance() {
    if (this.isActiveDateLocked) return;
    if (confirm('Are you sure you want to clear attendance for all filtered students on the selected date?')) {
      this.filteredMembers.forEach(m => {
        const key = this.getRecordKey(m.id, this.selectedDate);
        delete this.attendanceRecords[key];
      });
      this.saveToLocalStorage();
      this.calculateStats();
    }
  }

  lockActiveDate() {
    if (this.isActiveDateLocked) return;
    if (confirm(`Do you want to permanently lock attendance for ${this.selectedDate}? You won't be able to modify records for this day.`)) {
      this.lockedDates.push(this.selectedDate);
      this.saveToLocalStorage();
      this.calculateStats();
    }
  }

  calculateStats() {
    let present = 0;
    let absent = 0;

    // Daily Stats for filtered members on active date
    this.filteredMembers.forEach(m => {
      if (this.getAttendance(m.id, this.selectedDate)) {
        present++;
      } else {
        absent++;
      }
    });

    this.stats.presentCount = present;
    this.stats.absentCount = absent;
    this.stats.totalCount = this.filteredMembers.length;
    this.stats.dailyPercentage = this.stats.totalCount > 0 
      ? Math.round((present / this.stats.totalCount) * 100)
      : 0;

    this.stats.lockedDaysCount = this.lockedDates.length;

    // Overall metrics for filtered group across all recorded sliding dates
    let totalPossible = 0;
    let totalPresent = 0;
    this.filteredMembers.forEach(m => {
      this.slidingDates.forEach(d => {
        totalPossible++;
        if (this.getAttendance(m.id, d)) {
          totalPresent++;
        }
      });
    });

    this.stats.activeGroupPercentage = totalPossible > 0
      ? Math.round((totalPresent / totalPossible) * 100)
      : 0;

    // Overall across entire database on the sliding dates
    let allPossible = 0;
    let allPresent = 0;
    this.members.forEach(m => {
      this.slidingDates.forEach(d => {
        allPossible++;
        if (this.getAttendance(m.id, d)) {
          allPresent++;
        }
      });
    });

    this.stats.overallPercentage = allPossible > 0
      ? Math.round((allPresent / allPossible) * 100)
      : 0;

    setTimeout(() => this.renderChart(), 0);
  }

  renderChart() {
    if (!this.statsChartCanvas) return;
    const ctx = this.statsChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Present', 'Absent'],
        datasets: [{
          data: [this.stats.presentCount, this.stats.absentCount],
          backgroundColor: ['#10b981', '#f43f5e'],
          borderColor: this.isDarkMode ? '#111827' : '#ffffff',
          borderWidth: 2,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: this.isDarkMode ? '#94a3b8' : '#475569',
              font: {
                family: 'Inter, system-ui, sans-serif',
                size: 11
              }
            }
          }
        }
      }
    });
  }

  // Exports
  exportCSV() {
    let csvContent = 'Registration No,Name,Group';
    this.slidingDates.forEach(d => {
      csvContent += `,${d}`;
    });
    csvContent += '\r\n';

    this.filteredMembers.forEach(m => {
      csvContent += `"${m.regNo}","${m.name}","${m.group}"`;
      this.slidingDates.forEach(d => {
        csvContent += `,${this.getAttendance(m.id, d) ? 'P' : 'A'}`;
      });
      csvContent += '\r\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Attendance_${this.selectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  exportExcel() {
    const excelData = this.filteredMembers.map(m => {
      const row: any = {
        'Registration No': m.regNo,
        'Name': m.name,
        'Group': m.group
      };
      this.slidingDates.forEach(d => {
        row[d] = this.getAttendance(m.id, d) ? 'P' : 'A';
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
    XLSX.writeFile(workbook, `Attendance_${this.selectedDate}.xlsx`);
  }

  exportPDF() {
    const doc = new jsPDF('p', 'mm', 'a4');
    
    // Header styling
    doc.setFontSize(18);
    doc.setTextColor(37, 99, 235);
    doc.text('Silicon Internship 2026 - Attendance Report', 14, 15);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`Generated Date: ${this.selectedDate} | Total Students: ${this.filteredMembers.length}`, 14, 21);
    
    const headers = ['Reg No', 'Name', 'Group'];
    this.slidingDates.forEach(d => headers.push(this.formatDisplayDate(d)));

    const body = this.filteredMembers.map(m => {
      const row = [m.regNo, m.name, m.group];
      this.slidingDates.forEach(d => {
        row.push(this.getAttendance(m.id, d) ? 'P' : 'A');
      });
      return row;
    });

    autoTable(doc, {
      head: [headers],
      body: body,
      startY: 26,
      styles: {
        fontSize: 8,
        font: 'helvetica'
      },
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: 255
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      }
    });

    doc.save(`Attendance_${this.selectedDate}.pdf`);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    setTimeout(() => this.renderChart(), 0);
  }

  goBack() {
    window.history.back();
  }
}

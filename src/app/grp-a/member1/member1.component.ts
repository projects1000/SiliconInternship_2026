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

interface Member {
  id: string;
  name: string;
  group: string;
  avatarColor: string;
}

@Component({
  selector: 'app-member1',
  templateUrl: './member1.component.html',
  styleUrls: ['./member1.component.css']
})
export class Member1Component implements OnInit {
  // Navigation / View State
  activeTab: 'profile' | 'attendance' = 'profile';
  attendanceViewMode: 'personal' | 'group' = 'personal';
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

  // Calendar State (for Personal Attendance)
  currentDate: Date = new Date();
  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();
  calendarDays: CalendarDay[] = [];
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Personal Attendance Records Store (Key: YYYY-MM-DD)
  attendanceRecords: { [key: string]: AttendanceRecord } = {};

  // Group Management State
  selectedGroup: string = 'Group A';
  groupSearchQuery: string = '';
  groupSelectedDate: string = this.formatDate(new Date());
  
  // List of all members from Group A to Group G
  members: Member[] = [
    // Group A
    { id: 'a1', name: 'Soyngsruti Jena', group: 'Group A', avatarColor: '#818cf8' },
    { id: 'a2', name: 'Swagat Das', group: 'Group A', avatarColor: '#34d399' },
    { id: 'a3', name: 'Samikshya Samadarshini', group: 'Group A', avatarColor: '#f43f5e' },
    { id: 'a4', name: 'Archana Devi', group: 'Group A', avatarColor: '#fbbf24' },
    { id: 'a5', name: 'Roshan Mishra', group: 'Group A', avatarColor: '#60a5fa' },
    { id: 'a6', name: 'Satyabrat Sarangi', group: 'Group A', avatarColor: '#a78bfa' },
    { id: 'a7', name: 'Priyanshu Sekhar Badhei', group: 'Group A', avatarColor: '#ec4899' },
    { id: 'a8', name: 'Ankit Prasad', group: 'Group A', avatarColor: '#14b8a6' },
    { id: 'a9', name: 'Ronit Kumar Swain', group: 'Group A', avatarColor: '#f97316' },
    // Group B
    { id: 'b1', name: 'Jagannath Padhi', group: 'Group B', avatarColor: '#818cf8' },
    { id: 'b2', name: 'Rohan Kumar Nayak', group: 'Group B', avatarColor: '#34d399' },
    { id: 'b3', name: 'Tushar Ranjan Muduli', group: 'Group B', avatarColor: '#f43f5e' },
    { id: 'b4', name: 'Snehasis Das', group: 'Group B', avatarColor: '#fbbf24' },
    { id: 'b5', name: 'Omkar Sahoo', group: 'Group B', avatarColor: '#60a5fa' },
    { id: 'b6', name: 'Motilal Turuk', group: 'Group B', avatarColor: '#a78bfa' },
    // Group C
    { id: 'c1', name: 'Gayatri Pati', group: 'Group C', avatarColor: '#818cf8' },
    { id: 'c2', name: 'Gaurav Patra', group: 'Group C', avatarColor: '#34d399' },
    { id: 'c3', name: 'Ayush Guharay', group: 'Group C', avatarColor: '#f43f5e' },
    { id: 'c4', name: 'Anup Mohanty', group: 'Group C', avatarColor: '#fbbf24' },
    { id: 'c5', name: 'Adil Khan', group: 'Group C', avatarColor: '#60a5fa' },
    { id: 'c6', name: 'Anurag Mohanty', group: 'Group C', avatarColor: '#a78bfa' },
    { id: 'c7', name: 'Debashis Tripathy', group: 'Group C', avatarColor: '#ec4899' },
    { id: 'c8', name: 'Safaq Jamal', group: 'Group C', avatarColor: '#14b8a6' },
    { id: 'c9', name: 'Sohan Mohanty', group: 'Group C', avatarColor: '#f97316' },
    { id: 'c10', name: 'Hrushikesh Pattnaik', group: 'Group C', avatarColor: '#10b981' },
    // Group D
    { id: 'd1', name: 'Chandan Kumar Sahu', group: 'Group D', avatarColor: '#818cf8' },
    { id: 'd2', name: 'Sitikantha Dalal', group: 'Group D', avatarColor: '#34d399' },
    { id: 'd3', name: 'Titiksha Sahu', group: 'Group D', avatarColor: '#f43f5e' },
    { id: 'd4', name: 'Anjali Sahoo', group: 'Group D', avatarColor: '#fbbf24' },
    { id: 'd5', name: 'Sushree Sangita Sethi', group: 'Group D', avatarColor: '#60a5fa' },
    { id: 'd6', name: 'Mama Bisoi', group: 'Group D', avatarColor: '#a78bfa' },
    { id: 'd7', name: 'Tanmay Sahu', group: 'Group D', avatarColor: '#ec4899' },
    { id: 'd8', name: 'Pratik Parag Pani', group: 'Group D', avatarColor: '#14b8a6' },
    { id: 'd9', name: 'Ranit Das', group: 'Group D', avatarColor: '#f97316' },
    { id: 'd10', name: 'Shobha Kumari', group: 'Group D', avatarColor: '#10b981' },
    { id: 'd11', name: 'CS Vishal Rout', group: 'Group D', avatarColor: '#6366f1' },
    // Group E
    { id: 'e1', name: 'Rajesh Behera', group: 'Group E', avatarColor: '#818cf8' },
    { id: 'e2', name: 'Maniket Padhan', group: 'Group E', avatarColor: '#34d399' },
    { id: 'e3', name: 'Jeevan Jyoti Panigrahi', group: 'Group E', avatarColor: '#f43f5e' },
    { id: 'e4', name: 'Ayush Mishra', group: 'Group E', avatarColor: '#fbbf24' },
    { id: 'e5', name: 'Mohit Singal', group: 'Group E', avatarColor: '#60a5fa' },
    { id: 'e6', name: 'Dhiraj Mahapatra', group: 'Group E', avatarColor: '#a78bfa' },
    { id: 'e7', name: 'Swayam Sahu', group: 'Group E', avatarColor: '#ec4899' },
    { id: 'e8', name: 'Subhashree Mohapatra', group: 'Group E', avatarColor: '#14b8a6' },
    { id: 'e9', name: 'Subhalaxmi Sahoo', group: 'Group E', avatarColor: '#f97316' },
    // Group F
    { id: 'f1', name: 'Rajshree Panda', group: 'Group F', avatarColor: '#818cf8' },
    { id: 'f2', name: 'Soumyashree Panda', group: 'Group F', avatarColor: '#34d399' },
    { id: 'f3', name: 'Rupali Jena', group: 'Group F', avatarColor: '#f43f5e' },
    { id: 'f4', name: 'Lipsa Panda', group: 'Group F', avatarColor: '#fbbf24' },
    { id: 'f5', name: 'Shreshtha Mohanty', group: 'Group F', avatarColor: '#60a5fa' },
    { id: 'f6', name: 'Sukanya Subhadarshini', group: 'Group F', avatarColor: '#a78bfa' },
    { id: 'f7', name: 'Anjali Mishra', group: 'Group F', avatarColor: '#ec4899' },
    { id: 'f8', name: 'Prachi Pratyasha Das', group: 'Group F', avatarColor: '#14b8a6' },
    { id: 'f9', name: 'Nirmit Nayak', group: 'Group F', avatarColor: '#f97316' },
    { id: 'f10', name: 'Padmalaya Meher', group: 'Group F', avatarColor: '#10b981' },
    // Group G
    { id: 'g1', name: 'Shubham Kumar', group: 'Group G', avatarColor: '#818cf8' },
    { id: 'g2', name: 'Yash Kumar', group: 'Group G', avatarColor: '#34d399' },
    { id: 'g3', name: 'Sasawat Rout', group: 'Group G', avatarColor: '#f43f5e' },
    { id: 'g4', name: 'Adarsh Kumar', group: 'Group G', avatarColor: '#fbbf24' },
    { id: 'g5', name: 'Amit Kumar Yash', group: 'Group G', avatarColor: '#60a5fa' },
    { id: 'g6', name: 'C H Tanisha', group: 'Group G', avatarColor: '#a78bfa' },
    { id: 'g7', name: 'Pratikshya Acharya', group: 'Group G', avatarColor: '#ec4899' },
    { id: 'g8', name: 'Mahesh Dakua', group: 'Group G', avatarColor: '#14b8a6' },
    { id: 'g9', name: 'Anil Kumar Nayak', group: 'Group G', avatarColor: '#f97316' },
    { id: 'g10', name: 'Khushisahu', group: 'Group G', avatarColor: '#10b981' },
    { id: 'g11', name: 'Swarna Sharma', group: 'Group G', avatarColor: '#6366f1' }
  ];

  // Group Attendance Records (Key: memberId_YYYY-MM-DD)
  groupAttendanceRecords: { [key: string]: AttendanceRecord } = {};

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

  // Group Summary Statistics
  groupStats = {
    present: 0,
    absent: 0,
    late: 0,
    leave: 0,
    total: 0,
    percentage: 0
  };

  // Comparative Group Chart Stats
  groupCompareStats: Array<{ groupName: string; percentage: number }> = [];

  // Check-in Simulation State
  checkInMessage: string = '';
  checkInMessageType: 'success' | 'error' | 'info' | '' = '';
  isTodayCheckedIn: boolean = false;
  isTodayCheckedOut: boolean = false;
  todayCheckInTime: string = '--:--';
  todayCheckOutTime: string = '--:--';

  // Local Storage Keys
  private STORAGE_RECORDS_KEY = 'sruti_attendance_records';
  private STORAGE_GROUP_RECORDS_KEY = 'sruti_group_attendance_records';
  private STORAGE_SETTINGS_KEY = 'sruti_attendance_settings';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadSettings();
    this.loadRecords();
    this.loadGroupRecords();
    this.generateCalendar();
    this.calculateStats();
    this.calculateGroupStats();
    this.calculateGroupComparison();
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

  loadGroupRecords(): void {
    const saved = localStorage.getItem(this.STORAGE_GROUP_RECORDS_KEY);
    if (saved) {
      try {
        this.groupAttendanceRecords = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse group records', e);
      }
    } else {
      // Seed demo data for the group wise records as well
      this.seedGroupDemoData();
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

  saveGroupRecords(): void {
    localStorage.setItem(this.STORAGE_GROUP_RECORDS_KEY, JSON.stringify(this.groupAttendanceRecords));
    this.calculateGroupStats();
    this.calculateGroupComparison();
  }

  // Seed group data for visual representation of all groups
  seedGroupDemoData(): void {
    const today = new Date();
    // Seed attendance records for the last 5 days for ALL members across all groups
    for (let dayOffset = 5; dayOffset >= 0; dayOffset--) {
      const d = new Date(today.getTime() - dayOffset * 24 * 60 * 60 * 1000);
      const dayOfWeek = d.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) continue; // Skip weekends

      const dateStr = this.formatDate(d);

      this.members.forEach(member => {
        // Skip Soyngsruti (id: a1) so her personal record doesn't get overwritten or mismatch
        if (member.id === 'a1') {
          // Sync her personal record to group records
          const personalRec = this.attendanceRecords[dateStr];
          if (personalRec) {
            this.groupAttendanceRecords[`a1_${dateStr}`] = { ...personalRec };
          } else {
            this.groupAttendanceRecords[`a1_${dateStr}`] = { status: 'Present', checkIn: '08:50', checkOut: '17:00' };
          }
          return;
        }

        const rand = Math.random();
        let status: 'Present' | 'Absent' | 'Late' | 'Leave';
        let checkIn = '08:52';
        let checkOut = '17:00';

        if (rand < 0.82) {
          status = 'Present';
          checkIn = `08:${String(Math.floor(Math.random() * 12) + 45).padStart(2, '0')}`;
        } else if (rand < 0.92) {
          status = 'Late';
          checkIn = `09:${String(Math.floor(Math.random() * 20) + 16).padStart(2, '0')}`;
        } else if (rand < 0.96) {
          status = 'Leave';
          checkIn = '';
          checkOut = '';
        } else {
          status = 'Absent';
          checkIn = '';
          checkOut = '';
        }

        this.groupAttendanceRecords[`${member.id}_${dateStr}`] = {
          status,
          checkIn: checkIn || undefined,
          checkOut: checkOut || undefined,
          ip: '192.168.1.' + (Math.floor(Math.random() * 200) + 10),
          notes: 'Regular check-in'
        };
      });
    }
    this.saveGroupRecords();
  }

  // Seed data to make the initial screen look rich and filled
  seedDemoData(): void {
    const today = new Date();
    // Generate records for the last 25 days (excluding weekends)
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
        date: null, // padding
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

  // Manual Toggle Attendance on Calendar Click (Personal)
  toggleDayStatus(day: CalendarDay): void {
    if (!day.date) return;

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
      delete this.groupAttendanceRecords[`a1_${dateStr}`]; // keep in sync
    } else {
      const newRec: AttendanceRecord = {
        status: newStatus,
        checkIn: newStatus === 'Present' ? '08:55' : (newStatus === 'Late' ? '09:20' : undefined),
        checkOut: (newStatus === 'Present' || newStatus === 'Late') ? '17:00' : undefined,
        ip: '192.168.1.45',
        latitude: 20.3503,
        longitude: 85.8033,
        notes: `Manually marked as ${newStatus}`
      };
      this.attendanceRecords[dateStr] = newRec;
      this.groupAttendanceRecords[`a1_${dateStr}`] = { ...newRec };
    }

    this.saveRecords();
    this.saveGroupRecords();
  }

  // Group Member Attendance modification
  setGroupMemberStatus(memberId: string, status: 'Present' | 'Absent' | 'Late' | 'Leave' | 'Unmarked'): void {
    const key = `${memberId}_${this.groupSelectedDate}`;
    
    if (status === 'Unmarked') {
      delete this.groupAttendanceRecords[key];
      if (memberId === 'a1') {
        delete this.attendanceRecords[this.groupSelectedDate];
      }
    } else {
      const rec: AttendanceRecord = {
        status,
        checkIn: status === 'Present' ? '08:50' : (status === 'Late' ? '09:20' : undefined),
        checkOut: (status === 'Present' || status === 'Late') ? '17:00' : undefined,
        ip: '192.168.1.55',
        notes: `Marked by Group Admin (Soyngsruti)`
      };
      this.groupAttendanceRecords[key] = rec;
      
      // If setting Soyngsruti's own status in group view, sync to her personal view
      if (memberId === 'a1') {
        this.attendanceRecords[this.groupSelectedDate] = {
          ...rec,
          latitude: 20.3503,
          longitude: 85.8033
        };
      }
    }

    this.saveGroupRecords();
    if (memberId === 'a1') {
      this.saveRecords();
    }
  }

  // Calculate stats for Personal View
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
    const denominator = present + late + absent;
    const rate = denominator > 0 ? Math.round(((present + late) / denominator) * 100) : 100;

    this.stats.totalLogged = totalLogged;
    this.stats.present = present;
    this.stats.absent = absent;
    this.stats.late = late;
    this.stats.leave = leave;
    this.stats.percentage = rate;
    this.stats.meetsTarget = rate >= this.settings.targetPercentage;

    this.stats.streak = this.calculateStreak();
  }

  calculateStreak(): number {
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const isWeekend = checkDate.getDay() === 0 || checkDate.getDay() === 6;
      if (isWeekend) continue;

      const dateStr = this.formatDate(checkDate);
      const record = this.attendanceRecords[dateStr];

      if (record && (record.status === 'Present' || record.status === 'Late')) {
        streak++;
      } else if (record && (record.status === 'Absent' || record.status === 'Leave')) {
        break;
      } else {
        if (i === 0) continue;
        break;
      }
    }
    return streak;
  }

  // Calculate Stats for Group View
  calculateGroupStats(): void {
    let present = 0;
    let absent = 0;
    let late = 0;
    let leave = 0;

    const groupMembers = this.members.filter(m => m.group === this.selectedGroup);
    
    groupMembers.forEach(m => {
      const key = `${m.id}_${this.groupSelectedDate}`;
      const rec = this.groupAttendanceRecords[key];
      
      if (rec) {
        if (rec.status === 'Present') present++;
        else if (rec.status === 'Absent') absent++;
        else if (rec.status === 'Late') late++;
        else if (rec.status === 'Leave') leave++;
      } else {
        // default to Unmarked, which doesn't count towards stats yet
      }
    });

    const total = present + absent + late + leave;
    const denominator = present + late + absent;
    const percentage = denominator > 0 ? Math.round(((present + late) / denominator) * 100) : 0;

    this.groupStats.present = present;
    this.groupStats.absent = absent;
    this.groupStats.late = late;
    this.groupStats.leave = leave;
    this.groupStats.total = total;
    this.groupStats.percentage = percentage;
  }

  // Calculate comparison numbers for different groups
  calculateGroupComparison(): void {
    const groups = ['Group A', 'Group B', 'Group C', 'Group D', 'Group E', 'Group F', 'Group G'];
    this.groupCompareStats = [];

    groups.forEach(grpName => {
      let present = 0;
      let absent = 0;
      let late = 0;
      const grpMembers = this.members.filter(m => m.group === grpName);

      grpMembers.forEach(m => {
        const key = `${m.id}_${this.groupSelectedDate}`;
        const rec = this.groupAttendanceRecords[key];
        if (rec) {
          if (rec.status === 'Present') present++;
          else if (rec.status === 'Late') late++;
          else if (rec.status === 'Absent') absent++;
        }
      });

      const denom = present + late + absent;
      const rate = denom > 0 ? Math.round(((present + late) / denom) * 100) : 80; // default seed visual
      this.groupCompareStats.push({
        groupName: grpName,
        percentage: rate
      });
    });
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

  // Geofence Distance Calculator
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3;
    const phi1 = lat1 * Math.PI / 180;
    const phi2 = lat2 * Math.PI / 180;
    const deltaPhi = (lat2 - lat1) * Math.PI / 180;
    const deltaLambda = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  // Check-In Action simulation (Personal)
  simulateCheckIn(): void {
    const todayStr = this.formatDate(new Date());
    
    if (this.isTodayCheckedIn) {
      this.checkInMessage = 'You are already checked in for today!';
      this.checkInMessageType = 'info';
      return;
    }

    if (this.settings.geofenceEnabled) {
      const distance = this.calculateDistance(
        this.settings.mockUserLat, this.settings.mockUserLng,
        this.settings.campusLat, this.settings.campusLng
      );
      
      if (distance > this.settings.geofenceRadius) {
        this.checkInMessage = `Check-In Failed! Outside campus boundary. Distance: ${Math.round(distance)}m (Max: ${this.settings.geofenceRadius}m)`;
        this.checkInMessageType = 'error';
        return;
      }
    }

    if (this.settings.ipEnabled) {
      if (!this.settings.mockUserIp.startsWith(this.settings.campusSubnet)) {
        this.checkInMessage = `Check-In Failed! IP: ${this.settings.mockUserIp} (Expected: ${this.settings.campusSubnet}.x)`;
        this.checkInMessageType = 'error';
        return;
      }
    }

    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const currentTimeStr = `${hh}:${mm}`;

    const [startH, startM] = this.settings.shiftStartTime.split(':').map(Number);
    const limitMinutes = startH * 60 + startM + this.settings.gracePeriod;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    let status: 'Present' | 'Late' = 'Present';
    let notes = 'Checked in via web portal';

    if (currentMinutes > limitMinutes) {
      status = 'Late';
      notes = `Late check-in at ${currentTimeStr} (Shift starts: ${this.settings.shiftStartTime} + ${this.settings.gracePeriod}m grace)`;
    }

    const newRec: AttendanceRecord = {
      status,
      checkIn: currentTimeStr,
      ip: this.settings.mockUserIp,
      latitude: this.settings.mockUserLat,
      longitude: this.settings.mockUserLng,
      notes
    };

    this.attendanceRecords[todayStr] = newRec;
    this.groupAttendanceRecords[`a1_${todayStr}`] = { ...newRec };

    this.checkInMessage = `Check-in successful! Status: ${status} at ${currentTimeStr}.`;
    this.checkInMessageType = 'success';
    
    this.saveRecords();
    this.saveGroupRecords();
  }

  // Check-Out Action simulation (Personal)
  simulateCheckOut(): void {
    const todayStr = this.formatDate(new Date());

    if (!this.isTodayCheckedIn) {
      this.checkInMessage = 'You must check in first!';
      this.checkInMessageType = 'error';
      return;
    }

    if (this.isTodayCheckedOut) {
      this.checkInMessage = 'Already checked out for today!';
      this.checkInMessageType = 'info';
      return;
    }

    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const currentTimeStr = `${hh}:${mm}`;

    const record = this.attendanceRecords[todayStr];
    record.checkOut = currentTimeStr;
    record.notes += `, checked out at ${currentTimeStr}`;

    this.groupAttendanceRecords[`a1_${todayStr}`].checkOut = currentTimeStr;
    this.groupAttendanceRecords[`a1_${todayStr}`].notes += `, checked out at ${currentTimeStr}`;

    this.checkInMessage = `Check-out successful! Logged at ${currentTimeStr}.`;
    this.checkInMessageType = 'success';

    this.saveRecords();
    this.saveGroupRecords();
  }

  // Quick preset check-in
  simulateOnTimeCheckIn(): void {
    const todayStr = this.formatDate(new Date());
    
    const newRec: AttendanceRecord = {
      status: 'Present',
      checkIn: '08:52',
      checkOut: '17:02',
      ip: this.settings.mockUserIp,
      latitude: 20.3503,
      longitude: 85.8033,
      notes: 'Simulated On-Time check-in'
    };

    this.attendanceRecords[todayStr] = newRec;
    this.groupAttendanceRecords[`a1_${todayStr}`] = { ...newRec };

    this.checkInMessage = 'Simulated on-time check-in!';
    this.checkInMessageType = 'success';
    this.saveRecords();
    this.saveGroupRecords();
  }

  simulateLateCheckIn(): void {
    const todayStr = this.formatDate(new Date());
    
    const newRec: AttendanceRecord = {
      status: 'Late',
      checkIn: '09:25',
      checkOut: '17:05',
      ip: this.settings.mockUserIp,
      latitude: 20.3503,
      longitude: 85.8033,
      notes: 'Simulated Late check-in'
    };

    this.attendanceRecords[todayStr] = newRec;
    this.groupAttendanceRecords[`a1_${todayStr}`] = { ...newRec };

    this.checkInMessage = 'Simulated late check-in!';
    this.checkInMessageType = 'success';
    this.saveRecords();
    this.saveGroupRecords();
  }

  // Admin Group Commands
  markAllGroupPresent(): void {
    const groupMembers = this.members.filter(m => m.group === this.selectedGroup);
    groupMembers.forEach(m => {
      const key = `${m.id}_${this.groupSelectedDate}`;
      const rec = this.groupAttendanceRecords[key];
      // Only set if unmarked or absent
      if (!rec || rec.status === 'Unmarked' || rec.status === 'Absent') {
        this.setGroupMemberStatus(m.id, 'Present');
      }
    });
    this.calculateGroupStats();
  }

  markAllGroupAbsent(): void {
    const groupMembers = this.members.filter(m => m.group === this.selectedGroup);
    groupMembers.forEach(m => {
      const key = `${m.id}_${this.groupSelectedDate}`;
      const rec = this.groupAttendanceRecords[key];
      if (!rec || rec.status === 'Unmarked') {
        this.setGroupMemberStatus(m.id, 'Absent');
      }
    });
    this.calculateGroupStats();
  }

  resetGroupAttendance(): void {
    if (confirm(`Reset all logged attendance for ${this.selectedGroup} on ${this.groupSelectedDate}?`)) {
      const groupMembers = this.members.filter(m => m.group === this.selectedGroup);
      groupMembers.forEach(m => {
        this.setGroupMemberStatus(m.id, 'Unmarked');
      });
      this.calculateGroupStats();
    }
  }

  // Get filtered group members
  getFilteredGroupMembers(): Member[] {
    let list = this.members.filter(m => m.group === this.selectedGroup);
    
    if (this.groupSearchQuery) {
      const q = this.groupSearchQuery.toLowerCase().trim();
      list = list.filter(m => m.name.toLowerCase().includes(q));
    }
    
    return list;
  }

  // Check status of a group member for table display
  getGroupMemberStatus(memberId: string): 'Present' | 'Absent' | 'Late' | 'Leave' | 'Unmarked' {
    const key = `${memberId}_${this.groupSelectedDate}`;
    const rec = this.groupAttendanceRecords[key];
    return rec ? rec.status : 'Unmarked';
  }

  getGroupMemberTime(memberId: string): string {
    const key = `${memberId}_${this.groupSelectedDate}`;
    const rec = this.groupAttendanceRecords[key];
    return rec && rec.checkIn ? `${rec.checkIn} - ${rec.checkOut || '--:--'}` : '--:--';
  }

  // Clear / Reset All Data
  resetAllData(): void {
    if (confirm('Are you sure you want to delete all personal and group attendance history?')) {
      localStorage.removeItem(this.STORAGE_RECORDS_KEY);
      localStorage.removeItem(this.STORAGE_GROUP_RECORDS_KEY);
      localStorage.removeItem(this.STORAGE_SETTINGS_KEY);
      this.attendanceRecords = {};
      this.groupAttendanceRecords = {};
      
      this.seedDemoData();
      this.seedGroupDemoData();
      this.calculateStats();
      this.calculateGroupStats();
      this.calculateGroupComparison();
      this.checkTodayStatus();

      this.checkInMessage = 'All records and settings have been reset.';
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

  // Export Group Attendance Report
  exportGroupToCSV(): void {
    const groupMembers = this.members.filter(m => m.group === this.selectedGroup);
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += `Attendance Report for ${this.selectedGroup} on ${this.groupSelectedDate}\n`;
    csvContent += 'Member Name,Status,Check-In,Check-Out,IP Address,System Notes\n';

    groupMembers.forEach(m => {
      const key = `${m.id}_${this.groupSelectedDate}`;
      const rec = this.groupAttendanceRecords[key] || { status: 'Unmarked' };
      const checkIn = rec.checkIn || '--:--';
      const checkOut = rec.checkOut || '--:--';
      const ip = rec.ip || 'N/A';
      const notes = rec.notes ? `"${rec.notes.replace(/"/g, '""')}"` : 'N/A';

      csvContent += `"${m.name}",${rec.status},${checkIn},${checkOut},${ip},${notes}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Group_Attendance_${this.selectedGroup.replace(' ', '_')}_${this.groupSelectedDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Get sorted list of recent personal logs
  getRecentLogs(): Array<{ date: string; record: AttendanceRecord }> {
    return Object.keys(this.attendanceRecords)
      .sort((a, b) => b.localeCompare(a))
      .slice(0, 10)
      .map(key => ({
        date: key,
        record: this.attendanceRecords[key]
      }));
  }

  // Helper to extract initials from name
  getInitials(name: string): string {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
}



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Member {
  name: string;
  team: string;
}

interface DateItem {
  dateStr: string;
  dayName: string;
  dayNum: number;
}

interface CalendarCell {
  dayNum: number | null;
  dateStr: string;
}

@Component({
  selector: 'app-member5-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class Member5AttendanceComponent implements OnInit {
  // Team and Member data from Group B Member 1 Jaganath Padhi
  membersData: Member[] = [
    { team: 'Team A', name: 'Soyngsruti Jena' },
    { team: 'Team A', name: 'Swagat Das' },
    { team: 'Team A', name: 'Samikshya Samadarshini' },
    { team: 'Team A', name: 'Archana Devi' },
    { team: 'Team A', name: 'Roshan Mishra' },
    { team: 'Team A', name: 'Satyabrat Sarangi' },
    { team: 'Team A', name: 'Priyanshu Sekhar' },
    { team: 'Team A', name: 'Ankit Prasad' },
    { team: 'Team A', name: 'Ronit Kumar Swain' },
    { team: 'Team B', name: 'Jagannath Padhi' },
    { team: 'Team B', name: 'Rohan Kumar Nayak' },
    { team: 'Team B', name: 'Tushar Ranjan Muduli' },
    { team: 'Team B', name: 'Snehasis Das' },
    { team: 'Team B', name: 'Omkar Sahoo ' },
    { team: 'Team B', name: 'Motilal Turuk' },
    { team: 'Team C', name: 'Gayatri Pati' },
    { team: 'Team C', name: 'Gaurav Patra' },
    { team: 'Team C', name: 'Ayush Guharay' },
    { team: 'Team C', name: 'Anup Mohanty' },
    { team: 'Team C', name: 'Adil Khan' },
    { team: 'Team C', name: 'Anurag Mohanty' },
    { team: 'Team C', name: 'Debashis Tripathy' },
    { team: 'Team C', name: 'Safaq Jamal' },
    { team: 'Team C', name: 'Sohan Mohanty' },
    { team: 'Team C', name: 'Hrushikesh Pattnaik' },
    { team: 'Team D', name: 'Chandan Kumar Sahu' },
    { team: 'Team D', name: 'Sitikantha Dalal' },
    { team: 'Team D', name: 'Titiksha Sahu' },
    { team: 'Team D', name: 'Anjali Sahoo' },
    { team: 'Team D', name: 'Sushree Sangita Sethi' },
    { team: 'Team D', name: 'Mama Bisoi' },
    { team: 'Team D', name: 'Tanmay Sahu' },
    { team: 'Team D', name: 'Pratik Parag Pani' },
    { team: 'Team D', name: 'Ranit Das' },
    { team: 'Team D', name: 'Shobha Kumari' },
    { team: 'Team D', name: 'CS Vishal Rout' },
    { team: 'Team E', name: 'Rajesh Behera' },
    { team: 'Team E', name: 'Maniket Padhan' },
    { team: 'Team E', name: 'Jeevan Jyoti Panigrahi' },
    { team: 'Team E', name: 'Ayush Mishra' },
    { team: 'Team E', name: 'Mohit Singal' },
    { team: 'Team E', name: 'Dhiraj Mahapatra' },
    { team: 'Team E', name: 'Swayam Sahu' },
    { team: 'Team E', name: 'Subhashree Mohapatra' },
    { team: 'Team E', name: 'Subhalaxmi Sahoo' },
    { team: 'Team F', name: 'Rajshree Panda' },
    { team: 'Team F', name: 'Soumyashree Panda' },
    { team: 'Team F', name: 'Rupali Jena' },
    { team: 'Team F', name: 'Lipsa Panda' },
    { team: 'Team F', name: 'Shreshtha Mohanty' },
    { team: 'Team F', name: 'Sukanya Subhadarshini' },
    { team: 'Team F', name: 'Anjali Mishra' },
    { team: 'Team F', name: 'Prachi Pratyasha Das' },
    { team: 'Team F', name: 'Nirmit Nayak' },
    { team: 'Team F', name: 'Padmalaya Meher' },
    { team: 'Team G', name: 'Shubham Kumar' },
    { team: 'Team G', name: 'Yash Kumar' },
    { team: 'Team G', name: 'Sasawat Rout' },
    { team: 'Team G', name: 'Adarsh Kumar' },
    { team: 'Team G', name: 'Amit Kumar Yash' },
    { team: 'Team G', name: 'C H Tanisha' },
    { team: 'Team G', name: 'Pratikshya Acharya' },
    { team: 'Team G', name: 'Mahesh Dakua' },
    { team: 'Team G', name: 'Anil Kumar Nayak' },
    { team: 'Team G', name: 'Khushisahu' },
    { team: 'Team G', name: 'Swarna Sharma ' }
  ];

  teams: string[] = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F', 'Team G'];
  selectedTeam: string = 'Team A';
  selectedDateStr: string = '2026-06-07';
  selectedMember: Member | null = null;
  searchQuery: string = '';

  filteredMembers: Member[] = [];
  dateItems: DateItem[] = [];
  calendarCells: CalendarCell[] = [];

  // Local storage structures
  classDays: { [dateStr: string]: boolean } = {};
  attendanceData: { [memberName: string]: { [dateStr: string]: boolean } } = {};

  constructor(private router: Router) {}

  ngOnInit() {
    this.generateDateItems();
    this.generateCalendarCells();
    this.loadData();
    this.applyFilters();

    // Set initial selected member to first one in the filtered list
    if (this.filteredMembers.length > 0) {
      this.selectedMember = this.filteredMembers[0];
    }
  }

  // Generate roller date list (June 1 - June 30, 2026)
  generateDateItems() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 1; i <= 30; i++) {
      const dateStr = `2026-06-${i < 10 ? '0' + i : i}`;
      const dateObj = new Date(2026, 5, i); // June is 5 (0-indexed)
      this.dateItems.push({
        dateStr: dateStr,
        dayName: days[dateObj.getDay()],
        dayNum: i
      });
    }
  }

  // Generate calendar grid structure for June 2026 (starts on Monday, so June 1 is index 1, Sunday is May 31/empty)
  generateCalendarCells() {
    const cells: CalendarCell[] = [];
    
    // June 1 is a Monday, so Sunday starts as padding
    cells.push({ dayNum: null, dateStr: '' });
    
    for (let i = 1; i <= 30; i++) {
      const dateStr = `2026-06-${i < 10 ? '0' + i : i}`;
      cells.push({
        dayNum: i,
        dateStr: dateStr
      });
    }

    // Complete the grid (7 columns)
    while (cells.length % 7 !== 0) {
      cells.push({ dayNum: null, dateStr: '' });
    }

    this.calendarCells = cells;
  }

  // Load state from local storage or set defaults
  loadData() {
    const savedClassDays = localStorage.getItem('m5_class_days');
    const savedAttendance = localStorage.getItem('m5_attendance_data');

    if (savedClassDays) {
      this.classDays = JSON.parse(savedClassDays);
    } else {
      // Default: Weekdays (Mon-Fri) are Class Days, Weekends are No Class
      this.dateItems.forEach(d => {
        const dateObj = new Date(2026, 5, d.dayNum);
        const day = dateObj.getDay();
        this.classDays[d.dateStr] = (day !== 0 && day !== 6);
      });
      this.saveClassDays();
    }

    if (savedAttendance) {
      this.attendanceData = JSON.parse(savedAttendance);
    } else {
      // Default: Initialize randomized attendance for all members
      this.membersData.forEach(member => {
        this.attendanceData[member.name] = {};
        this.dateItems.forEach(d => {
          if (this.classDays[d.dateStr]) {
            // 75% chance of being present on class days
            this.attendanceData[member.name][d.dateStr] = Math.random() > 0.25;
          } else {
            this.attendanceData[member.name][d.dateStr] = false;
          }
        });
      });
      this.saveAttendanceData();
    }
  }

  // Filter members based on team and query (searches across all teams and auto-focuses matching team if found)
  applyFilters() {
    const query = this.searchQuery.toLowerCase().trim();
    
    if (query) {
      const foundMatch = this.membersData.find(m => m.name.toLowerCase().includes(query));
      if (foundMatch && foundMatch.team !== this.selectedTeam) {
        this.selectedTeam = foundMatch.team;
      }
    }

    this.filteredMembers = this.membersData.filter(m => {
      const teamMatch = m.team === this.selectedTeam;
      const queryMatch = query ? m.name.toLowerCase().includes(query) : true;
      return teamMatch && queryMatch;
    });

    // Handle selected member index out of bounds
    if (this.filteredMembers.length > 0) {
      if (!this.selectedMember || !this.filteredMembers.some(m => m.name === this.selectedMember?.name)) {
        this.selectedMember = this.filteredMembers[0];
      }
    } else {
      this.selectedMember = null;
    }
  }

  selectTeam(team: string) {
    this.selectedTeam = team;
    this.applyFilters();
    if (this.filteredMembers.length > 0) {
      this.selectMember(this.filteredMembers[0]);
    }
  }

  selectMember(member: Member) {
    this.selectedMember = member;
    this.scrollToMember(member);
  }

  selectDate(dateStr: string) {
    this.selectedDateStr = dateStr;
    const dateItem = this.dateItems.find(d => d.dateStr === dateStr);
    if (dateItem) {
      this.scrollToDate(dateItem);
    }
  }

  toggleAttendance(memberName: string) {
    if (!this.classDays[this.selectedDateStr]) return; // Cannot toggle if not a class day
    
    if (!this.attendanceData[memberName]) {
      this.attendanceData[memberName] = {};
    }
    this.attendanceData[memberName][this.selectedDateStr] = !this.attendanceData[memberName][this.selectedDateStr];
    this.saveAttendanceData();
  }

  toggleClassDay() {
    this.classDays[this.selectedDateStr] = !this.classDays[this.selectedDateStr];
    
    // If class day is set to false, set attendance to false for that date for all members
    if (!this.classDays[this.selectedDateStr]) {
      this.membersData.forEach(m => {
        if (this.attendanceData[m.name]) {
          this.attendanceData[m.name][this.selectedDateStr] = false;
        }
      });
      this.saveAttendanceData();
    }
    
    this.saveClassDays();
  }

  // Calculate percentage of group present
  getGroupPercentage(): number {
    const teamMembers = this.membersData.filter(m => m.team === this.selectedTeam);
    if (teamMembers.length === 0) return 0;

    let present = 0;
    teamMembers.forEach(m => {
      if (this.attendanceData[m.name]?.[this.selectedDateStr]) {
        present++;
      }
    });

    return Math.round((present / teamMembers.length) * 100);
  }

  // Calculate individual monthly attendance rate (present class days / total class days)
  getMemberAttendanceRate(name: string): number {
    const memberAttendance = this.attendanceData[name];
    if (!memberAttendance) return 0;

    let classDaysCount = 0;
    let presentCount = 0;

    this.dateItems.forEach(d => {
      if (this.classDays[d.dateStr]) {
        classDaysCount++;
        if (memberAttendance[d.dateStr]) {
          presentCount++;
        }
      }
    });

    if (classDaysCount === 0) return 100;
    return Math.round((presentCount / classDaysCount) * 100);
  }

  // Scroll snapping helpers
  scrollToMember(member: Member) {
    setTimeout(() => {
      const el = document.getElementById('member-item-' + member.name.replace(/\s+/g, '-'));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      }
    }, 10);
  }

  scrollToDate(dateItem: DateItem) {
    setTimeout(() => {
      const el = document.getElementById('date-item-' + dateItem.dateStr);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }, 10);
  }

  getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  saveAttendanceData() {
    localStorage.setItem('m5_attendance_data', JSON.stringify(this.attendanceData));
  }

  saveClassDays() {
    localStorage.setItem('m5_class_days', JSON.stringify(this.classDays));
  }

  goBackToProfile() {
    this.router.navigate(['grp-a/member5']);
  }
}

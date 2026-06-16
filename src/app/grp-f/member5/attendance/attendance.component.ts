import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

interface TeamNode {
  name: string;
  children?: TeamNode[];
}

interface AttendanceRecord {
  memberId: string;
  memberName: string;
  teamName: string;
  attendance: { [dateStr: string]: boolean };
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
})
 export class AttendanceComponent implements OnInit {
  rawCsvData = [
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
    { team: 'Team F', name: 'Shrestha Mohanty' },
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
    { team: 'Team G', name: 'Swarna Sharma ' },
  ];

  availableTeams: string[] = [
    'Team A',
    'Team B',
    'Team C',
    'Team D',
    'Team E',
    'Team F',
    'Team G',
  ];
  attendanceRecords: AttendanceRecord[] = [];
  filteredTableData: AttendanceRecord[] = [];

  treeControl = new NestedTreeControl<TeamNode>((node) => node.children);
  treeDataSource = new MatTreeNestedDataSource<TeamNode>();

  dates: string[] = [];
  displayedColumns: string[] = ['actions', 'memberName'];
  selectedCalendarDate: Date = new Date(2026, 5, 7);
  currentDateStr: string = '2026-06-07';
  isLocked: boolean = false;

  searchQuery: string = '';
  activeFilteredTeam: string | null = null;
  activeFilteredMemberName: string | null = null;

  workingBuffer: { [key: string]: boolean } = {};

  newMemberName: string = '';
  newMemberTeam: string = 'Team A';

  // Fixed Audit Tracking State bindings
  historySearchMemberId: string = '';
  historySearchMonth: string = '5'; // Kept as string to match select bindings exactly
  individualHistoryLog: string[] = [];

  constructor() {
    this.initializeDatabase();
    this.buildStaticTree();
    this.onCalendarDateChange(this.selectedCalendarDate);
  }

  ngOnInit() {
    this.loadFromLocalStorage();
    this.applyFilters();
  }

  initializeDatabase() {
    this.attendanceRecords = this.rawCsvData.map((m, index) => ({
      memberId: 'm_' + (index + 1),
      memberName: m.name,
      teamName: m.team,
      attendance: {
        '2026-06-02': Math.random() > 0.3,
        '2026-06-03': Math.random() > 0.2,
        '2026-06-04': Math.random() > 0.4,
        '2026-06-06': Math.random() > 0.1,
      },
    }));
  }

  buildStaticTree() {
    const computedTree: TeamNode[] = this.availableTeams.map((teamName) => ({
      name: teamName,
      children: this.attendanceRecords
        .filter((r) => r.teamName === teamName)
        .map((r) => ({ name: r.memberName })),
    }));
    this.treeDataSource.data = computedTree;
  }

  hasChild = (_: number, node: TeamNode) =>
    !!node.children && node.children.length > 0;

  onCalendarDateChange(newDate: Date) {
    if (!newDate) return;
    this.selectedCalendarDate = newDate;
    this.currentDateStr = this.formatDateKey(newDate);

    this.dates = [];
    this.displayedColumns = ['actions', 'memberName'];

    for (let i = -2; i <= 2; i++) {
      const d = new Date(newDate);
      d.setDate(newDate.getDate() + i);
      const dateStr = this.formatDateKey(d);
      this.dates.push(dateStr);
      this.displayedColumns.push(dateStr);
    }
    this.workingBuffer = {};
    this.applyFilters();
  }

  formatDateKey(date: Date): string {
    const offset = date.getTimezoneOffset();
    const cleanDate = new Date(date.getTime() - offset * 60 * 1000);
    return cleanDate.toISOString().split('T')[0];
  }

  onNodeSelect(node: TeamNode) {
    if (node.children) {
      this.activeFilteredTeam = node.name;
      this.activeFilteredMemberName = null;
    } else {
      this.activeFilteredTeam = null;
      this.activeFilteredMemberName = node.name;
    }
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }

  clearAllFilters() {
    this.searchQuery = '';
    this.activeFilteredTeam = null;
    this.activeFilteredMemberName = null;
    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.attendanceRecords];

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      result = result.filter((r) => r.memberName.toLowerCase().includes(query));
    }
    if (this.activeFilteredTeam) {
      result = result.filter((r) => r.teamName === this.activeFilteredTeam);
    }
    if (this.activeFilteredMemberName) {
      result = result.filter(
        (r) => r.memberName === this.activeFilteredMemberName,
      );
    }

    this.filteredTableData = result;
    this.calculateIndividualHistory();
  }

  isDateEditable(dateStr: string): boolean {
    if (this.isLocked) return false;
    return dateStr === this.currentDateStr;
  }

  getBufferKey(memberId: string, dateStr: string): string {
    return `${memberId}_${dateStr}`;
  }

  onCheckboxToggle(
    record: AttendanceRecord,
    dateStr: string,
    isChecked: boolean,
  ) {
    if (!this.isDateEditable(dateStr)) return;
    const key = this.getBufferKey(record.memberId, dateStr);
    this.workingBuffer[key] = isChecked;
  }

  isRowChecked(record: AttendanceRecord, dateStr: string): boolean {
    const key = this.getBufferKey(record.memberId, dateStr);
    if (this.workingBuffer[key] !== undefined) {
      return this.workingBuffer[key];
    }
    return !!record.attendance[dateStr];
  }

  submitAttendance() {
    if (this.isLocked) return;

    this.attendanceRecords.forEach((record) => {
      const key = this.getBufferKey(record.memberId, this.currentDateStr);
      if (this.workingBuffer[key] !== undefined) {
        record.attendance[this.currentDateStr] = this.workingBuffer[key];
      }
    });

    this.workingBuffer = {};
    this.saveToLocalStorage();
    this.applyFilters();
    alert(`Attendance data for ${this.currentDateStr} submitted successfully.`);
  }

  lockSystem() {
    if (
      confirm(
        'Permanently freeze system modifications? This action cannot be reversed.',
      )
    ) {
      this.isLocked = true;
      this.workingBuffer = {};
      this.saveToLocalStorage();
    }
  }

  addMember() {
    if (!this.newMemberName.trim()) return;

    const newRecord: AttendanceRecord = {
      memberId: 'mem_' + Date.now(),
      memberName: this.newMemberName.trim(),
      teamName: this.newMemberTeam,
      attendance: {},
    };

    this.attendanceRecords.push(newRecord);
    this.newMemberName = '';

    this.saveToLocalStorage();
    this.buildStaticTree();
    this.applyFilters();
  }

  deleteMember(memberId: string) {
    if (confirm('Are you sure you want to remove this member profile?')) {
      this.attendanceRecords = this.attendanceRecords.filter(
        (r) => r.memberId !== memberId,
      );
      if (this.historySearchMemberId === memberId)
        this.historySearchMemberId = '';

      this.saveToLocalStorage();
      this.buildStaticTree();
      this.applyFilters();
    }
  }

  // FIXED: Explicit lookup execution that reads directly from the current model values
  calculateIndividualHistory() {
    this.individualHistoryLog = [];
    if (!this.historySearchMemberId) return;

    const targetUser = this.attendanceRecords.find(
      (r) => r.memberId === this.historySearchMemberId,
    );
    if (!targetUser) return;

    const targetMonthNum = Number(this.historySearchMonth);

    Object.keys(targetUser.attendance).forEach((dateKey) => {
      if (targetUser.attendance[dateKey] === true) {
        const parsedDate = new Date(dateKey + 'T00:00:00'); // Forces stable time parsing
        if (parsedDate.getMonth() === targetMonthNum) {
          this.individualHistoryLog.push(dateKey);
        }
      }
    });
    this.individualHistoryLog.sort();
  }

  saveToLocalStorage() {
    localStorage.setItem(
      'member5_attendance_array',
      JSON.stringify(this.attendanceRecords),
    );
    localStorage.setItem('member5_system_freeze', JSON.stringify(this.isLocked));
  }

  loadFromLocalStorage() {
    const savedRecords = localStorage.getItem('member5_attendance_array');
    const savedLock = localStorage.getItem('member5_system_freeze');

    if (savedRecords) {
      this.attendanceRecords = JSON.parse(savedRecords);
    }
    if (savedLock) {
      this.isLocked = JSON.parse(savedLock);
    }
  }
}

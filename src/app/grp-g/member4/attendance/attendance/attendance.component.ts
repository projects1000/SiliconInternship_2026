import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

interface AttendanceTreeNode {
  name: string;
  children?: AttendanceTreeNode[];
}

interface AttendanceRecord {
  memberId: string;
  memberName: string;
  group: string;
  attendance: { [date: string]: boolean };
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  lockedDates: string[] = [];
  selectedDate: Date = new Date();
  currentDateStr = this.formatDateKey(this.selectedDate);
  todayStr: string = this.formatDateKey(new Date());
  dates: string[] = this.buildDateRange(this.selectedDate);
  displayedColumns: string[] = ['group', 'memberName', ...this.dates];

  searchQuery = '';
  activeFilteredTeam: string | null = null;
  activeFilteredMemberName: string | null = null;

  workingBuffer: { [key: string]: boolean } = {};

  treeControl = new NestedTreeControl<AttendanceTreeNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<AttendanceTreeNode>();

  attendanceRecords: AttendanceRecord[] = [];
  filteredTableData: AttendanceRecord[] = [];

  rawMembers = [
    { group: 'A', name: 'Soyngsruti Jena' },
    { group: 'A', name: 'Swagat Das' },
    { group: 'A', name: 'Samikshya Samadarshini' },
    { group: 'A', name: 'Archana Devi' },
    { group: 'A', name: 'Roshan Mishra' },
    { group: 'A', name: 'Satyabrat Sarangi' },
    { group: 'A', name: 'Priyanshu Sekhar' },
    { group: 'A', name: 'Ankit Prasad' },
    { group: 'A', name: 'Ronit Kumar Swain' },
    { group: 'B', name: 'Jagannath Padhi' },
    { group: 'B', name: 'Rohan Kumar Nayak' },
    { group: 'B', name: 'Tushar Ranjan Muduli' },
    { group: 'B', name: 'Snehasis Das' },
    { group: 'B', name: 'Omkar Sahoo' },
    { group: 'B', name: 'Motilal Turuk' },
    { group: 'C', name: 'Gayatri Pati' },
    { group: 'C', name: 'Gaurav Patra' },
    { group: 'C', name: 'Ayush Guharay' },
    { group: 'C', name: 'Anup Mohanty' },
    { group: 'C', name: 'Adil Khan' },
    { group: 'C', name: 'Anurag Mohanty' },
    { group: 'C', name: 'Debashis Tripathy' },
    { group: 'C', name: 'Safaq Jamal' },
    { group: 'C', name: 'Sohan Mohanty' },
    { group: 'C', name: 'Hrushikesh Pattnaik' },
    { group: 'D', name: 'Chandan Kumar Sahu' },
    { group: 'D', name: 'Sitikantha Dalal' },
    { group: 'D', name: 'Titiksha Sahu' },
    { group: 'D', name: 'Anjali Sahoo' },
    { group: 'D', name: 'Sushree Sangita Sethi' },
    { group: 'D', name: 'Mama Bisoi' },
    { group: 'D', name: 'Tanmay Sahu' },
    { group: 'D', name: 'Pratik Parag Pani' },
    { group: 'D', name: 'Ranit Das' },
    { group: 'D', name: 'Shobha Kumari' },
    { group: 'D', name: 'CS Vishal Rout' },
    { group: 'E', name: 'Rajesh Behera' },
    { group: 'E', name: 'Maniket Padhan' },
    { group: 'E', name: 'Jeevan Jyoti Panigrahi' },
    { group: 'E', name: 'Ayush Mishra' },
    { group: 'E', name: 'Mohit Singal' },
    { group: 'E', name: 'Dhiraj Mahapatra' },
    { group: 'E', name: 'Swayam Sahu' },
    { group: 'E', name: 'Subhashree Mohapatra' },
    { group: 'E', name: 'Subhalaxmi Sahoo' },
    { group: 'F', name: 'Rajshree Panda' },
    { group: 'F', name: 'Soumyashree Panda' },
    { group: 'F', name: 'Rupali Jena' },
    { group: 'F', name: 'Lipsa Panda' },
    { group: 'F', name: 'Shreshtha Mohanty' },
    { group: 'F', name: 'Sukanya Subhadarshini' },
    { group: 'F', name: 'Anjali Mishra' },
    { group: 'F', name: 'Prachi Pratyasha Das' },
    { group: 'F', name: 'Nirmit Nayak' },
    { group: 'F', name: 'Padmalaya Meher' },
    { group: 'G', name: 'Shubham Kumar' },
    { group: 'G', name: 'Yash Kumar' },
    { group: 'G', name: 'Sasawat Rout' },
    { group: 'G', name: 'Adarsh Kumar' },
    { group: 'G', name: 'Amit Kumar Yash' },
    { group: 'G', name: 'C H Tanisha' },
    { group: 'G', name: 'Pratikshya Acharya' },
    { group: 'G', name: 'Mahesh Dakua' },
    { group: 'G', name: 'Anil Kumar Nayak' },
    { group: 'G', name: 'Khushi Sahu' }
  ];

  ngOnInit(): void {
    this.todayStr = this.formatDateKey(new Date());
    this.initializeRecords();
    this.buildTree();
    this.loadFromLocalStorage();
    this.applyFilters();
  }

  initializeRecords() {
    if (this.attendanceRecords.length) {
      return;
    }

    const twoDaysAgoDate = new Date(this.selectedDate.getTime() - 2 * 24 * 60 * 60 * 1000);
    const yesterdayDate = new Date(this.selectedDate.getTime() - 1 * 24 * 60 * 60 * 1000);
    const twoDaysAgo = this.formatDateKey(twoDaysAgoDate);
    const yesterday = this.formatDateKey(yesterdayDate);

    this.attendanceRecords = this.rawMembers.map((member, index) => {
      const attendance: { [date: string]: boolean } = {};
      if (index % 2 === 0) {
        attendance[twoDaysAgo] = true;
      }
      if (index % 3 !== 0) {
        attendance[yesterday] = true;
      }

      return {
        memberId: `m_${index + 1}`,
        memberName: member.name,
        group: member.group,
        attendance,
      };
    });
  }

  buildTree() {
    const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    this.dataSource.data = groups.map((group) => ({
      name: `Grp ${group}`,
      children: this.attendanceRecords
        .filter((record) => record.group === group)
        .map((record) => ({ name: record.memberName })),
    }));
  }

  buildDateRange(baseDate: Date): string[] {
    const dates: string[] = [];
    for (let offset = -1; offset <= 1; offset++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + offset);
      dates.push(this.formatDateKey(date));
    }
    return dates;
  }

  formatDateKey(date: Date): string {
    const offset = date.getTimezoneOffset();
    const fixed = new Date(date.getTime() - offset * 60 * 1000);
    return fixed.toISOString().split('T')[0];
  }

  onDateInputChange(value: string) {
    if (!value) {
      return;
    }
    this.selectedDate = new Date(value);
    this.currentDateStr = this.formatDateKey(this.selectedDate);
    this.dates = this.buildDateRange(this.selectedDate);
    this.displayedColumns = ['group', 'memberName', ...this.dates];
    this.workingBuffer = {};
    this.applyFilters();
  }

  onSearchChange(value: string) {
    this.searchQuery = value;
    this.applyFilters();
  }

  onNodeSelect(node: AttendanceTreeNode) {
    if (node.children) {
      this.activeFilteredTeam = node.name.replace('Grp ', '');
      this.activeFilteredMemberName = null;
    } else {
      this.activeFilteredTeam = null;
      this.activeFilteredMemberName = node.name;
    }
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
      const query = this.searchQuery.toLowerCase();
      result = result.filter((record) =>
        record.memberName.toLowerCase().includes(query),
      );
    }

    if (this.activeFilteredTeam) {
      result = result.filter((record) => record.group === this.activeFilteredTeam);
    }

    if (this.activeFilteredMemberName) {
      result = result.filter((record) => record.memberName === this.activeFilteredMemberName);
    }

    this.filteredTableData = result;
  }

  hasChild = (_: number, node: AttendanceTreeNode) =>
    !!node.children && node.children.length > 0;

  isDateEditable(dateStr: string): boolean {
    if (this.isPastDate(dateStr)) {
      return false;
    }
    return dateStr === this.currentDateStr && !this.isDateLocked(dateStr);
  }

  isDateLocked(dateStr: string): boolean {
    return this.lockedDates.includes(dateStr);
  }

  isPastDate(dateStr: string): boolean {
    // ISO date strings compare lexicographically for ordering
    return dateStr < this.todayStr;
  }

  getBufferKey(memberId: string, dateStr: string): string {
    return `${memberId}_${dateStr}`;
  }

  onCheckboxToggle(record: AttendanceRecord, dateStr: string, checked: boolean) {
    if (!this.isDateEditable(dateStr)) {
      return;
    }
    this.workingBuffer[this.getBufferKey(record.memberId, dateStr)] = checked;
  }

  isRowChecked(record: AttendanceRecord, dateStr: string): boolean {
    const key = this.getBufferKey(record.memberId, dateStr);
    if (this.workingBuffer[key] !== undefined) {
      return this.workingBuffer[key];
    }
    return !!record.attendance[dateStr];
  }

  submitAttendance() {
    if (this.isPastDate(this.currentDateStr)) {
      alert('Cannot submit attendance for past dates.');
      return;
    }
    if (this.isDateLocked(this.currentDateStr)) {
      return;
    }
    this.attendanceRecords.forEach((record) => {
      const key = this.getBufferKey(record.memberId, this.currentDateStr);
      if (this.workingBuffer[key] !== undefined) {
        record.attendance[this.currentDateStr] = this.workingBuffer[key];
      }
    });
    this.workingBuffer = {};
    this.saveToLocalStorage();
    this.applyFilters();
    alert(`Attendance submitted for ${this.currentDateStr}.`);
  }

  lockSystem() {
    if (!confirm('Lock attendance for the selected date? This cannot be undone for that date.')) {
      return;
    }
    if (!this.isDateLocked(this.currentDateStr)) {
      this.lockedDates.push(this.currentDateStr);
    }
    this.workingBuffer = {};
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('member4_attendance_records', JSON.stringify(this.attendanceRecords));
    localStorage.setItem('member4_attendance_locked_dates', JSON.stringify(this.lockedDates));
    localStorage.setItem('member4_attendance_date', this.currentDateStr);
  }

  loadFromLocalStorage() {
    const savedRecords = localStorage.getItem('member4_attendance_records');
    const savedLockedDates = localStorage.getItem('member4_attendance_locked_dates');
    const savedDate = localStorage.getItem('member4_attendance_date');

    if (savedRecords) {
      this.attendanceRecords = JSON.parse(savedRecords);
    }
    if (savedLockedDates) {
      this.lockedDates = JSON.parse(savedLockedDates);
    }
    if (savedDate) {
      this.currentDateStr = savedDate;
      this.selectedDate = new Date(savedDate);
      this.dates = this.buildDateRange(this.selectedDate);
      this.displayedColumns = ['group', 'memberName', ...this.dates];
    }
    this.buildTree();
  }
}

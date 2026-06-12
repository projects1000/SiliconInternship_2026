import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MatTableDataSource } from '@angular/material/table';

export interface Member {
  id: string;
  name: string;
  group: string;
}

export interface TeamNode {
  name: string;
  group?: string;
  id?: string;
  children?: TeamNode[];
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  isDarkMode: boolean = true;

  // Local Array of Members (Group A to Group G)
  members: Member[] = [
    // Group A
    { id: '1', name: 'Soyngsruti Jena', group: 'Group A' },
    { id: '2', name: 'Swagat Das', group: 'Group A' },
    { id: '3', name: 'Samikshya Samadarshini', group: 'Group A' },
    { id: '4', name: 'Archana Devi', group: 'Group A' },
    { id: '5', name: 'Roshan Mishra', group: 'Group A' },
    { id: '6', name: 'Satyabrat Sarangi', group: 'Group A' },
    { id: '7', name: 'Priyanshu Sekhar Badhei', group: 'Group A' },
    { id: '8', name: 'Ankit Prasad', group: 'Group A' },
    { id: '9', name: 'Ronit Kumar Swain', group: 'Group A' },
    // Group B
    { id: '10', name: 'Jagannath Padhi', group: 'Group B' },
    { id: '11', name: 'Rohan Kumar Nayak', group: 'Group B' },
    { id: '12', name: 'Tushar Ranjan Muduli', group: 'Group B' },
    { id: '13', name: 'Snehasis Das', group: 'Group B' },
    { id: '14', name: 'Omkar Sahoo', group: 'Group B' },
    { id: '15', name: 'Motilal Turuk', group: 'Group B' },
    // Group C
    { id: '16', name: 'Gayatri Pati', group: 'Group C' },
    { id: '17', name: 'Gaurav Patra', group: 'Group C' },
    { id: '18', name: 'Ayush Guharay', group: 'Group C' },
    { id: '19', name: 'Anup Mohanty', group: 'Group C' },
    { id: '20', name: 'Adil Khan', group: 'Group C' },
    { id: '21', name: 'Anurag Mohanty', group: 'Group C' },
    { id: '22', name: 'Debashis Tripathy', group: 'Group C' },
    { id: '23', name: 'Safaq Jamal', group: 'Group C' },
    { id: '24', name: 'Sohan Mohanty', group: 'Group C' },
    { id: '25', name: 'Hrushikesh Pattnaik', group: 'Group C' },
    // Group D
    { id: '26', name: 'Chandan Kumar Sahu', group: 'Group D' },
    { id: '27', name: 'Sitikantha Dalal', group: 'Group D' },
    { id: '28', name: 'Titiksha Sahu', group: 'Group D' },
    { id: '29', name: 'Anjali Sahoo', group: 'Group D' },
    { id: '30', name: 'Sushree Sangita Sethi', group: 'Group D' },
    { id: '31', name: 'Mama Bisoi', group: 'Group D' },
    { id: '32', name: 'Tanmay Sahu', group: 'Group D' },
    { id: '33', name: 'Pratik Parag Pani', group: 'Group D' },
    { id: '34', name: 'Ranit Das', group: 'Group D' },
    { id: '35', name: 'Shobha Kumari', group: 'Group D' },
    { id: '36', name: 'CS Vishal Rout', group: 'Group D' },
    // Group E
    { id: '37', name: 'Rajesh Behera', group: 'Group E' },
    { id: '38', name: 'Maniket Padhan', group: 'Group E' },
    { id: '39', name: 'Jeevan Jyoti Panigrahi', group: 'Group E' },
    { id: '40', name: 'Ayush Mishra', group: 'Group E' },
    { id: '41', name: 'Mohit Singal', group: 'Group E' },
    { id: '42', name: 'Dhiraj Mahapatra', group: 'Group E' },
    { id: '43', name: 'Swayam Sahu', group: 'Group E' },
    { id: '44', name: 'Subhashree Mohapatra', group: 'Group E' },
    { id: '45', name: 'Subhalaxmi Sahoo', group: 'Group E' },
    // Group F
    { id: '46', name: 'Rajshree Panda', group: 'Group F' },
    { id: '47', name: 'Soumyashree Panda', group: 'Group F' },
    { id: '48', name: 'Rupali Jena', group: 'Group F' },
    { id: '49', name: 'Lipsa Panda', group: 'Group F' },
    { id: '50', name: 'Shreshtha Mohanty', group: 'Group F' },
    { id: '51', name: 'Sukanya Subhadarshini', group: 'Group F' },
    { id: '52', name: 'Anjali Mishra', group: 'Group F' },
    { id: '53', name: 'Prachi Pratyasha Das', group: 'Group F' },
    { id: '54', name: 'Nirmit Nayak', group: 'Group F' },
    { id: '55', name: 'Padmalaya Meher', group: 'Group F' },
    // Group G
    { id: '56', name: 'Shubham Kumar', group: 'Group G' },
    { id: '57', name: 'Yash Kumar', group: 'Group G' },
    { id: '58', name: 'Sasawat Rout', group: 'Group G' },
    { id: '59', name: 'Adarsh Kumar', group: 'Group G' },
    { id: '60', name: 'Amit Kumar Yash', group: 'Group G' },
    { id: '61', name: 'C H Tanisha', group: 'Group G' },
    { id: '62', name: 'Pratikshya Acharya', group: 'Group G' },
    { id: '63', name: 'Mahesh Dakua', group: 'Group G' },
    { id: '64', name: 'Anil Kumar Nayak', group: 'Group G' },
    { id: '65', name: 'Khushisahu', group: 'Group G' },
    { id: '66', name: 'Swarna Sharma', group: 'Group G' }
  ];

  // State Management
  selectedDate: Date = new Date();
  maxDate: Date = new Date();
  selectedGroup: string = '';
  selectedMemberId: string = '';
  searchQuery: string = '';
  
  // Storage keys in Local Storage
  private STORAGE_KEY = 'member7_attendance_store';
  attendanceRecords: { [key: string]: boolean } = {}; // memberId_YYYY-MM-DD -> boolean (present/absent)
  lockedDates: string[] = []; // Array of YYYY-MM-DD locked dates

  // Table Configuration
  displayedColumns: string[] = ['name', 'group', 'col0', 'col1', 'col2', 'col3', 'col4'];
  tableDataSource = new MatTableDataSource<Member>();
  
  dateColumns: string[] = []; // YYYY-MM-DD values
  dateLabels: string[] = [];  // Display formatted labels

  // Tree Configuration
  treeControl = new NestedTreeControl<TeamNode>((node: TeamNode) => node.children);
  treeDataSource = new MatTreeNestedDataSource<TeamNode>();

  // Statistics
  stats = {
    presentCount: 0,
    absentCount: 0,
    totalCount: 0,
    activeDatePercentage: 0,
    overallPercentage: 0,
    selectedPercentage: 0,
    lockedDaysCount: 0
  };

  constructor() {}

  ngOnInit(): void {
    this.loadFromLocalStorage();
    this.buildTreeData();
    this.updateDateColumns();
    this.filterTableData();
  }

  // Formatting Date safely
  formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  // Load from Local Storage
  loadFromLocalStorage(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        this.attendanceRecords = parsed.records || {};
        this.lockedDates = parsed.lockedDates || [];
      } catch (e) {
        console.error('Error parsing local storage attendance', e);
      }
    }
  }

  // Save to Local Storage
  saveToLocalStorage(): void {
    const data = {
      records: this.attendanceRecords,
      lockedDates: this.lockedDates
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  // Build the hierarchical tree data
  buildTreeData(): void {
    const grouped = this.members.reduce((acc: any, member) => {
      if (!acc[member.group]) acc[member.group] = [];
      acc[member.group].push({ name: member.name, id: member.id });
      return acc;
    }, {});

    const treeData: TeamNode[] = Object.keys(grouped).map(groupName => ({
      name: groupName,
      group: groupName,
      children: grouped[groupName].map((m: any) => ({ name: m.name, id: m.id }))
    }));

    this.treeDataSource.data = treeData;
    this.treeControl.dataNodes = treeData;
    this.treeControl.expandAll();
  }

  // Check if a node has children (for TreeDef)
  hasChild = (_: number, node: TeamNode) => !!node.children && node.children.length > 0;

  // Change selected date
  onDateChange(event: any): void {
    if (event.value) {
      this.selectedDate = event.value;
      this.updateDateColumns();
      this.filterTableData();
    }
  }

  // Re-calculate the sliding 5 days column labels and dates
  updateDateColumns(): void {
    this.dateColumns = [];
    this.dateLabels = [];
    // 0 is active date, 1 to 4 are past 4 days
    for (let i = 4; i >= 0; i--) {
      const colDate = new Date(this.selectedDate.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = this.formatDate(colDate);
      const dateLabel = colDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      this.dateColumns.push(dateStr);
      this.dateLabels.push(dateLabel);
    }
  }

  // Filter Table Data based on query, tree group, and tree member
  filterTableData(): void {
    let filtered = this.members;

    // Apply tree group selection
    if (this.selectedGroup) {
      filtered = filtered.filter(m => m.group === this.selectedGroup);
    }

    // Apply tree member selection
    if (this.selectedMemberId) {
      filtered = filtered.filter(m => m.id === this.selectedMemberId);
    }

    // Apply text search
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(m => m.name.toLowerCase().includes(q));
    }

    this.tableDataSource.data = filtered;
    this.calculateStats();
  }

  // Tree selection handlers
  selectGroup(groupName: string): void {
    this.selectedGroup = groupName;
    this.selectedMemberId = '';
    this.filterTableData();
  }

  selectMember(memberId: string): void {
    this.selectedMemberId = memberId;
    this.selectedGroup = '';
    this.filterTableData();
  }

  resetFilters(): void {
    this.selectedGroup = '';
    this.selectedMemberId = '';
    this.searchQuery = '';
    this.filterTableData();
  }

  // Search input handler
  onSearchChange(): void {
    this.filterTableData();
  }

  // Attendance Record Accessors
  getRecordKey(memberId: string, dateStr: string): string {
    return `${memberId}_${dateStr}`;
  }

  getAttendance(memberId: string, dateStr: string): boolean {
    const key = this.getRecordKey(memberId, dateStr);
    return !!this.attendanceRecords[key];
  }

  toggleAttendance(memberId: string, dateStr: string): void {
    if (this.isDateLocked(dateStr)) return;
    const key = this.getRecordKey(memberId, dateStr);
    this.attendanceRecords[key] = !this.attendanceRecords[key];
    this.saveToLocalStorage();
    this.calculateStats();
  }

  isDateLocked(dateStr: string): boolean {
    return this.lockedDates.includes(dateStr);
  }

  get isActiveDateLocked(): boolean {
    const activeDateStr = this.formatDate(this.selectedDate);
    return this.isDateLocked(activeDateStr);
  }

  // Lock logic
  lockActiveDate(): void {
    const activeDateStr = this.formatDate(this.selectedDate);
    if (this.isDateLocked(activeDateStr)) return;

    const confirmed = confirm(`Are you sure you want to permanently lock attendance for ${activeDateStr}? You will not be able to edit this date's records again.`);
    if (confirmed) {
      this.lockedDates.push(activeDateStr);
      this.saveToLocalStorage();
      this.calculateStats();
    }
  }

  // Calculate statistics
  calculateStats(): void {
    const activeDateStr = this.formatDate(this.selectedDate);
    let currentFiltered = this.tableDataSource.data;

    let present = 0;
    let absent = 0;
    
    currentFiltered.forEach(m => {
      const isPresent = this.getAttendance(m.id, activeDateStr);
      if (isPresent) {
        present++;
      } else {
        absent++;
      }
    });

    this.stats.presentCount = present;
    this.stats.absentCount = absent;
    this.stats.totalCount = currentFiltered.length;
    this.stats.activeDatePercentage = this.stats.totalCount > 0
      ? Math.round((present / this.stats.totalCount) * 100)
      : 0;
    this.stats.lockedDaysCount = this.lockedDates.length;

    // Calculate Overall percentage for selected scope
    // Get unique list of recorded dates or default to standard dates
    const allRegisteredKeys = Object.keys(this.attendanceRecords);
    const recordedDatesSet = new Set<string>();
    allRegisteredKeys.forEach(k => {
      const parts = k.split('_');
      if (parts.length === 2) {
        recordedDatesSet.add(parts[1]);
      }
    });
    // Add current columns as registered too
    this.dateColumns.forEach(d => recordedDatesSet.add(d));
    const recordedDates = Array.from(recordedDatesSet);

    let totalPossibleRecordsSelectedScope = 0;
    let presentRecordsSelectedScope = 0;

    currentFiltered.forEach(m => {
      recordedDates.forEach(d => {
        totalPossibleRecordsSelectedScope++;
        if (this.getAttendance(m.id, d)) {
          presentRecordsSelectedScope++;
        }
      });
    });

    this.stats.selectedPercentage = totalPossibleRecordsSelectedScope > 0
      ? Math.round((presentRecordsSelectedScope / totalPossibleRecordsSelectedScope) * 100)
      : 0;

    // Overall across all members
    let totalPossibleAll = 0;
    let presentAll = 0;
    this.members.forEach(m => {
      recordedDates.forEach(d => {
        totalPossibleAll++;
        if (this.getAttendance(m.id, d)) {
          presentAll++;
        }
      });
    });

    this.stats.overallPercentage = totalPossibleAll > 0
      ? Math.round((presentAll / totalPossibleAll) * 100)
      : 0;
  }

  // Theme Toggler
  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  // Navigation
  goBack(): void {
    window.history.back();
  }
}

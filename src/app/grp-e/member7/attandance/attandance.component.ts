import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import * as XLSX from 'xlsx';

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
  selector: 'app-attandance',
  templateUrl: './attandance.component.html',
  styleUrls: ['./attandance.component.css']
})
export class AttandanceComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    const sidebar = document.querySelector('app-nav-bar') as HTMLElement;
    const content = document.querySelector('.content') as HTMLElement;
    if (sidebar) sidebar.style.display = '';
    if (content) content.style.padding = '';
  }
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
    { team: 'Team G', name: 'Swarna Sharma ' },
  ];

  availableTeams: string[] = [
    'Team A',
    'Team B',
    'Team C',
    'Team D',
    'Team E',
    'Team F',
    'Team G'
  ];

  attendanceRecords: AttendanceRecord[] = [];
  filteredTableData: AttendanceRecord[] = [];

  treeControl = new NestedTreeControl<TeamNode>((node) => node.children);
  treeDataSource = new MatTreeNestedDataSource<TeamNode>();

  dates: string[] = [];
  displayedColumns: string[] = ['actions', 'memberName'];
  selectedCalendarDate: Date = new Date(2026, 5, 7); // June 7, 2026
  currentDateStr: string = '2026-06-07';
  isLocked: boolean = false;

  searchQuery: string = '';
  activeFilteredTeam: string | null = null;
  activeFilteredMemberName: string | null = null;

  workingBuffer: { [key: string]: boolean } = {};

  newMemberName: string = '';
  newMemberTeam: string = 'Team E';

  // Audit history states
  historySearchMemberId: string = '';
  historySearchMonth: string = '5'; // June (0-indexed 5)
  individualHistoryLog: string[] = [];

  constructor(private router: Router) {
    this.initializeDatabase();
    this.buildStaticTree();
    this.onCalendarDateChange(this.selectedCalendarDate);
  }

  ngOnInit(): void {
    const sidebar = document.querySelector('app-nav-bar') as HTMLElement;
    const content = document.querySelector('.content') as HTMLElement;
    if (sidebar) sidebar.style.display = 'none';
    if (content) content.style.padding = '0';
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
      }
    }));
  }

  buildStaticTree() {
    const computedTree: TeamNode[] = this.availableTeams.map((teamName) => ({
      name: teamName,
      children: this.attendanceRecords
        .filter((r) => r.teamName === teamName)
        .map((r) => ({ name: r.memberName }))
    }));
    this.treeDataSource.data = computedTree;
  }

  hasChild = (_: number, node: TeamNode) =>
    !!node.children && node.children.length > 0;

  onCalendarDateChange(newDate: Date | null) {
    if (!newDate) return;
    this.selectedCalendarDate = newDate;
    this.currentDateStr = this.formatDateKey(newDate);

    this.dates = [];
    this.displayedColumns = ['actions', 'memberName'];

    // Generate surrounding 5 columns (-2 days to +2 days)
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
      if (this.activeFilteredTeam === node.name) {
        this.activeFilteredTeam = null; // Toggle off
      } else {
        this.activeFilteredTeam = node.name;
        this.activeFilteredMemberName = null;
      }
    } else {
      if (this.activeFilteredMemberName === node.name) {
        this.activeFilteredMemberName = null; // Toggle off
      } else {
        this.activeFilteredTeam = null;
        this.activeFilteredMemberName = node.name;
      }
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
        (r) => r.memberName === this.activeFilteredMemberName
      );
    }

    this.filteredTableData = result;
    this.calculateIndividualHistory();
  }

  isDateEditable(dateStr: string): boolean {
    if (this.isLocked) return false;
    // Rule: Attendance can only be marked for the active selected calendar date
    // and cannot be in the future (compared to actual system date)
    const todayStr = this.formatDateKey(new Date());
    if (dateStr > todayStr) return false; // Rule 2: Future dates must remain disabled
    return dateStr === this.currentDateStr; // Rule 1: Editable only for target date
  }

  getBufferKey(memberId: string, dateStr: string): string {
    return `${memberId}_${dateStr}`;
  }

  onCheckboxToggle(
    record: AttendanceRecord,
    dateStr: string,
    isChecked: boolean
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
    alert(`Attendance data for ${this.currentDateStr} saved successfully.`);
  }

  toggleLockState() {
    if (this.isLocked) {
      const confirmUnlock = confirm('Unlock system configurations? This will allow edits again.');
      if (confirmUnlock) {
        this.isLocked = false;
        this.saveToLocalStorage();
      }
    } else {
      const confirmLock = confirm('Freeze system modifications? Attendance can only be read-only when locked.');
      if (confirmLock) {
        this.isLocked = true;
        this.workingBuffer = {};
        this.saveToLocalStorage();
      }
    }
  }

  addMember() {
    if (!this.newMemberName.trim()) return;

    const newRecord: AttendanceRecord = {
      memberId: 'mem_' + Date.now(),
      memberName: this.newMemberName.trim(),
      teamName: this.newMemberTeam,
      attendance: {}
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
        (r) => r.memberId !== memberId
      );
      if (this.historySearchMemberId === memberId) {
        this.historySearchMemberId = '';
      }

      this.saveToLocalStorage();
      this.buildStaticTree();
      this.applyFilters();
    }
  }

  calculateIndividualHistory() {
    this.individualHistoryLog = [];
    if (!this.historySearchMemberId) return;

    const targetUser = this.attendanceRecords.find(
      (r) => r.memberId === this.historySearchMemberId
    );
    if (!targetUser) return;

    const targetMonthNum = Number(this.historySearchMonth);

    Object.keys(targetUser.attendance).forEach((dateKey) => {
      if (targetUser.attendance[dateKey] === true) {
        const parsedDate = new Date(dateKey + 'T00:00:00');
        if (parsedDate.getMonth() === targetMonthNum) {
          this.individualHistoryLog.push(dateKey);
        }
      }
    });
    this.individualHistoryLog.sort();
  }

  exportToExcel() {
    const todayStr = this.formatDateKey(new Date());
    const data = this.attendanceRecords.map((record) => {
      const row: any = {
        'Member ID': record.memberId,
        'Name': record.memberName,
        'Team': record.teamName
      };
      this.dates.forEach((d) => {
        if (d > todayStr) {
          row[d] = '—';
        } else {
          row[d] = record.attendance[d] ? 'Present' : 'Absent';
        }
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance Report');
    XLSX.writeFile(workbook, `Attendance_Report_${this.currentDateStr}.xlsx`);
  }

  exportToPDF() {
    // Build table HTML from current data
    const allDates = this.dates;
    const todayStr = this.formatDateKey(new Date());

    // Header row
    const headerCells = ['#', 'Member Name', 'Team', ...allDates.map(d => {
      const dateObj = new Date(d + 'T00:00:00');
      return dateObj.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    })].map(h => `<th>${h}</th>`).join('');

    // Data rows
    const dataRows = this.filteredTableData.map((record, idx) => {
      const dateCells = allDates.map(d => {
        if (d > todayStr) {
          return `<td class="future">—</td>`;
        }
        const isPresent = this.isRowChecked(record, d);
        return `<td class="${isPresent ? 'present' : 'absent'}">${isPresent ? '✔ P' : '✘ A'}</td>`;
      }).join('');
      return `<tr>
        <td>${idx + 1}</td>
        <td class="name-cell">${record.memberName}</td>
        <td>${record.teamName}</td>
        ${dateCells}
      </tr>`;
    }).join('');

    const reportDate = new Date(this.currentDateStr + 'T00:00:00').toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <title>Attendance Report – ${this.currentDateStr}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            font-size: 12px;
            color: #111;
            background: #fff;
            padding: 32px;
          }
          .report-header {
            text-align: center;
            margin-bottom: 28px;
            border-bottom: 3px solid #F3B323;
            padding-bottom: 16px;
          }
          .report-header h1 {
            font-size: 22px;
            font-weight: 800;
            letter-spacing: 0.08em;
            color: #1a1918;
            margin-bottom: 4px;
          }
          .report-header .sub {
            font-size: 12px;
            color: #555;
            letter-spacing: 0.05em;
          }
          .report-header .badge {
            display: inline-block;
            background: #F3B323;
            color: #1a1918;
            font-weight: 700;
            font-size: 11px;
            padding: 4px 12px;
            border-radius: 20px;
            margin-top: 8px;
            letter-spacing: 0.04em;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
          }
          thead tr {
            background: #1a1918;
            color: #FAF6F0;
          }
          thead th {
            padding: 10px 8px;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.06em;
            text-align: center;
            border: 1px solid #333;
            text-transform: uppercase;
          }
          thead th:nth-child(1) { width: 36px; }
          thead th:nth-child(2) { text-align: left; min-width: 150px; }
          thead th:nth-child(3) { min-width: 70px; }
          tbody tr:nth-child(even) { background: #f7f7f7; }
          tbody td {
            padding: 8px;
            border: 1px solid #ddd;
            text-align: center;
            font-size: 11px;
            color: #111;
          }
          tbody td.name-cell {
            text-align: left;
            font-weight: 600;
          }
          td.present {
            background: #d1fae5;
            color: #065f46;
            font-weight: 700;
          }
          td.absent {
            background: #fee2e2;
            color: #991b1b;
            font-weight: 600;
          }
          td.future {
            background: #f3f4f6;
            color: #9ca3af;
            font-weight: 500;
          }
          .summary {
            margin-top: 20px;
            font-size: 11px;
            color: #555;
            display: flex;
            justify-content: space-between;
          }
          .legend {
            display: flex;
            gap: 16px;
            align-items: center;
            margin-top: 16px;
            font-size: 11px;
          }
          .legend-item { display: flex; align-items: center; gap: 6px; }
          .legend-box {
            width: 14px; height: 14px; border-radius: 2px; display: inline-block;
          }
          .legend-box.p { background: #d1fae5; border: 1px solid #6ee7b7; }
          .legend-box.a { background: #fee2e2; border: 1px solid #fca5a5; }
          .legend-box.f { background: #f3f4f6; border: 1px solid #d1d5db; }
          @media print {
            body { padding: 16px; }
            @page { margin: 12mm; size: A4 landscape; }
          }
        </style>
      </head>
      <body>
        <div class="report-header">
          <h1>✳ ATTENDANCE MATRIX</h1>
          <div class="sub">SILICON INTERNSHIP PROGRAM 2026 — SWAYAM EDITION</div>
          <div class="badge">Active Period: ${reportDate}</div>
        </div>
        <table>
          <thead><tr>${headerCells}</tr></thead>
          <tbody>${dataRows}</tbody>
        </table>
        <div class="summary">
          <span>Total Records: <strong>${this.filteredTableData.length}</strong></span>
          <span>Generated: ${new Date().toLocaleString('en-IN')}</span>
        </div>
        <div class="legend">
          <div class="legend-item"><div class="legend-box p"></div> Present (✔ P)</div>
          <div class="legend-item"><div class="legend-box a"></div> Absent (✘ A)</div>
          <div class="legend-item"><div class="legend-box f"></div> Upcoming (—)</div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank', 'width=1200,height=800');
    if (!printWindow) {
      alert('Please allow popups for this site to export PDF.');
      return;
    }
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 600);
  }

  goBackToPortfolio() {
    this.router.navigate(['/grp-e/member7']);
  }

  saveToLocalStorage() {
    localStorage.setItem(
      'm7_attendance_records',
      JSON.stringify(this.attendanceRecords)
    );
    localStorage.setItem('m7_attendance_locked', JSON.stringify(this.isLocked));
  }

  loadFromLocalStorage() {
    const savedRecords = localStorage.getItem('m7_attendance_records');
    const savedLock = localStorage.getItem('m7_attendance_locked');

    if (savedRecords) {
      this.attendanceRecords = JSON.parse(savedRecords);
    }
    if (savedLock) {
      this.isLocked = JSON.parse(savedLock);
    }
  }
}

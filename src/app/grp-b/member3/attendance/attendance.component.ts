import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter
} from '@angular/material/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import * as XLSX from 'xlsx';
import { MASTER_STUDENTS } from './attendance.constants';
import {
  AttendanceByDate,
  AttendanceRecord,
  AttendanceStatus,
  AttendanceStorage,
  AttendanceSummary,
  HeatmapCell,
  MemberPercentages,
  MonthlyAnalytics,
  MonthlyStats,
  Student,
  TableRecord,
  TopPerformer
} from './attendance.models';

Chart.register(...registerables);

class AttendanceDateAdapter extends NativeDateAdapter {
  override format(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}

const ATTENDANCE_DATE_FORMATS = {
  parse: {
    dateInput: 'input'
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { month: 'short', year: 'numeric' },
    dateA11yLabel: { day: '2-digit', month: 'long', year: 'numeric' },
    monthYearA11yLabel: { month: 'long', year: 'numeric' }
  }
};

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  providers: [
    { provide: DateAdapter, useClass: AttendanceDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: ATTENDANCE_DATE_FORMATS }
  ]
})
export class AttendanceComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('trendChart') trendChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild(MatSort) sort!: MatSort;

  private readonly STORAGE_KEY = 'member3-attendance';
  private trendChart: Chart | null = null;
  private chartReady = false;

  students: Student[] = [];
  attendanceByDate: AttendanceByDate = {};
  lockedDates: string[] = [];
  memberPercentages: MemberPercentages = {};

  selectedDate = new Date();
  selectedMonth = new Date().getMonth();
  searchText = '';

  newStudentName = '';
  newStudentReg = '';
  editingReg: string | null = null;
  editStudentName = '';
  editStudentReg = '';

  summary: AttendanceSummary = {
    total: 0,
    present: 0,
    absent: 0,
    late: 0,
    percentage: 0
  };

  monthlyAnalytics: MonthlyAnalytics = {
    daysTracked: 0,
    avgPercentage: 0,
    bestDay: '—',
    bestDayPercentage: 0
  };

  monthlyStats: MonthlyStats = {
    totalPercentage: 0,
    presentDays: 0,
    absentDays: 0,
    lateDays: 0
  };

  topPerformers: TopPerformer[] = [];
  heatmapCells: HeatmapCell[] = [];
  streakDays = 0;
  chartAnimated = false;
  sortByPercentage = true;

  displayedColumns: string[] = ['name', 'attendancePct', 'status', 'actions'];
  dataSource = new MatTableDataSource<TableRecord>([]);

  readonly monthOptions = [
    { value: 0, label: 'January' },
    { value: 1, label: 'February' },
    { value: 2, label: 'March' },
    { value: 3, label: 'April' },
    { value: 4, label: 'May' },
    { value: 5, label: 'June' },
    { value: 6, label: 'July' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'October' },
    { value: 10, label: 'November' },
    { value: 11, label: 'December' }
  ];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadAttendance();
    this.ensureDateRecords();
    this.calculateAllPercentages();
    this.refreshView();
  }

  ngAfterViewInit(): void {
    this.chartReady = true;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'attendancePct') {
        return item.attendancePercentage;
      }
      if (property === 'name') {
        return item.name.toLowerCase();
      }
      return (item as unknown as Record<string, string | number>)[property];
    };
    this.renderTrendChart();
  }

  ngOnDestroy(): void {
    this.trendChart?.destroy();
  }

  goBack(): void {
    this.router.navigate(['/grp-b/member3']);
  }

  getDateKey(date: Date = this.selectedDate): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  formatDisplayDate(date: Date = this.selectedDate): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  formatDateKeyDisplay(dateKey: string): string {
    if (!dateKey || dateKey === '—') {
      return dateKey;
    }
    const parts = dateKey.split('-');
    if (parts.length !== 3) {
      return dateKey;
    }
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }

  get circularDashOffset(): number {
    const circumference = 2 * Math.PI * 54;
    return circumference - (this.summary.percentage / 100) * circumference;
  }

  loadAttendance(): void {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) {
      this.students = MASTER_STUDENTS.map(s => ({ ...s }));
      this.attendanceByDate = {};
      this.lockedDates = [];
      this.memberPercentages = {};
      return;
    }

    try {
      const parsed = JSON.parse(raw) as AttendanceStorage;
      this.attendanceByDate = parsed.attendanceByDate ?? {};
      this.lockedDates = parsed.lockedDates ?? [];
      this.memberPercentages = parsed.memberPercentages ?? {};

      if (parsed.students?.length) {
        this.students = parsed.students;
      } else {
        this.students = MASTER_STUDENTS.map(s => ({ ...s }));
      }

      this.normalizeAttendanceRecords();
    } catch {
      this.students = MASTER_STUDENTS.map(s => ({ ...s }));
      this.attendanceByDate = {};
      this.lockedDates = [];
      this.memberPercentages = {};
    }
  }

  saveAttendance(): void {
    const payload: AttendanceStorage = {
      attendanceByDate: this.attendanceByDate,
      lockedDates: this.lockedDates,
      students: this.students,
      memberPercentages: this.memberPercentages
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(payload));
    this.showSnack('Attendance saved successfully!');
  }

  ensureDateRecords(): void {
    const key = this.getDateKey();
    if (!this.attendanceByDate[key]) {
      this.attendanceByDate[key] = this.students.map(student => ({
        name: student.name,
        registrationNumber: student.registrationNumber,
        status: 'Unmarked' as AttendanceStatus
      }));
      return;
    }

    this.syncDateRecordsWithStudents(key);
  }

  onDateChange(): void {
    this.ensureDateRecords();
    this.refreshView();
  }

  setStatus(record: AttendanceRecord, status: AttendanceStatus): void {
    if (this.isLocked()) {
      this.showSnack('This date is locked. Unlock to edit.');
      return;
    }
    record.status = status;
    this.calculateAllPercentages();
    this.calculateSummary();
    this.calculateMonthlyAnalytics();
    this.calculateStreak();
    this.refreshAnalyticsDisplay();
    this.updateTable();
  }

  markAllPresent(): void {
    if (this.isLocked()) {
      this.showSnack('This date is locked. Unlock to edit.');
      return;
    }
    this.getCurrentRecords().forEach(record => (record.status = 'Present'));
    this.refreshView();
    this.showSnack('All members marked present.');
  }

  resetAttendance(): void {
    if (this.isLocked()) {
      this.showSnack('This date is locked. Unlock to edit.');
      return;
    }
    const key = this.getDateKey();
    this.attendanceByDate[key] = this.students.map(student => ({
      name: student.name,
      registrationNumber: student.registrationNumber,
      status: 'Unmarked'
    }));
    this.refreshView();
    this.showSnack('Attendance reset for selected date.');
  }

  lockAttendance(): void {
    const key = this.getDateKey();
    if (!this.lockedDates.includes(key)) {
      this.lockedDates.push(key);
      this.saveAttendance();
      this.showSnack('Attendance locked for this date.');
      return;
    }
    this.lockedDates = this.lockedDates.filter(date => date !== key);
    this.saveAttendance();
    this.showSnack('Attendance unlocked for this date.');
  }

  isLocked(): boolean {
    return this.lockedDates.includes(this.getDateKey());
  }

  getCurrentRecords(): AttendanceRecord[] {
    return this.attendanceByDate[this.getDateKey()] ?? [];
  }

  applySearchFilter(): AttendanceRecord[] {
    const records = this.getCurrentRecords();
    const query = this.searchText.trim().toLowerCase();
    if (!query) {
      return records;
    }
    return records.filter(record =>
      record.name.toLowerCase().includes(query) ||
      record.registrationNumber.toLowerCase().includes(query)
    );
  }

  applyMonthFilter(): void {
    this.refreshView();
  }

  updateTable(): void {
    const rows: TableRecord[] = this.applySearchFilter().map(record =>
      Object.assign(record, {
        attendancePercentage: this.memberPercentages[record.registrationNumber] ?? 0
      })
    );

    if (this.sortByPercentage) {
      rows.sort((a, b) => b.attendancePercentage - a.attendancePercentage);
    }

    this.dataSource.data = rows;
  }

  toggleSortByPercentage(): void {
    this.sortByPercentage = !this.sortByPercentage;
    this.updateTable();
  }

  calculateSummary(): void {
    const records = this.getCurrentRecords();
    const present = records.filter(r => r.status === 'Present').length;
    const absent = records.filter(r => r.status === 'Absent').length;
    const late = records.filter(r => r.status === 'Late').length;
    const total = records.length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    this.summary = { total, present, absent, late, percentage };
  }

  calculateAllPercentages(): void {
    const percentages: MemberPercentages = {};

    this.students.forEach(student => {
      let presentCount = 0;
      let totalMarked = 0;

      Object.values(this.attendanceByDate).forEach(records => {
        const record = records.find(
          r => r.registrationNumber === student.registrationNumber
        );
        if (!record || record.status === 'Unmarked') {
          return;
        }
        totalMarked++;
        if (record.status === 'Present') {
          presentCount++;
        }
      });

      percentages[student.registrationNumber] =
        totalMarked > 0 ? Math.round((presentCount / totalMarked) * 100) : 0;
    });

    this.memberPercentages = percentages;
  }

  calculateMonthlyAnalytics(): void {
    const year = this.selectedDate.getFullYear();
    const month = this.selectedMonth;
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;

    let daysTracked = 0;
    let totalPercentage = 0;
    let bestDay = '—';
    let bestDayPercentage = 0;

    Object.keys(this.attendanceByDate).forEach(dateKey => {
      if (!dateKey.startsWith(prefix)) {
        return;
      }
      const records = this.attendanceByDate[dateKey];
      const present = records.filter(r => r.status === 'Present').length;
      const total = records.length;
      if (total === 0) {
        return;
      }
      const dayPercentage = Math.round((present / total) * 100);
      daysTracked++;
      totalPercentage += dayPercentage;
      if (dayPercentage > bestDayPercentage) {
        bestDayPercentage = dayPercentage;
        bestDay = dateKey;
      }
    });

    this.monthlyAnalytics = {
      daysTracked,
      avgPercentage: daysTracked > 0 ? Math.round(totalPercentage / daysTracked) : 0,
      bestDay,
      bestDayPercentage
    };
  }

  calculateMonthlyStats(): void {
    const year = this.selectedDate.getFullYear();
    const month = this.selectedMonth;
    let presentDays = 0;
    let absentDays = 0;
    let lateDays = 0;

    Object.keys(this.attendanceByDate).forEach(dateKey => {
      if (!this.isDateInSelectedMonth(dateKey, year, month)) {
        return;
      }
      const dayStatus = this.getDayDominantStatus(this.attendanceByDate[dateKey]);
      if (dayStatus === 'present') {
        presentDays++;
      } else if (dayStatus === 'absent') {
        absentDays++;
      } else if (dayStatus === 'late') {
        lateDays++;
      }
    });

    this.monthlyStats = {
      totalPercentage: this.monthlyAnalytics.avgPercentage,
      presentDays,
      absentDays,
      lateDays
    };
  }

  calculateTopPerformers(): void {
    const year = this.selectedDate.getFullYear();
    const month = this.selectedMonth;
    const performers: TopPerformer[] = [];

    this.students.forEach(student => {
      let presentCount = 0;
      let totalMarked = 0;

      Object.keys(this.attendanceByDate).forEach(dateKey => {
        if (!this.isDateInSelectedMonth(dateKey, year, month)) {
          return;
        }
        const record = this.attendanceByDate[dateKey].find(
          r => r.registrationNumber === student.registrationNumber
        );
        if (!record || record.status === 'Unmarked') {
          return;
        }
        totalMarked++;
        if (record.status === 'Present') {
          presentCount++;
        }
      });

      performers.push({
        name: student.name,
        registrationNumber: student.registrationNumber,
        percentage: totalMarked > 0 ? Math.round((presentCount / totalMarked) * 100) : 0,
        streak: this.getMemberStreak(student.registrationNumber)
      });
    });

    const ranked = performers.filter(p => p.percentage > 0);
    if (ranked.length === 0) {
      this.topPerformers = [];
      return;
    }

    const maxPercentage = Math.max(...ranked.map(p => p.percentage));
    const topByPercentage = ranked.filter(p => p.percentage === maxPercentage);
    const maxStreak = Math.max(...topByPercentage.map(p => p.streak));

    this.topPerformers = topByPercentage.filter(p => p.streak === maxStreak);
  }

  buildHeatmap(): void {
    const year = this.selectedDate.getFullYear();
    const month = this.selectedMonth;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: HeatmapCell[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateKey = this.getDateKey(date);
      const records = this.attendanceByDate[dateKey];

      if (!records || records.length === 0) {
        cells.push({ dateKey, day, status: 'none', label: `${dateKey}: No data` });
        continue;
      }

      const dominant = this.getDayDominantStatus(records);
      const present = records.filter(r => r.status === 'Present').length;
      const absent = records.filter(r => r.status === 'Absent').length;
      const late = records.filter(r => r.status === 'Late').length;
      cells.push({
        dateKey,
        day,
        status: dominant,
        label: `${dateKey} — P:${present} A:${absent} L:${late}`
      });
    }

    this.heatmapCells = cells;
  }

  calculateStreak(): void {
    const year = this.selectedDate.getFullYear();
    const month = this.selectedMonth;
    let streak = 0;

    for (let day = this.selectedDate.getDate(); day >= 1; day--) {
      const date = new Date(year, month, day);
      const key = this.getDateKey(date);
      const records = this.attendanceByDate[key];
      if (!records || records.length === 0) {
        break;
      }
      const present = records.filter(r => r.status === 'Present').length;
      const percentage = Math.round((present / records.length) * 100);
      if (percentage >= 80) {
        streak++;
      } else {
        break;
      }
    }

    this.streakDays = streak;
  }

  addStudent(): void {
    const name = this.newStudentName.trim();
    const reg = this.newStudentReg.trim().toUpperCase();

    if (!name || !reg) {
      this.showSnack('Name and registration number are required.');
      return;
    }
    if (this.students.some(s => s.registrationNumber === reg)) {
      this.showSnack('Registration number already exists.');
      return;
    }

    this.students.push({ name, registrationNumber: reg });
    this.newStudentName = '';
    this.newStudentReg = '';
    this.ensureDateRecords();
    this.calculateAllPercentages();
    this.refreshView();
    this.saveAttendance();
    this.showSnack(`${name} added successfully.`);
  }

  startEditStudent(student: Student): void {
    this.editingReg = student.registrationNumber;
    this.editStudentName = student.name;
    this.editStudentReg = student.registrationNumber;
  }

  cancelEditStudent(): void {
    this.editingReg = null;
    this.editStudentName = '';
    this.editStudentReg = '';
  }

  saveEditStudent(): void {
    if (!this.editingReg) {
      return;
    }

    const name = this.editStudentName.trim();
    const reg = this.editStudentReg.trim().toUpperCase();

    if (!name || !reg) {
      this.showSnack('Name and registration number are required.');
      return;
    }
    if (
      this.students.some(
        s => s.registrationNumber === reg && s.registrationNumber !== this.editingReg
      )
    ) {
      this.showSnack('Registration number already exists.');
      return;
    }

    const oldReg = this.editingReg;
    const student = this.students.find(s => s.registrationNumber === oldReg);
    if (!student) {
      return;
    }

    student.name = name;
    student.registrationNumber = reg;

    Object.values(this.attendanceByDate).forEach(records => {
      records.forEach(record => {
        if (record.registrationNumber === oldReg) {
          record.name = name;
          record.registrationNumber = reg;
        }
      });
    });

    if (this.memberPercentages[oldReg] !== undefined) {
      this.memberPercentages[reg] = this.memberPercentages[oldReg];
      if (oldReg !== reg) {
        delete this.memberPercentages[oldReg];
      }
    }

    this.cancelEditStudent();
    this.calculateAllPercentages();
    this.refreshView();
    this.saveAttendance();
    this.showSnack('Student updated successfully.');
  }

  deleteStudent(registrationNumber: string): void {
    if (this.isLocked()) {
      this.showSnack('Unlock attendance before deleting students.');
      return;
    }

    this.students = this.students.filter(s => s.registrationNumber !== registrationNumber);

    Object.keys(this.attendanceByDate).forEach(dateKey => {
      this.attendanceByDate[dateKey] = this.attendanceByDate[dateKey].filter(
        r => r.registrationNumber !== registrationNumber
      );
    });

    delete this.memberPercentages[registrationNumber];
    this.ensureDateRecords();
    this.calculateAllPercentages();
    this.refreshView();
    this.saveAttendance();
    this.showSnack('Student removed successfully.');
  }

  onExcelSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet);

        let imported = 0;
        let skipped = 0;

        rows.forEach(row => {
          const name = this.extractField(row, ['name', 'student name', 'studentname', 'full name']);
          const reg = this.extractField(row, [
            'registration number',
            'registrationnumber',
            'reg no',
            'regno',
            'registration',
            'reg number'
          ]);

          if (!name || !reg) {
            skipped++;
            return;
          }

          const registrationNumber = reg.toUpperCase();
          if (this.students.some(s => s.registrationNumber === registrationNumber)) {
            skipped++;
            return;
          }

          this.students.push({ name: name.trim(), registrationNumber });
          imported++;
        });

        this.ensureDateRecords();
        this.calculateAllPercentages();
        this.refreshView();
        this.saveAttendance();

        if (imported > 0) {
          this.showSnack(`Imported ${imported} student(s). Skipped ${skipped}.`);
        } else {
          this.showSnack('No new students imported. Check columns: Name, Registration Number.');
        }
      } catch {
        this.showSnack('Failed to read Excel file. Please upload a valid .xlsx file.');
      } finally {
        input.value = '';
      }
    };

    reader.readAsArrayBuffer(file);
  }

  exportCsv(): void {
    const records = this.getCurrentRecords();
    const dateKey = this.getDateKey();
    const header = 'Date,Registration Number,Name,Status,Attendance %\n';
    const rows = records
      .map(r => {
        const pct = this.memberPercentages[r.registrationNumber] ?? 0;
        return `${dateKey},"${r.registrationNumber}","${r.name}",${r.status},${pct}%`;
      })
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance-${dateKey}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    this.showSnack('CSV exported successfully!');
  }

  getPercentageBadgeClass(percentage: number): string {
    if (percentage >= 90) {
      return 'pct-green';
    }
    if (percentage >= 75) {
      return 'pct-blue';
    }
    if (percentage >= 50) {
      return 'pct-orange';
    }
    return 'pct-red';
  }

  getStatusColor(status: AttendanceStatus): string {
    switch (status) {
      case 'Present':
        return 'status-present';
      case 'Absent':
        return 'status-absent';
      case 'Late':
        return 'status-late';
      default:
        return 'status-unmarked';
    }
  }

  getStatusIcon(status: AttendanceStatus): string {
    switch (status) {
      case 'Present':
        return 'check_circle';
      case 'Absent':
        return 'cancel';
      case 'Late':
        return 'schedule';
      default:
        return 'help_outline';
    }
  }

  getRowClass(status: AttendanceStatus): string {
    switch (status) {
      case 'Late':
        return 'row-late';
      case 'Absent':
        return 'row-absent';
      default:
        return '';
    }
  }

  getHeatmapClass(status: HeatmapCell['status']): string {
    return `heatmap-${status}`;
  }

  onSearchChange(): void {
    this.updateTable();
  }

  refreshView(): void {
    this.calculateAllPercentages();
    this.calculateSummary();
    this.calculateMonthlyAnalytics();
    this.calculateStreak();
    this.refreshAnalyticsDisplay();
    this.updateTable();
  }

  private refreshAnalyticsDisplay(): void {
    this.calculateMonthlyStats();
    this.calculateTopPerformers();
    this.buildHeatmap();
    this.renderTrendChart();
  }

  private normalizeAttendanceRecords(): void {
    Object.keys(this.attendanceByDate).forEach(dateKey => {
      this.attendanceByDate[dateKey] = this.attendanceByDate[dateKey].map(record => {
        const student = this.students.find(
          s => s.name === record.name || s.registrationNumber === record.registrationNumber
        );
        return {
          name: student?.name ?? record.name,
          registrationNumber: student?.registrationNumber ?? record.registrationNumber ?? 'UNKNOWN',
          status: record.status ?? 'Unmarked'
        };
      });
    });
  }

  private syncDateRecordsWithStudents(dateKey: string): void {
    const existing = this.attendanceByDate[dateKey];
    const synced: AttendanceRecord[] = this.students.map(student => {
      const found = existing.find(r => r.registrationNumber === student.registrationNumber);
      return {
        name: student.name,
        registrationNumber: student.registrationNumber,
        status: found?.status ?? 'Unmarked'
      };
    });
    this.attendanceByDate[dateKey] = synced;
  }

  private extractField(row: Record<string, string>, keys: string[]): string {
    const normalized = Object.keys(row).find(key =>
      keys.includes(key.trim().toLowerCase())
    );
    return normalized ? String(row[normalized]).trim() : '';
  }

  private renderTrendChart(): void {
    if (!this.chartReady || !this.trendChartRef) {
      return;
    }

    const year = this.selectedDate.getFullYear();
    const month = this.selectedMonth;
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;

    const labels: string[] = [];
    const data: number[] = [];

    Object.keys(this.attendanceByDate)
      .filter(key => key.startsWith(prefix))
      .sort()
      .forEach(dateKey => {
        const records = this.attendanceByDate[dateKey];
        const present = records.filter(r => r.status === 'Present').length;
        const total = records.length;
        if (total === 0) {
          return;
        }
        labels.push(dateKey.slice(8));
        data.push(Math.round((present / total) * 100));
      });

    const config: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: labels.length ? labels : ['—'],
        datasets: [{
          label: 'Attendance %',
          data: data.length ? data : [0],
          borderColor: '#7c4dff',
          backgroundColor: 'rgba(124, 77, 255, 0.15)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#7c4dff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: this.chartAnimated ? 600 : 1200,
          easing: 'easeOutQuart'
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(26, 35, 126, 0.9)',
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: ctx => ` ${ctx.parsed.y}% attendance`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.08)' },
            ticks: { color: '#b0bec5', font: { size: 11 } }
          },
          y: {
            min: 0,
            max: 100,
            grid: { color: 'rgba(255,255,255,0.08)' },
            ticks: {
              color: '#b0bec5',
              callback: value => `${value}%`
            }
          }
        }
      }
    };

    if (this.trendChart) {
      this.trendChart.data.labels = config.data.labels;
      this.trendChart.data.datasets = config.data.datasets;
      this.trendChart.update();
    } else {
      this.trendChart = new Chart(this.trendChartRef.nativeElement, config);
    }

    this.chartAnimated = true;
  }

  private getDayDominantStatus(
    records: AttendanceRecord[]
  ): 'present' | 'late' | 'absent' | 'none' {
    const present = records.filter(r => r.status === 'Present').length;
    const absent = records.filter(r => r.status === 'Absent').length;
    const late = records.filter(r => r.status === 'Late').length;
    const marked = present + absent + late;

    if (marked === 0) {
      return 'none';
    }
    if (present >= absent && present >= late) {
      return 'present';
    }
    if (late > absent) {
      return 'late';
    }
    return 'absent';
  }

  private getMemberStreak(registrationNumber: string): number {
    const year = this.selectedDate.getFullYear();
    const month = this.selectedMonth;
    let streak = 0;

    for (let day = this.selectedDate.getDate(); day >= 1; day--) {
      const date = new Date(year, month, day);
      const key = this.getDateKey(date);
      const records = this.attendanceByDate[key];
      if (!records) {
        break;
      }
      const record = records.find(r => r.registrationNumber === registrationNumber);
      if (!record || record.status !== 'Present') {
        break;
      }
      streak++;
    }

    return streak;
  }

  private isDateInSelectedMonth(dateKey: string, year: number, month: number): boolean {
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
    return dateKey.startsWith(prefix);
  }

  private showSnack(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3500,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'attendance-snackbar'
    });
  }
}

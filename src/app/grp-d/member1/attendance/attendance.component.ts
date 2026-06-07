import { Component, OnInit } from '@angular/core';
import { Student, STUDENTS } from './students';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  displayedColumns: string[] = ['purge', 'identity'];
  dateColumns: string[] = [];

  students: any[] = [];
  filteredStudents: any[] = [];

  searchText = '';
  selectedTeam = 'D'; 

  today = new Date().toISOString().split('T')[0];
  selectedDate = this.today;

  showMonthlyReport = false;
  selectedStudentForReport: any = null;
  selectedMonth: string = '';
  monthlyData: any[] = [];
  totalPresentReport = 0;
  totalAbsentReport = 0;
  attendancePercentage = 0;

  private _transformer = (node: any, level: number) => {
    return { expandable: !!node.children && node.children.length > 0, name: node.name, level: level, id: node.id };
  };
  treeControl = new FlatTreeControl<any>(node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);
  treeDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: any) => node.expandable;

  ngOnInit() {
    this.calculateMatrixDateColumns();
    this.initializeMatrixDataset();
    
    const instance = new Date();
    this.selectedMonth = `${instance.getFullYear()}-${String(instance.getMonth() + 1).padStart(2, '0')}`;
  }

  calculateMatrixDateColumns() {
    this.dateColumns = [];
    const baseDate = new Date(this.selectedDate);

    for (let offset = -2; offset <= 2; offset++) {
      const targetDate = new Date(baseDate);
      targetDate.setDate(baseDate.getDate() + offset);
      const dateString = targetDate.toISOString().split('T')[0];
      this.dateColumns.push(dateString);
    }

    this.displayedColumns = ['purge', 'identity', ...this.dateColumns];
  }

  formatDateLabel(dateStr: string): string {
    const d = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return `${months[d.getMonth()]} ${d.getDate()}, ${days[d.getDay()]}`;
  }

  initializeMatrixDataset() {
    const rawCache = localStorage.getItem('matrixAttendanceSystem');
    if (rawCache) {
      this.students = JSON.parse(rawCache);
    } else {
      this.students = STUDENTS.map((s: any) => ({
        id: s.id,
        name: s.name,
        team: s.team,
        attendanceMatrix: s.attendanceMatrix || {}
      }));
      this.syncStorage();
    }
    
    this.students.forEach(s => {
      if (!s.attendanceMatrix) s.attendanceMatrix = {};
      this.dateColumns.forEach(col => {
        if (s.attendanceMatrix[col] === undefined) {
          s.attendanceMatrix[col] = false;
        }
      });
    });

    this.applyFilters();
  }

  applyFilters() {
    let processQueue = [...this.students];

    if (this.selectedTeam !== 'ALL') {
      processQueue = processQueue.filter(s => s.team === this.selectedTeam);
    }

    const term = this.searchText.toLowerCase().trim();
    if (term) {
      processQueue = processQueue.filter(s => s.name.toLowerCase().includes(term));
    }

    this.filteredStudents = processQueue;
  }

  onTeamSelectionChange() {
    this.applyFilters();
  }

  onDateChange() {
    this.calculateMatrixDateColumns();
    this.initializeMatrixDataset();
    if (this.showMonthlyReport) {
      this.generateMonthlyReport();
    }
  }

  onCheckboxMatrixChange(student: any, dateKey: string) {
    this.syncStorage();
  }

  saveAttendance() {
    this.syncStorage();
    alert('Advanced Attendance Grid logs saved successfully!');
  }

  syncStorage() {
    localStorage.setItem('matrixAttendanceSystem', JSON.stringify(this.students));
  }

  deleteStudent(student: any) {
    if (confirm(`Remove ${student.name} from operational records?`)) {
      this.students = this.students.filter(s => s.id !== student.id);
      this.syncStorage();
      this.applyFilters();
    }
  }

  getLiveAttendancePercentage(student: any): number {
    if (!student.attendanceMatrix) return 0;
    const keys = Object.keys(student.attendanceMatrix);
    if (keys.length === 0) return 0;
    const presents = keys.filter(k => student.attendanceMatrix[k] === true).length;
    return Math.round((presents / keys.length) * 100);
  }

  isColumnFullyChecked(dateKey: string): boolean {
    if (!this.filteredStudents || this.filteredStudents.length === 0) return false;
    return this.filteredStudents.every(student => student.attendanceMatrix[dateKey] === true);
  }

  toggleColumnBulk(dateKey: string) {
    if (!this.filteredStudents || this.filteredStudents.length === 0) return;
    const fullyChecked = this.isColumnFullyChecked(dateKey);
    this.filteredStudents.forEach(student => {
      student.attendanceMatrix[dateKey] = !fullyChecked;
    });
    this.syncStorage();
    if (this.showMonthlyReport) {
      this.generateMonthlyReport();
    }
  }

  isAbsenceRisk(student: any): boolean {
    let absenceCounter = 0;
    this.dateColumns.forEach(col => {
      if (student.attendanceMatrix[col] === false) absenceCounter++;
    });
    return absenceCounter >= 3;
  }

 exportActiveMatrixToCSV() {
  if (this.filteredStudents.length === 0) {
    alert('No records found matching current views to export.');
    return;
  }

  // HELPER function to make dates Excel-safe by converting to a readable text format
  const formatHeaderForExcel = (dateStr: string): string => {
    const d = new Date(dateStr);
    const months = ['Jun', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // Appending a space forces Excel to treat it cleanly as a text label string
    return `"${d.getDate()}-${months[d.getMonth()]}-${d.getFullYear()}"`;
  };

  // 1. Format headers using our Excel-safe helper instead of raw ISO keys
  const safeHeaders = ['Employee Name', 'Assigned Team', ...this.dateColumns.map(col => formatHeaderForExcel(col))];
  const csvBuffer = [safeHeaders.join(',')];

  // 2. Parse the body rows
  for (const student of this.filteredStudents) {
    const cells = [
      `"${student.name}"`,
      `"${student.team}"`,
      ...this.dateColumns.map(col => student.attendanceMatrix[col] ? 'Present' : 'Absent')
    ];
    csvBuffer.push(cells.join(','));
  }

  // 3. Generate down-stream file extraction package
  const blob = new Blob([csvBuffer.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const extractionAnchor = document.createElement('a');
  extractionAnchor.href = URL.createObjectURL(blob);
  extractionAnchor.setAttribute('download', `Corporate_Matrix_Export_${this.selectedDate}.csv`);
  document.body.appendChild(extractionAnchor);
  extractionAnchor.click();
  document.body.removeChild(extractionAnchor);
}

  toggleMonthlyReport() {
    this.showMonthlyReport = !this.showMonthlyReport;
    if (this.showMonthlyReport) {
      if (!this.selectedStudentForReport && this.students.length > 0) {
        this.selectedStudentForReport = this.students[0];
      }
      this.generateMonthlyReport();
    }
  }

  generateMonthlyReport() {
    if (!this.selectedStudentForReport || !this.selectedMonth) {
      this.monthlyData = [];
      return;
    }

    const [year, month] = this.selectedMonth.split('-').map(Number);
    const limitDays = new Date(year, month, 0).getDate();

    this.monthlyData = [];
    this.totalPresentReport = 0;
    this.totalAbsentReport = 0;

    for (let dayNum = 1; dayNum <= limitDays; dayNum++) {
      const paddedDay = dayNum.toString().padStart(2, '0');
      const paddedMonth = month.toString().padStart(2, '0');
      const dateStrKey = `${year}-${paddedMonth}-${paddedDay}`;

      const checkedStateValue = this.selectedStudentForReport.attendanceMatrix?.[dateStrKey] || false;
      const statusText = checkedStateValue ? 'Present' : 'Absent';

      if (checkedStateValue) this.totalPresentReport++;
      else this.totalAbsentReport++;

      const calendarDayInstance = new Date(dateStrKey);
      this.monthlyData.push({
        date: dateStrKey,
        day: calendarDayInstance.toLocaleString('default', { weekday: 'short' }),
        status: statusText
      });
    }

    this.attendancePercentage = this.monthlyData.length > 0 ?
      Math.round((this.totalPresentReport / this.monthlyData.length) * 100) : 0;
  }
}
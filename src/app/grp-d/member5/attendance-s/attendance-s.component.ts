import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-s',
  templateUrl: './attendance-s.component.html',
  styleUrls: ['./attendance-s.component.css']
})
export class AttendanceSComponent implements OnInit {

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  years: number[] = [];

  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();

  dates: string[] = [];

  saveMessage: string = '';

  employees = [
    { name: 'Chandan Kumar Sahu', attendance: [] as boolean[] },
    { name: 'Sitikantha Dalal', attendance: [] as boolean[] },
    { name: 'Titiksha Sahu', attendance: [] as boolean[] },
    { name: 'Anjali Sahoo', attendance: [] as boolean[] },
    { name: 'Sushree Sangita Sethi', attendance: [] as boolean[] },
    { name: 'Mama Bisoi', attendance: [] as boolean[] },
    { name: 'Tanmay Sahu', attendance: [] as boolean[] },
    { name: 'Pratik Parag Pani', attendance: [] as boolean[] },
    { name: 'Ranit Kumar Das', attendance: [] as boolean[] },
    { name: 'Shobha Kumari', attendance: [] as boolean[] },
    { name: 'CS Vishal Rout', attendance: [] as boolean[] }
  ];

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear - 2; y <= currentYear + 1; y++) {
      this.years.push(y);
    }
    this.generateCalendar();
  }

  generateCalendar(): void {
    const daysInMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();

    this.dates = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(this.selectedYear, this.selectedMonth, d);
      const day = d.toString().padStart(2, '0');
      const monthShort = this.months[this.selectedMonth].substring(0, 3);
      this.dates.push(`${day} ${monthShort}`);
    }

    const key = this.getStorageKey();
    const saved = localStorage.getItem(key);

    if (saved) {
      const savedData = JSON.parse(saved);
      this.employees = savedData;
    } else {
      this.employees.forEach(emp => {
        emp.attendance = new Array(daysInMonth).fill(false);
      });
    }

    this.saveMessage = '';
  }

  onMonthYearChange(): void {
    this.generateCalendar();
  }

  getStorageKey(): string {
    return `attendance_s_${this.selectedYear}_${this.selectedMonth}`;
  }

  saveAttendance(): void {
    const key = this.getStorageKey();
    localStorage.setItem(key, JSON.stringify(this.employees));
    this.saveMessage = 'Attendance saved successfully!';

    setTimeout(() => {
      this.saveMessage = '';
    }, 3000);
  }

  exportReport(): void {
    let csv = 'Student Name,' + this.dates.join(',') + ',Total Present\n';

    this.employees.forEach(emp => {
      const present = emp.attendance.filter(a => a).length;
      const row = [emp.name, ...emp.attendance.map(a => a ? 'P' : 'A'), present];
      csv += row.join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Attendance_${this.months[this.selectedMonth]}_${this.selectedYear}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  getTotalPresent(): number {
    let count = 0;

    this.employees.forEach(emp => {
      emp.attendance.forEach(status => {
        if (status) {
          count++;
        }
      });
    });

    return count;
  }

  getTotalRecords(): number {
    return this.employees.length * this.dates.length;
  }

  getAttendancePercentage(): number {
    if (this.getTotalRecords() === 0) return 0;

    return Math.round(
      (this.getTotalPresent() / this.getTotalRecords()) * 100
    );
  }

}
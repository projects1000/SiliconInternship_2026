import { Component } from '@angular/core';

@Component({
  selector: 'app-member8-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {

  attendanceDate = '';

  attendanceStatus = 'Present';

  attendanceData: any[] = [];

  markAttendance(): void {

    if (!this.attendanceDate) {

      alert('Please select a date');

      return;

    }

    this.attendanceData.push({
      date: this.attendanceDate,
      status: this.attendanceStatus
    });

    localStorage.setItem(
      'attendanceData',
      JSON.stringify(this.attendanceData)
    );

    this.attendanceDate = '';
    this.attendanceStatus = 'Present';
  }

  constructor() {

    const savedData =
      localStorage.getItem('attendanceData');

    if (savedData) {

      this.attendanceData =
        JSON.parse(savedData);

    }

  }

  get presentCount(): number {

    return this.attendanceData.filter(
      item => item.status === 'Present'
    ).length;

  }

  get absentCount(): number {

    return this.attendanceData.filter(
      item => item.status === 'Absent'
    ).length;

  }

  get attendancePercentage(): number {

    if (this.attendanceData.length === 0) {

      return 0;

    }

    return Math.round(
      (this.presentCount /
        this.attendanceData.length) * 100
    );

  }

  goHome(): void {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }

}
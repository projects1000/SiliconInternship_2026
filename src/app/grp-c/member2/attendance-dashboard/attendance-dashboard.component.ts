import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Member {
  id: number;
  name: string;
  present: boolean;
}

@Component({
  selector: 'app-attendance-dashboard',
  templateUrl: './attendance-dashboard.component.html',
  styleUrls: ['./attendance-dashboard.component.css']
})
export class AttendanceDashboardComponent implements OnInit {
  currentDate = new Date().toLocaleDateString();

  selectedDate = new Date();

  treeMembers = [
    'Member 1',
    'Member 2',
    'Member 3',
    'Member 4',
    'Member 5',
    'Member 6',
    'Member 7',
    'Member 8',
    'Member 9',
    'Member 10'
  ];

  isFutureDate(): boolean {
    const today = new Date();

    const selected = new Date(this.selectedDate);

    selected.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return selected > today;
  }

  displayedColumns: string[] = ['id', 'name', 'attendance', 'status'];

  isLocked = false;

  today = new Date().toISOString().split('T')[0];

  members: Member[] = [
    { id: 1, name: 'Member 1', present: false },
    { id: 2, name: 'Member 2', present: false },
    { id: 3, name: 'Member 3', present: false },
    { id: 4, name: 'Member 4', present: false },
    { id: 5, name: 'Member 5', present: false },
    { id: 6, name: 'Member 6', present: false },
    { id: 7, name: 'Member 7', present: false },
    { id: 8, name: 'Member 8', present: false },
    { id: 9, name: 'Member 9', present: false },
    { id: 10, name: 'Member 10', present: false }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    const savedData = localStorage.getItem('attendanceData');
    const lockState = localStorage.getItem('attendanceLocked');

    if (savedData) {
      this.members = JSON.parse(savedData);
    }

    if (lockState === 'true') {
      this.isLocked = true;
    }
  }

  saveAttendance() {
    localStorage.setItem(
      'attendanceData',
      JSON.stringify(this.members)
    );
  }

  lockAttendance() {
    this.isLocked = true;

    localStorage.setItem(
      'attendanceLocked',
      'true'
    );
  }

  backToProfile() {
    this.router.navigate(['grp-c/member2']);
  }

  get presentCount() {
    return this.members.filter(m => m.present).length;
  }

  get absentCount() {
    return this.members.length - this.presentCount;
  }

  get attendancePercentage() {
    return Math.round(
      (this.presentCount / this.members.length) * 100
    );
  }
}
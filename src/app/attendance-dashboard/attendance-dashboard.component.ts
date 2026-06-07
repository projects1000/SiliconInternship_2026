import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance-dashboard',
  templateUrl: './attendance-dashboard.component.html',
  styleUrls: ['./attendance-dashboard.component.css']
})
export class AttendanceDashboardComponent {



  selectedDate: Date = new Date();

  searchText: string = '';

  students = [
    { name: 'Rahul', status: 'Present' },
    { name: 'Priya', status: 'Absent' },
    { name: 'Aman', status: 'Present' },
    { name: 'Sneha', status: 'Present' },
    { name: 'Ritika', status: 'Absent' }
  ];

  displayedColumns: string[] = ['name', 'status', 'action'];

  toggleAttendance(student: any) {

    student.status =
      student.status === 'Present'
      ? 'Absent'
      : 'Present';
  }

  get filteredStudents() {

    return this.students.filter(student =>
      student.name
      .toLowerCase()
      .includes(this.searchText.toLowerCase())
    );
  }

  get totalPresent() {

    return this.students.filter(
      s => s.status === 'Present'
    ).length;
  }

  get totalAbsent() {

    return this.students.filter(
      s => s.status === 'Absent'
    ).length;
  }

}
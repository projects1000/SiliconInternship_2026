import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {

  constructor(private router: Router) {}

  today = new Date().toISOString().split('T')[0];

  selectedDate = this.today;

  searchText = '';

  isLocked = false;

  students = [
    { name: 'Rahul Sharma', present: false },
    { name: 'Priya Das', present: false },
    { name: 'Rohan Mohanty', present: false },
    { name: 'Anjali Patel', present: false },
    { name: 'Amit Kumar', present: false },
    { name: 'Sneha Sahu', present: false },
    { name: 'Karan Singh', present: false },
    { name: 'Neha Gupta', present: false },
    { name: 'Arjun Roy', present: false },
    { name: 'Suman Das', present: false }
  ];

  onDateChange(event: any) {
    this.selectedDate = event.target.value;
  }

  toggleAttendance(student: any) {
    student.present = !student.present;
  }

  lockAttendance() {
    this.isLocked = true;
  }

  goBack() {
    this.router.navigate(['/grp-c/member9']);
  }

  get filteredStudents() {
    return this.students.filter(student =>
      student.name.toLowerCase().includes(
        this.searchText.toLowerCase()
      )
    );
  }

  get presentCount() {
    return this.students.filter(s => s.present).length;
  }

  get absentCount() {
    return this.students.length - this.presentCount;
  }
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-subhalaxmi-attendance',
  templateUrl: './subhalaxmi-attendance.component.html',
  styleUrls: ['./subhalaxmi-attendance.component.css']
})
export class SubhalaxmiAttendanceComponent {
  searchText: string = '';
  newStudent: string = '';
  selectedDate: string = '2026-06-08';

  students = [
    { name: 'Subhalaxmi Sahoo', present: true },
    { name: 'Subhashree Mohapatra', present: true },
    { name: 'Swayam sahu', present: true },
    { name: 'Rajesh Behera', present: true },
    { name: 'Maniket Padhan', present: true },
    { name: 'Jeevan Jyoti Panigrahi', present: true },
    { name: 'Ayush Mishra', present: true },
    { name: 'Mohit Singal', present: true },
    { name: 'Dhiraj Mahapatra', present: true }
  ];

  get filteredStudents() {
    return this.students.filter(student =>
      student.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  addStudent() {
    if (this.newStudent.trim() !== '') {
      this.students.push({
        name: this.newStudent,
        present: true
      });

      this.newStudent = '';
    }
  }

  deleteStudent(index: number) {
    this.students.splice(index, 1);
  }
}
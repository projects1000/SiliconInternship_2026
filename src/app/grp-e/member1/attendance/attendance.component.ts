import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Student {
  id: number;
  regNo: string;
  name: string;
  present: boolean;
}

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  searchText = '';

  attendanceLocked = false;

  today = new Date();

  currentDate =
    new Date().toISOString().split('T')[0];

  lastUpdated = '';

  selectedMonth =
    new Date().toLocaleString('default', {
      month: 'long'
    });

  studentName = '';

  studentRegNo = '';

  editMode = false;

  editStudentId = 0;

  students: Student[] = [

    {
      id: 1,
      regNo: 'MCA001',
      name: 'Rajesh',
      present: false
    },

    {
      id: 2,
      regNo: 'MCA002',
      name: 'Ayush',
      present: false
    },

    {
      id: 3,
      regNo: 'MCA003',
      name: 'Mohit',
      present: false
    },

    {
      id: 4,
      regNo: 'MCA004',
      name: 'Dhiraj',
      present: false
    }

  ];

  ngOnInit(): void {

    const savedStudents =
      localStorage.getItem('students');

    const savedLock =
      localStorage.getItem('attendanceLocked');

    if (savedStudents) {

      this.students =
        JSON.parse(savedStudents);

    }

    if (savedLock === 'true') {

      this.attendanceLocked = true;

    }

    this.updateLastUpdated();

  }

  updateLastUpdated(): void {

    this.lastUpdated =
      new Date().toLocaleString();

  }

  saveAttendance(): void {

    localStorage.setItem(
      'students',
      JSON.stringify(this.students)
    );

    this.updateLastUpdated();

  }

  addStudent(): void {

    if (
      !this.studentName.trim() ||
      !this.studentRegNo.trim()
    ) {

      alert(
        'Please enter Registration Number and Student Name'
      );

      return;

    }

    this.students.push({

      id: this.students.length + 1,

      regNo: this.studentRegNo,

      name: this.studentName,

      present: false

    });

    this.studentName = '';

    this.studentRegNo = '';

    this.saveAttendance();

  }

  editStudent(student: Student): void {

    this.editMode = true;

    this.editStudentId =
      student.id;

    this.studentName =
      student.name;

    this.studentRegNo =
      student.regNo;

  }

  updateStudent(): void {

    const student =
      this.students.find(
        s => s.id === this.editStudentId
      );

    if (student) {

      student.name =
        this.studentName;

      student.regNo =
        this.studentRegNo;

      this.saveAttendance();

      this.editMode = false;

      this.editStudentId = 0;

      this.studentName = '';

      this.studentRegNo = '';

      alert(
        'Student Updated Successfully'
      );

    }

  }

  deleteStudent(id: number): void {

    const confirmDelete =
      confirm(
        'Are you sure you want to delete this student?'
      );

    if (confirmDelete) {

      this.students =
        this.students.filter(
          student => student.id !== id
        );

      this.saveAttendance();

    }

  }

  resetAttendance(): void {

    const confirmReset =
      confirm(
        'Reset Attendance?'
      );

    if (confirmReset) {

      this.students.forEach(
        student => {

          student.present = false;

        }
      );

      this.attendanceLocked = false;

      localStorage.removeItem(
        'attendanceLocked'
      );

      this.saveAttendance();

    }

  }

  lockAttendance(): void {

    this.attendanceLocked = true;

    localStorage.setItem(
      'attendanceLocked',
      'true'
    );

    this.saveAttendance();

    alert(
      'Attendance Locked Successfully'
    );

  }

  exportCSV(): void {

    let csv =
      'ID,REG NO,NAME,STATUS\n';

    this.students.forEach(
      student => {

        csv +=
          `${student.id},${student.regNo},${student.name},${student.present ? 'Present' : 'Absent'}\n`;

      }
    );

    const blob =
      new Blob(
        [csv],
        {
          type: 'text/csv'
        }
      );

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement('a');

    a.href = url;

    a.download =
      'attendance-report.csv';

    a.click();

  }

  get filteredStudents(): Student[] {

    return this.students.filter(
      student =>

        student.name
          .toLowerCase()
          .includes(
            this.searchText.toLowerCase()
          )

        ||

        student.regNo
          .toLowerCase()
          .includes(
            this.searchText.toLowerCase()
          )

    );

  }

  get presentCount(): number {

    return this.students
      .filter(
        student => student.present
      )
      .length;

  }

  get absentCount(): number {

    return this.students.length -
      this.presentCount;

  }

  get attendancePercentage(): number {

    if (
      this.students.length === 0
    ) {

      return 0;

    }

    return Math.round(

      (
        this.presentCount /
        this.students.length
      ) * 100

    );

  }

}
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
interface Student {
  id: number;
  name: string;
  present: boolean;
}

@Component({
  selector: 'app-member6-attendance',
  templateUrl: './member6-attendance.component.html',
  styleUrls: ['./member6-attendance.component.css']
})
export class Member6AttendanceComponent implements OnInit {

  selectedDate: Date = new Date();

  newStudentName = '';

  searchText = '';

  attendanceLocked = false;

  students: Student[] = [];

  ngOnInit(): void {

    const savedStudents =
      localStorage.getItem('students');

    if (savedStudents) {
      this.students =
        JSON.parse(savedStudents);
    }

    const savedLock =
      localStorage.getItem(
        'attendanceLocked'
      );

    if (savedLock) {

      this.attendanceLocked =
        JSON.parse(savedLock);
    }
  }

  addStudent() {

    if (
      !this.newStudentName.trim()
    ) {
      return;
    }

    this.students.push({

      id: Date.now(),

      name: this.newStudentName,

      present: false

    });

    this.newStudentName = '';

    this.saveData();
  }

  deleteStudent(id: number) {

    this.students =
      this.students.filter(
        student => student.id !== id
      );

    this.saveData();
  }

  saveData() {

    localStorage.setItem(
      'students',
      JSON.stringify(this.students)
    );
  }

  lockAttendance() {

    const lock =
      confirm(
        'Are you sure? Once locked, attendance cannot be edited.'
      );

    if (lock) {

      this.attendanceLocked = true;

      localStorage.setItem(
        'attendanceLocked',
        JSON.stringify(true)
      );
    }
  }
  unlockAttendance() {

  const unlock = confirm(
    'Do you want to unlock attendance?'
  );

  if (unlock) {

    this.attendanceLocked = false;

    localStorage.setItem(
      'attendanceLocked',
      JSON.stringify(false)
    );
  }
}

  get totalStudents(): number {

    return this.students.length;
  }

  get presentStudents(): number {

    return this.students.filter(
      student => student.present
    ).length;
  }

  get absentStudents(): number {

    return this.students.filter(
      student => !student.present
    ).length;
  }

  get attendancePercentage(): number {

    if (
      this.totalStudents === 0
    ) {
      return 0;
    }

    return Math.round(
      (
        this.presentStudents /
        this.totalStudents
      ) * 100
    );
  }

  get filteredStudents(): Student[] {

    return this.students.filter(
      student =>
        student.name
          .toLowerCase()
          .includes(
            this.searchText
              .toLowerCase()
          )
    );
  }

  clearAllStudents() {

    const remove =
      confirm(
        'Delete all students?'
      );

    if (remove) {

      this.students = [];

      localStorage.removeItem(
        'students'
      );
    }
  }

  resetAttendance() {

    const reset =
      confirm(
        'Reset all attendance?'
      );

    if (reset) {

      this.students.forEach(
        student => {
          student.present = false;
        }
      );

      this.saveData();
    }
  }
  isTodaySelected(): boolean {

  const today = new Date();

  return (
    this.selectedDate.getDate() === today.getDate() &&
    this.selectedDate.getMonth() === today.getMonth() &&
    this.selectedDate.getFullYear() === today.getFullYear()
  );
}
downloadExcel() {

  const excelData = this.students.map(student => ({
    Name: student.name,
    Status: student.present ? 'Present' : 'Absent',
    Date: this.selectedDate.toDateString()
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  const workbook = {
    Sheets: { Attendance: worksheet },
    SheetNames: ['Attendance']
  };

  const excelBuffer = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array'
  });

  const data = new Blob(
    [excelBuffer],
    {
      type:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
  );

  FileSaver.saveAs(
    data,
    'GroupF_Member6_Attendance.xlsx'
  );
}

downloadPDF() {

  const doc = new jsPDF();

  doc.text(
    'Group F Member 6 Attendance Report',
    10,
    10
  );

  const rows = this.students.map(student => [
    student.name,
    student.present ? 'Present' : 'Absent',
    this.selectedDate.toDateString()
  ]);

  autoTable(doc, {
    head: [['Name', 'Status', 'Date']],
    body: rows
  });

  doc.save(
    'GroupF_Member6_Attendance.pdf'
  );
}
}
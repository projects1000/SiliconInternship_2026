import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memb6-attendance',

  templateUrl:
  './memb6-attendance.component.html',

  styleUrls: [
    './memb6-attendance.component.css'
  ]
})

export class Memb6AttendanceComponent
implements OnInit {

  internshipStartDate =
  new Date(2026, 4, 25);

  selectedDate: Date =
  new Date();

  isLocked = false;

  searchText = '';

  newStudentName = '';

  displayedColumns: string[] = [
    'name',
    'attendance',
    'status',
    'percentage',
    'actions'
  ];

  students: any[] = [];

  ngOnInit(): void {

    this.students = [

      {
        id: 1,
        name: 'Motilal',
        attendance: {}
      },

      {
        id: 2,
        name: 'Rahul',
        attendance: {}
      },

      {
        id: 3,
        name: 'Suresh',
        attendance: {}
      }

    ];
  }

  get formattedDate(): string {

    return this.selectedDate
      .toISOString()
      .split('T')[0];
  }

  get filteredStudents() {

    return this.students.filter(student =>

      student.name
      .toLowerCase()

      .includes(
        this.searchText.toLowerCase()
      )
    );
  }

  addStudent() {

    if (!this.newStudentName.trim()) {
      return;
    }

    this.students.push({

      id: Date.now(),

      name: this.newStudentName,

      attendance: {}

    });

    this.newStudentName = '';
  }

  deleteStudent(id: number) {

    this.students =
    this.students.filter(

      student => student.id !== id

    );
  }

  markAttendance(
    student: any,
    value: boolean
  ) {

    student.attendance[
      this.formattedDate
    ] = value;
  }

  getAttendance(student: any): boolean {

    return student.attendance[
      this.formattedDate
    ] || false;
  }

  getStatus(student: any): string {

    return this.getAttendance(student)

      ? 'Present'

      : 'Absent';
  }

  lockAttendance() {

    this.isLocked = true;
  }

  isDateEditable(date: Date): boolean {

    const today = new Date();

    return (

      date >= this.internshipStartDate &&

      date <= today

    );
  }

  getAttendancePercentage(
    student: any
  ): number {

    const records =
    Object.values(student.attendance);

    if (records.length === 0) {

      return 0;
    }

    const present =
    records.filter(

      (value: any) => value === true

    ).length;

    return Math.round(

      (present / records.length) * 100

    );
  }

  getTotalPresent(student: any): number {

    return Object.values(student.attendance)

      .filter(
        (value: any) => value === true
      )

      .length;
  }

  getTotalAbsent(student: any): number {

    return Object.values(student.attendance)

      .filter(
        (value: any) => value === false
      )

      .length;
  }

  getPresentCount(): number {

    return this.students.filter(student =>

      student.attendance[
        this.formattedDate
      ]

    ).length;
  }

  getAbsentCount(): number {

    return this.students.length -

           this.getPresentCount();
  }

  downloadStudentRecord(student: any) {

    let content = `

Student Name:
${student.name}

Present Days:
${this.getTotalPresent(student)}

Absent Days:
${this.getTotalAbsent(student)}

Attendance Percentage:
${this.getAttendancePercentage(student)}%

`;

    const blob = new Blob(

      [content],

      {
        type: 'text/plain'
      }

    );

    const url =
    window.URL.createObjectURL(blob);

    const a =
    document.createElement('a');

    a.href = url;

    a.download =
    `${student.name}_Attendance.txt`;

    a.click();

    window.URL.revokeObjectURL(url);
  }

}
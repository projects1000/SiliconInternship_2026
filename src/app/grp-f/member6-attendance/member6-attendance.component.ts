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
    this.loadTeam('F');

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
  loadDefaultStudents() {

  if (this.students.length > 0) {
    return;
  }

  this.students = [
    { id: 1, name: 'Soyngsruti Jena', present: false },
    { id: 2, name: 'Swagat Das', present: false },
    { id: 3, name: 'Samikshya Samadarshini', present: false },
    { id: 4, name: 'Archana Devi', present: false },
    { id: 5, name: 'Roshan Mishra', present: false },
    { id: 6, name: 'Satyabrat Sarangi', present: false },
    { id: 7, name: 'Priyanshu Sekhar', present: false },
    { id: 8, name: 'Ankit Prasad', present: false },
    { id: 9, name: 'Ronit Kumar Swain', present: false },

    { id: 10, name: 'Jagannath Padhi', present: false },
    { id: 11, name: 'Rohan Kumar Nayak', present: false },
    { id: 12, name: 'Tushar Ranjan Muduli', present: false },
    { id: 13, name: 'Snehasis Das', present: false },
    { id: 14, name: 'Omkar Sahoo', present: false },
    { id: 15, name: 'Motilal Turuk', present: false },

    { id: 16, name: 'Gayatri Pati', present: false },
    { id: 17, name: 'Gaurav Patra', present: false },
    { id: 18, name: 'Ayush Guharay', present: false },
    { id: 19, name: 'Anup Mohanty', present: false },
    { id: 20, name: 'Adil Khan', present: false },
    { id: 21, name: 'Anurag Mohanty', present: false },
    { id: 22, name: 'Debashis Tripathy', present: false },
    { id: 23, name: 'Safaq Jamal', present: false },
    { id: 24, name: 'Sohan Mohanty', present: false },
    { id: 25, name: 'Hrushikesh Pattnaik', present: false },

    { id: 26, name: 'Chandan Kumar Sahu', present: false },
    { id: 27, name: 'Sitikantha Dalal', present: false },
    { id: 28, name: 'Titiksha Sahu', present: false },
    { id: 29, name: 'Anjali Sahoo', present: false },
    { id: 30, name: 'Sushree Sangita Sethi', present: false },
    { id: 31, name: 'Mama Bisoi', present: false },
    { id: 32, name: 'Tanmay Sahu', present: false },
    { id: 33, name: 'Pratik Parag Pani', present: false },
    { id: 34, name: 'Ranit Das', present: false },
    { id: 35, name: 'Shobha Kumari', present: false },
    { id: 36, name: 'CS Vishal Rout', present: false },

    { id: 37, name: 'Rajesh Behera', present: false },
    { id: 38, name: 'Maniket Padhan', present: false },
    { id: 39, name: 'Jeevan Jyoti Panigrahi', present: false },
    { id: 40, name: 'Ayush Mishra', present: false },
    { id: 41, name: 'Mohit Singal', present: false },
    { id: 42, name: 'Dhiraj Mahapatra', present: false },
    { id: 43, name: 'Swayam Sahu', present: false },
    { id: 44, name: 'Subhashree Mohapatra', present: false },
    { id: 45, name: 'Subhalaxmi Sahoo', present: false },

    { id: 46, name: 'Rajshree Panda', present: false },
    { id: 47, name: 'Soumyashree Panda', present: false },
    { id: 48, name: 'Rupali Jena', present: false },
    { id: 49, name: 'Lipsa Panda', present: false },
    { id: 50, name: 'Shreshtha Mohanty', present: false },
    { id: 51, name: 'Sukanya Subhadarshini', present: false },
    { id: 52, name: 'Anjali Mishra', present: false },
    { id: 53, name: 'Prachi Pratyasha Das', present: false },
    { id: 54, name: 'Nirmit Nayak', present: false },
    { id: 55, name: 'Padmalaya Meher', present: false },

    { id: 56, name: 'Shubham Kumar', present: false },
    { id: 57, name: 'Yash Kumar', present: false },
    { id: 58, name: 'Sasawat Rout', present: false },
    { id: 59, name: 'Adarsh Kumar', present: false },
    { id: 60, name: 'Amit Kumar Yash', present: false },
    { id: 61, name: 'C H Tanisha', present: false },
    { id: 62, name: 'Pratikshya Acharya', present: false },
    { id: 63, name: 'Mahesh Dakua', present: false },
    { id: 64, name: 'Anil Kumar Nayak', present: false },
    { id: 65, name: 'Khushi Sahu', present: false }
  ];
this.saveData();
  }
  loadTeam(team: string) {

  const teams: any = {

    A: [
      'Soyngsruti Jena',
      'Swagat Das',
      'Samikshya Samadarshini',
      'Archana Devi',
      'Roshan Mishra',
      'Satyabrat Sarangi',
      'Priyanshu Sekhar',
      'Ankit Prasad',
      'Ronit Kumar Swain'
    ],

    B: [
      'Jagannath Padhi',
      'Rohan Kumar Nayak',
      'Tushar Ranjan Muduli',
      'Snehasis Das',
      'Omkar Sahoo',
      'Motilal Turuk'
    ],

    C: [
      'Gayatri Pati',
      'Gaurav Patra',
      'Ayush Guharay',
      'Anup Mohanty',
      'Adil Khan',
      'Anurag Mohanty',
      'Debashis Tripathy',
      'Safaq Jamal',
      'Sohan Mohanty',
      'Hrushikesh Pattnaik'
    ],

    D: [
      'Chandan Kumar Sahu',
      'Sitikantha Dalal',
      'Titiksha Sahu',
      'Anjali Sahoo',
      'Sushree Sangita Sethi',
      'Mama Bisoi',
      'Tanmay Sahu',
      'Pratik Parag Pani',
      'Ranit Das',
      'Shobha Kumari',
      'CS Vishal Rout'
    ],

    E: [
      'Rajesh Behera',
      'Maniket Padhan',
      'Jeevan Jyoti Panigrahi',
      'Ayush Mishra',
      'Mohit Singal',
      'Dhiraj Mahapatra',
      'Swayam Sahu',
      'Subhashree Mohapatra',
      'Subhalaxmi Sahoo'
    ],

    F: [
      'Rajshree Panda',
      'Soumyashree Panda',
      'Rupali Jena',
      'Lipsa Panda',
      'Shreshtha Mohanty',
      'Sukanya Subhadarshini',
      'Anjali Mishra',
      'Prachi Pratyasha Das',
      'Nirmit Nayak',
      'Padmalaya Meher'
    ],

    G: [
      'Shubham Kumar',
      'Yash Kumar',
      'Sasawat Rout',
      'Adarsh Kumar',
      'Amit Kumar Yash',
      'C H Tanisha',
      'Pratikshya Acharya',
      'Mahesh Dakua',
      'Anil Kumar Nayak',
      'Khushi Sahu'
    ]
  };

  this.students = teams[team].map(
    (name: string, index: number) => ({
      id: index + 1,
      name,
      present: false
    })
  );

  this.saveData();
}
}

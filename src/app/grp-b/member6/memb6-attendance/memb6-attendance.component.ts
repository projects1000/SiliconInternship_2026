import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-memb6-attendance',
  templateUrl: './memb6-attendance.component.html',
  styleUrls: ['./memb6-attendance.component.css']
})

export class Memb6AttendanceComponent implements OnInit {

  darkMode = false;

  activeTab = 'dashboard';

  selectedDateStr = '';

  minDate = '2026-05-25';

maxDate = '';

  selectedTeam = '';

  searchText: string = '';

  adminPassword = '';

  isAdmin = false;

  currentTime = '';

  presentCount = 0;

  lateCount = 0;

  absentCount = 0;

  

  teams = [
    'Team A',
    'Team B',
    'Team C',
    'Team D',
    'Team E',
    'Team F',
    'Team G'
  ];

 students: any[] = [

  // TEAM A

  {
    id: 1,
    name: 'Soyngsruti Jena',
    team: 'Team A',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  {
    id: 2,
    name: 'Swagat Das',
    team: 'Team A',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  {
    id: 3,
    name: 'Aman Kumar',
    team: 'Team A',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  // TEAM B

  {
    id: 4,
    name: 'Motilal Turuk',
    team: 'Team B',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  {
    id: 5,
    name: 'Rohan Kumar Nayak',
    team: 'Team B',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  {
    id: 6,
    name: 'Jagannath Padhi',
    team: 'Team B',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  // TEAM C

  {
    id: 7,
    name: 'Gayatri Pati',
    team: 'Team C',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  {
    id: 8,
    name: 'Anjali Das',
    team: 'Team C',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  {
    id: 9,
    name: 'Priya Sharma',
    team: 'Team C',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  // TEAM D

  {
    id: 10,
    name: 'Suresh Turuk',
    team: 'Team D',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  {
    id: 11,
    name: 'Deepak Kumar',
    team: 'Team D',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  {
    id: 12,
    name: 'Rahul Das',
    team: 'Team D',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  // TEAM E

  {
    id: 13,
    name: 'Rajesh Behera',
    team: 'Team E',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  {
    id: 14,
    name: 'Sanjay Rout',
    team: 'Team E',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  {
    id: 15,
    name: 'Ritik Mohanty',
    team: 'Team E',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  // TEAM F

  {
    id: 16,
    name: 'Rajshree Panda',
    team: 'Team F',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  {
    id: 17,
    name: 'Sneha Patra',
    team: 'Team F',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  {
    id: 18,
    name: 'Akash Mishra',
    team: 'Team F',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  // TEAM G

  {
    id: 19,
    name: 'Shubham Kumar',
    team: 'Team G',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  {
    id: 20,
    name: 'Aditya Pradhan',
    team: 'Team G',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  },

  {
    id: 21,
    name: 'Pooja Sahu',
    team: 'Team G',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    attendance: {}
  }

];

  attendanceDates: string[] = [];

  selectedStudent: any = null;

showProfilePopup = false;

toastMessage = '';

showToast = false;

 ngOnInit(): void {

  const savedTheme =
  localStorage.getItem('attendanceTheme');

if (savedTheme === 'dark') {

  this.darkMode = true;

}

  this.searchText = '';

  setTimeout(() => {

    this.searchText = '';

  }, 100);

  const today = new Date();

  this.selectedDateStr =
    today.toISOString().split('T')[0];

  // MIN DATE → 25 MAY 2026

  this.minDate = '2026-05-25';

  // MAX DATE → TODAY

  this.maxDate =
    today.toISOString().split('T')[0];

  this.selectedTeam = '';

  this.generateDates();

  this.updateDashboardCounts();

  this.updateClock();

  setInterval(() => {

    this.updateClock();

  }, 1000);

}

  updateClock() {

    this.currentTime = new Date().toLocaleString(
      'en-GB',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }
    );

  }

  formatDate(date: string): string {

    if (!date) return '';

    const d = new Date(date);

    return d.toLocaleDateString('en-GB');

  }

  toggleTheme() {

  this.darkMode = !this.darkMode;

  // SAVE THEME

  localStorage.setItem(
    'attendanceTheme',
    this.darkMode ? 'dark' : 'light'
  );

}

  generateDates() {

    this.attendanceDates = [];

    for (let i = 0; i < 10; i++) {

      const d = new Date();

      d.setDate(d.getDate() - i);

      this.attendanceDates.push(
        d.toISOString().split('T')[0]
      );

    }

  }

get filteredStudents() {

  let students = [...this.students];

  // TEAM FILTER

  if (this.selectedTeam !== '') {

    students = students.filter(student =>

      student.team === this.selectedTeam

    );

  }

  // SEARCH FILTER

  const search =
    this.searchText?.trim().toLowerCase();

  // IMPORTANT FIX

  if (
    search &&
    search !== 'motilal'
  ) {

    students = students.filter(student =>

      student.name
        .toLowerCase()
        .includes(search)

    );

  }

  return students;

}

  get leaderboard() {

    return [...this.students].sort(
      (a, b) =>
        this.getAttendancePercentage(b) -
        this.getAttendancePercentage(a)
    );

  }

  getStatus(student: any, date?: string): string {

    const selected =
      date || this.selectedDateStr;

    return student.attendance[selected] || 'Absent';

  }

  cycleAttendance(student: any) {

    if (this.isAttendanceLocked) {
      return;
    }

    const current = this.getStatus(student);

    let next = 'Present';

    if (current === 'Present') {
      next = 'Late';
    }

    else if (current === 'Late') {
      next = 'Absent';
    }

    student.attendance[this.selectedDateStr] = next;

    this.updateDashboardCounts();

  }

  submitAttendance() {

    localStorage.setItem(
      'attendanceLock_' + this.selectedDateStr,
      'true'
    );

    this.showToastMessage(
  '✅ Attendance Submitted & Locked Successfully'
);

  }

  unlockAttendance() {

    localStorage.removeItem(
      'attendanceLock_' + this.selectedDateStr
    );

    this.showToastMessage(
  '🔓 Attendance Unlocked'
);

  }

  get isAttendanceLocked(): boolean {

    return localStorage.getItem(
      'attendanceLock_' + this.selectedDateStr
    ) === 'true';

  }

  loginAdmin() {

    if (this.adminPassword.trim() === 'admin123') {

      this.isAdmin = true;

      this.showToastMessage(
  '✅ Admin Login Successful'
);

    }

    else {

      this.isAdmin = false;

      this.showToastMessage(
  '❌ Wrong Password'
);

    }

  }

  logoutAdmin() {

    this.isAdmin = false;

    this.adminPassword = '';

  }
  showLoginMessage() {

  this.showToastMessage(
  '🔒 Please Login As Admin First'
);

}


  getAttendancePercentage(student: any): number {

    const values = Object.values(student.attendance);

    if (values.length === 0) {
      return 0;
    }

    let present = 0;

    values.forEach((value: any) => {

      if (
        value === 'Present' ||
        value === 'Late'
      ) {
        present++;
      }

    });

    return Math.round(
      (present / values.length) * 100
    );

  }

  updateDashboardCounts() {

    this.presentCount = 0;

    this.lateCount = 0;

    this.absentCount = 0;

    this.students.forEach(student => {

      const status = this.getStatus(student);

      if (status === 'Present') {
        this.presentCount++;
      }

      else if (status === 'Late') {
        this.lateCount++;
      }

      else {
        this.absentCount++;
      }

    });

  }

  showToastMessage(message: string) {

  this.toastMessage = message;

  this.showToast = true;

  setTimeout(() => {

    this.showToast = false;

  }, 3000);

}

  downloadPDF(student: any) {

  const doc = new jsPDF();

  // TITLE

  doc.setFontSize(20);

  doc.setTextColor(40, 40, 40);

  doc.text(
    'Attendance Report',
    70,
    20
  );

  // STUDENT DETAILS

  doc.setFontSize(12);

  doc.text(
    `Student Name : ${student.name}`,
    14,
    40
  );

  doc.text(
    `Team : ${student.team}`,
    14,
    50
  );

  doc.text(
    `Generated On : ${new Date().toLocaleDateString('en-GB')}`,
    14,
    60
  );

  // TABLE DATA

  const body = this.attendanceDates.map(date => [

    this.formatDate(date),

    this.getStatus(student, date)

  ]);

  // TABLE

  autoTable(doc, {

    startY: 75,

    head: [['Date', 'Attendance Status']],

    body: body,

    theme: 'grid',

    headStyles: {

      fillColor: [37, 99, 235],

      textColor: [255, 255, 255],

      fontStyle: 'bold',

      halign: 'center'

    },

    styles: {

      fontSize: 11,

      cellPadding: 5,

      halign: 'center',

      valign: 'middle'

    },

    alternateRowStyles: {

      fillColor: [245, 245, 245]

    }

  });

  // SAVE PDF

  doc.save(
    `${student.name}-attendance-report.pdf`
  );

}

openStudentProfile(student: any) {

  this.selectedStudent = student;

  this.showProfilePopup = true;

}

closeStudentProfile() {

  this.showProfilePopup = false;

}

getPresentCount(student: any): number {

  return Object.values(student.attendance)
    .filter(
      (status: any) => status === 'Present'
    ).length;

}

getLateCount(student: any): number {

  return Object.values(student.attendance)
    .filter(
      (status: any) => status === 'Late'
    ).length;

}

getAbsentCount(student: any): number {

  return Object.values(student.attendance)
    .filter(
      (status: any) => status === 'Absent'
    ).length;

}

getHeatmapClass(
  student: any,
  date: string
) {

  const status =
    this.getStatus(student, date);

  if (status === 'Present') {

    return 'heat-present';

  }

  if (status === 'Late') {

    return 'heat-late';

  }

  return 'heat-absent';

}

}
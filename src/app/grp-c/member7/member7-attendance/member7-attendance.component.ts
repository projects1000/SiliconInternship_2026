import { Component } from '@angular/core';

interface Student {
  id: string;
  name: string;
  isPresent: boolean;
}

@Component({
  selector: 'app-member7-attendance',
  templateUrl: './member7-attendance.component.html',
  styleUrls: ['./member7-attendance.component.css']
}
)
export class Member7AttendanceComponent {
  // Hardcoded group list based on your project structure
  students: Student[] = [
    { id: '24bcsa43', name: 'Member 3', isPresent: true },
    { id: '24bcsa44', name: 'Member 4', isPresent: true },
    { id: '24bcsa45', name: 'Member 5', isPresent: true },
    { id: '24bcsa46', name: 'Member 6', isPresent: true },
    { id: '24bcsa48', name: 'Debashis Tripathy (Member 7)', isPresent: true },
    { id: '24bcsa49', name: 'Member 8', isPresent: true },
    { id: '24bcsa50', name: 'Member 9', isPresent: true },
    { id: '24bcsa51', name: 'Member 10', isPresent: true }
  ];

  toggleAttendance(student: Student) {
    student.isPresent = !student.isPresent;
  }

  get totalStudents(): number {
    return this.students.length;
  }

  get presentCount(): number {
    return this.students.filter(s => s.isPresent).length;
  }

  get absentCount(): number {
    return this.students.filter(s => !s.isPresent).length;
  }
}
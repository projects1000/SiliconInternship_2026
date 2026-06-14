import { Component, OnInit } from '@angular/core';

interface Student {
  id: number;
  regNo: string;
  name: string;
  attendance: { [date: string]: boolean };
}

interface TeamNode {
  name: string;
  children?: TeamNode[];
}

@Component({
  selector: 'app-member2-attendence0001',
  templateUrl: './attendence0001.component.html',
  styleUrls: ['./attendence0001.component.css'],
})
export class AttendanceComponent0001 implements OnInit {
  storageKey = 'grp_e_member2_attendance';
  lockKey = 'grp_e_member2_attendance_locked';

  today = new Date().toISOString().split('T')[0];
  selectedDate = this.today;
  searchText = '';
  newRegNo = '';
  newMemberName = '';
  attendanceLocked = false;

  treeData: TeamNode[] = [
    {
      name: 'Group E',
      children: [
        { name: 'Rajesh Behera' },
        { name: 'Maniket Padhan' },
        { name: 'Jeevan Jyoti Panigrahi' },
        { name: 'Ayush Mishra' },
        { name: 'Mohit Singal' },
        { name: 'Dhiraj Mahapatra' },
        { name: 'Swayam Sahu' },
        { name: 'Subhashree Mohapatra' },
        { name: 'Subhalaxmi Sahoo' },
      ],
    },
  ];

  students: Student[] = [
    { id: 1, regNo: 'MCA001', name: 'Rajesh Behera', attendance: {} },
    { id: 2, regNo: 'MCA002', name: 'Maniket Padhan', attendance: {} },
    { id: 3, regNo: 'MCA003', name: 'Jeevan Jyoti Panigrahi', attendance: {} },
    { id: 4, regNo: 'MCA004', name: 'Ayush Mishra', attendance: {} },
    { id: 5, regNo: 'MCA005', name: 'Mohit Singal', attendance: {} },
    { id: 6, regNo: 'MCA006', name: 'Dhiraj Mahapatra', attendance: {} },
    { id: 7, regNo: 'MCA007', name: 'Swayam Sahu', attendance: {} },
    { id: 8, regNo: 'MCA008', name: 'Subhashree Mohapatra', attendance: {} },
    { id: 9, regNo: 'MCA009', name: 'Subhalaxmi Sahoo', attendance: {} },
  ];

  displayedColumns = ['id', 'regNo', 'name', 'attendance', 'status'];

  ngOnInit(): void {
    const saved = localStorage.getItem(this.storageKey);
    const locked = localStorage.getItem(this.lockKey);

    if (saved) {
      this.students = JSON.parse(saved);
    }

    this.attendanceLocked = locked === 'true';
  }

  get filteredStudents(): Student[] {
    const value = this.searchText.toLowerCase();

    return this.students.filter(
      (student) =>
        student.name.toLowerCase().includes(value) ||
        student.regNo.toLowerCase().includes(value),
    );
  }

  hasChild = (_: number, node: TeamNode) =>
    !!node.children && node.children.length > 0;

  isFutureDate(): boolean {
    return this.selectedDate > this.today;
  }

  canEdit(): boolean {
    return !this.attendanceLocked && !this.isFutureDate();
  }

  addMember(): void {
    if (!this.newRegNo.trim() || !this.newMemberName.trim()) {
      alert('Please enter registration number and member name');
      return;
    }

    const nextId =
      this.students.length > 0
        ? Math.max(...this.students.map((student) => student.id)) + 1
        : 1;

    const newStudent: Student = {
      id: nextId,
      regNo: this.newRegNo.trim(),
      name: this.newMemberName.trim(),
      attendance: {},
    };

    this.students.push(newStudent);

    if (this.treeData[0].children) {
      this.treeData[0].children.push({
        name: newStudent.name,
      });
    }

    this.newRegNo = '';
    this.newMemberName = '';

    this.saveAttendance();
  }

  saveAttendance(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.students));
  }

  lockAttendance(): void {
    const confirmLock = confirm('Lock attendance permanently?');

    if (confirmLock) {
      this.attendanceLocked = true;
      localStorage.setItem(this.lockKey, 'true');
      this.saveAttendance();
    }
  }

  presentCount(): number {
    return this.students.filter(
      (student) => student.attendance[this.selectedDate],
    ).length;
  }

  absentCount(): number {
    return this.students.length - this.presentCount();
  }

  attendancePercentage(): number {
    if (this.students.length === 0) {
      return 0;
    }

    return Math.round((this.presentCount() / this.students.length) * 100);
  }
}

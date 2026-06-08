import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

// 1. INTERFACE DEFINITIONS (Fixes the TS2304 error)
export interface TeamMember {
  name: string;
  attendanceMap: { [date: string]: boolean };
}

export interface Group {
  groupName: string;
  members: TeamMember[];
}

@Component({
  selector: 'app-attendance-matrix',
  templateUrl: './attendance-matrix.component.html',
  styleUrls: ['./attendance-matrix.component.css']
})
export class AttendanceMatrixComponent {
  selectedDate: Date = new Date();
  dayLocks: { [date: string]: boolean } = {};

  // 2. DATA STRUCTURE
  allGroups: Group[] = [
  { groupName: 'Group A', members: [
    { name: 'Soyngsruti Jena', attendanceMap: {} }, { name: 'Swagat Das', attendanceMap: {} }, 
    { name: 'Samikshya Samadarshini', attendanceMap: {} }, { name: 'Archana Devi', attendanceMap: {} }, 
    { name: 'Roshan Mishra', attendanceMap: {} }, { name: 'Satyabrat Sarangi', attendanceMap: {} }, 
    { name: 'Priyanshu Sekhar', attendanceMap: {} }, { name: 'Ankit Prasad', attendanceMap: {} }, 
    { name: 'Ronit Kumar Swain', attendanceMap: {} }
  ]},
  { groupName: 'Group B', members: [
    { name: 'Jagannath Padhi', attendanceMap: {} }, { name: 'Rohan Kumar Nayak', attendanceMap: {} }, 
    { name: 'Tushar Ranjan Muduli', attendanceMap: {} }, { name: 'Snehasis Das', attendanceMap: {} }, 
    { name: 'Omkar Sahoo', attendanceMap: {} }, { name: 'Motilal Turuk', attendanceMap: {} }
  ]},
  { groupName: 'Group C', members: [
    { name: 'Gayatri Pati', attendanceMap: {} }, { name: 'Gaurav Patra', attendanceMap: {} }, 
    { name: 'Ayush Guharay', attendanceMap: {} }, { name: 'Anup Mohanty', attendanceMap: {} }, 
    { name: 'Adil Khan', attendanceMap: {} }, { name: 'Anurag Mohanty', attendanceMap: {} }, 
    { name: 'Debashis Tripathy', attendanceMap: {} }, { name: 'Safaq Jamal', attendanceMap: {} }, 
    { name: 'Sohan Mohanty', attendanceMap: {} }, { name: 'Hrushikesh Pattnaik', attendanceMap: {} }
  ]},
  { groupName: 'Group D', members: [
    { name: 'Chandan Kumar Sahu', attendanceMap: {} }, { name: 'Titiksha Sahu', attendanceMap: {} }, 
    { name: 'Sitikantha Dalal', attendanceMap: {} }, { name: 'Anjali Sahoo', attendanceMap: {} }, 
    { name: 'Sushree Sangita Sethi', attendanceMap: {} }, { name: 'Mama Bisoi', attendanceMap: {} }, 
    { name: 'Tanmay Sahu', attendanceMap: {} }, { name: 'Pratik Parag Pani', attendanceMap: {} }, 
    { name: 'Ranit Das', attendanceMap: {} }, { name: 'Shobha Kumari', attendanceMap: {} }, 
    { name: 'CS Vishal Rout', attendanceMap: {} }
  ]},
  { groupName: 'Group E', members: [
    { name: 'Rajesh Behera', attendanceMap: {} }, { name: 'Maniket Padhan', attendanceMap: {} }, 
    { name: 'Jeevan Jyoti Panigrahi', attendanceMap: {} }, { name: 'Ayush Mishra', attendanceMap: {} }, 
    { name: 'Mohit Singal', attendanceMap: {} }, { name: 'Dhiraj Mahapatra', attendanceMap: {} }, 
    { name: 'Swayam Sahu', attendanceMap: {} }, { name: 'Subhashree Mohapatra', attendanceMap: {} }, 
    { name: 'Subhalaxmi Sahoo', attendanceMap: {} }
  ]},
  { groupName: 'Group F', members: [
    { name: 'Rajshree Panda', attendanceMap: {} }, { name: 'Soumyashree Panda', attendanceMap: {} }, 
    { name: 'Rupali Jena', attendanceMap: {} }, { name: 'Lipsa Panda', attendanceMap: {} }, 
    { name: 'Shreshtha Mohanty', attendanceMap: {} }, { name: 'Sukanya Subhadarshini', attendanceMap: {} }, 
    { name: 'Anjali Mishra', attendanceMap: {} }, { name: 'Prachi Pratyasha Das', attendanceMap: {} }, 
    { name: 'Nirmit Nayak', attendanceMap: {} }, { name: 'Padmalaya Meher', attendanceMap: {} }
  ]},
  { groupName: 'Group G', members: [
    { name: 'Shubham Kumar', attendanceMap: {} }, { name: 'Yash Kumar', attendanceMap: {} }, 
    { name: 'Sasawat Rout', attendanceMap: {} }, { name: 'Adarsh Kumar', attendanceMap: {} }, 
    { name: 'Amit Kumar Yash', attendanceMap: {} }, { name: 'C H Tanisha', attendanceMap: {} }, 
    { name: 'Pratikshya Acharya', attendanceMap: {} }, { name: 'Mahesh Dakua', attendanceMap: {} }, 
    { name: 'Anil Kumar Nayak', attendanceMap: {} }, { name: 'Khushi Sahu', attendanceMap: {} }
  ]}
];

  selectedGroup: Group = this.allGroups[0];

  constructor(private router: Router) {}

  selectGroup(g: Group) { this.selectedGroup = g; }

  toggleAttendance(m: TeamMember, d: Date) {
    const key = d.toDateString();
    if (!this.dayLocks[key]) {
      m.attendanceMap[key] = !m.attendanceMap[key];
    }
  }

  toggleLock(d: Date) {
    const key = d.toDateString();
    this.dayLocks[key] = !this.dayLocks[key];
  }

  markAll(status: boolean) {
    const key = this.selectedDate.toDateString();
    if (!this.dayLocks[key]) {
      this.selectedGroup.members.forEach(m => m.attendanceMap[key] = status);
    }
  }

  exportToCSV() {
    const dateKey = this.selectedDate.toDateString();
    const csvContent = this.selectedGroup.members.map(m => 
      `${m.name},${m.attendanceMap[dateKey] ? 'Present' : 'Absent'}`
    ).join('\n');
    const blob = new Blob([`Name,Status\n${csvContent}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Attendance_${this.selectedGroup.groupName}.csv`;
    a.click();
  }

  saveAndRedirect() {
    alert("Attendance Saved Successfully!");
    this.router.navigate(['/']); 
  }
}
import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  // Tree Setup
  treeControl = new FlatTreeControl<any>(n => n.level, n => n.expandable);
  treeFlattener = new MatTreeFlattener(
    (n: any, l: number) => ({ expandable: !!n.children, name: n.name, level: l, members: n.members }),
    n => n.level, n => n.expandable, n => n.children
  );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // App Data
  // App Data
fullTreeData = [
  { name: 'Group A', children: [], members: [
    {id: 1, name: 'Soyngsruti Jena'}, {id: 2, name: 'Swagat Das'}, {id: 3, name: 'Samikshya Samadarshini'}, 
    {id: 4, name: 'Archana Devi'}, {id: 5, name: 'Roshan Mishra'}, {id: 6, name: 'Satyabrat Sarangi'}, 
    {id: 7, name: 'Priyanshu Sekhar'}, {id: 8, name: 'Ankit Prasad'}, {id: 9, name: 'Ronit Kumar Swain'}
  ]},
  { name: 'Group B', children: [], members: [
    {id: 10, name: 'Jagannath Padhi'}, {id: 11, name: 'Rohan Kumar Nayak'}, {id: 12, name: 'Tushar Ranjan Muduli'}, 
    {id: 13, name: 'Snehasis Das'}, {id: 14, name: 'Omkar Sahoo'}, {id: 15, name: 'Motilal Turuk'}
  ]},
  { name: 'Group C', children: [], members: [
    {id: 16, name: 'Gayatri Pati'}, {id: 17, name: 'Gaurav Patra'}, {id: 18, name: 'Ayush Guharay'}, 
    {id: 19, name: 'Anup Mohanty'}, {id: 20, name: 'Adil Khan'}, {id: 21, name: 'Anurag Mohanty'}, 
    {id: 22, name: 'Debashis Tripathy'}, {id: 23, name: 'Safaq Jamal'}, {id: 24, name: 'Sohan Mohanty'}, {id: 25, name: 'Hrushikesh Pattnaik'}
  ]},
  { name: 'Group D', children: [], members: [
    {id: 26, name: 'Chandan Kumar Sahu'}, {id: 27, name: 'Sitikantha Dalal'}, {id: 28, name: 'Titiksha Sahu'}, 
    {id: 29, name: 'Anjali Sahoo'}, {id: 30, name: 'Sushree Sangita Sethi'}, {id: 31, name: 'Mama Bisoi'}, 
    {id: 32, name: 'Tanmay Sahu'}, {id: 33, name: 'Pratik Parag Pani'}, {id: 34, name: 'Ranit Das'}, 
    {id: 35, name: 'Shobha Kumari'}, {id: 36, name: 'CS Vishal Rout'}
  ]},
  { name: 'Group E', children: [], members: [
    {id: 37, name: 'Rajesh Behera'}, {id: 38, name: 'Maniket Padhan'}, {id: 39, name: 'Jeevan Jyoti Panigrahi'}, 
    {id: 40, name: 'Ayush Mishra'}, {id: 41, name: 'Mohit Singal'}, {id: 42, name: 'Dhiraj Mahapatra'}, 
    {id: 43, name: 'Swayam Sahu'}, {id: 44, name: 'Subhashree Mohapatra'}, {id: 45, name: 'Subhalaxmi Sahoo'}
  ]},
  { name: 'Group F', children: [], members: [
    {id: 46, name: 'Rajshree Panda'}, {id: 47, name: 'Soumyashree Panda'}, {id: 48, name: 'Rupali Jena'}, 
    {id: 49, name: 'Lipsa Panda'}, {id: 50, name: 'Shrestha Mohanty'}, {id: 51, name: 'Sukanya Subhadarshini'}, 
    {id: 52, name: 'Anjali Mishra'}, {id: 53, name: 'Prachi Pratyasha Das'}, {id: 54, name: 'Nirmit Nayak'}, {id: 55, name: 'Padmalaya Meher'}
  ]},
  { name: 'Group G', children: [], members: [
    {id: 56, name: 'Shubham Kumar'}, {id: 57, name: 'Yash Kumar'}, {id: 58, name: 'Sasawat Rout'}, 
    {id: 59, name: 'Adarsh Kumar'}, {id: 60, name: 'Amit Kumar Yash'}, {id: 61, name: 'G H Tanisha'}, 
    {id: 62, name: 'Pratikshya Acharya'}, {id: 63, name: 'Mahesh Dakua'}, {id: 64, name: 'Anil Kumar Nayak'}, 
    {id: 65, name: 'Khushi Sahu'}, {id: 66, name: 'Swarna Sharma'}
  ]}
];
  
  activeMembers: any[] = [];
  attendanceState: any = {}; // Stores { 'YYYY-MM-DD-memberId': 'Present' | 'Absent' }
  selectedDate: Date = new Date(); 
  isLocked: boolean = false;

  constructor() { 
    this.dataSource.data = this.fullTreeData; 
  }

  ngOnInit() {}

  // Helper to get formatted string date
  getDateKey(): string {
    return this.selectedDate.toISOString().split('T')[0];
  }

  // Triggered when clicking a Group in the Tree
  selectGroup(node: any) {
    if (node.members) {
      this.activeMembers = node.members;
    }
  }

  // Toggle attendance status
  toggleStatus(member: any) {
    if (this.isLocked) return;
    const key = `${this.getDateKey()}-${member.id}`;
    this.attendanceState[key] = this.attendanceState[key] === 'Present' ? 'Absent' : 'Present';
  }

  // Get status for display
  getStatus(memberId: number): string {
    return this.attendanceState[`${this.getDateKey()}-${memberId}`] || 'Absent';
  }

  // Lock Attendance
  lockAttendance() { 
    this.isLocked = true; 
    alert('Attendance Locked for ' + this.getDateKey()); 
  }
  
  // Simple Export Logic
  exportToExcel() { 
    console.log('Exporting data:', this.attendanceState);
    alert('Exporting to Excel...'); 
  }
  
  hasChild = (_: number, node: any) => node.expandable;
}

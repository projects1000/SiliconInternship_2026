import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member3-attendance',
  templateUrl: './member3-attendance.component.html',
  styleUrls: ['./member3-attendance.component.css']
})
export class Member3AttendanceComponent implements OnInit {

  // Default settings
  selectedGroup: string = 'A';
  selectedDate: string = '';

  groups: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  masterData: { [key: string]: string[] } = {
    'A': ['Soyngsruti Jena', 'Swagat Das', 'Samikshya Samadarshini', 'Archana Devi', 'Roshan Mishra', 'Satyabrat Sarangi', 'Priyanshu Sekhar', 'Ankit Prasad', 'Ronit Kumar Swain'],
    'B': ['Jagannath Padhi', 'Rohan Kumar Nayak', 'Tushar Ranjan Muduli', 'Snehasis Das', 'Omkar Sahoo', 'Motilal Turuk'],
    'C': ['Gayatri Pati', 'Gaurav Patra', 'Ayush Guharay', 'Anup Mohanty', 'Adil Khan', 'Anurag Mohanty', 'Debashis Tripathy', 'Safaq Jamal', 'Sohan Mohanty', 'Hrushikesh Pattnaik'],
    'D': ['Chandan Kumar Sahu', 'Sitikantha Dalal', 'Titiksha Sahu', 'Anjali Sahoo', 'Sushree Sangita Sethi', 'Mama Bisoi', 'Tanmay Sahu', 'Pratik Parag Pani', 'Ranit Das', 'Shobha Kumari', 'CS Vishal Rout'],
    'E': ['Rajesh Behera', 'Maniket Padhan', 'Jeevan Jyoti Panigrahi', 'Ayush Mishra', 'Mohit Singal', 'Dhiraj Mahapatra', 'Swayam Sahu', 'Subhashree Mohapatra', 'Subhalaxmi Sahoo'],
    'F': ['Rajshree Panda', 'Soumyashree Panda', 'Rupali Jena', 'Lipsa Panda', 'Shreshtha Mohanty', 'Sukanya Subhadarshini', 'Anjali Mishra', 'Prachi Pratyasha Das', 'Nirmit Nayak', 'Padmalaya Meher'],
    'G': ['Shubham Kumar', 'Yash Kumar', 'Sasawat Rout', 'Adarsh Kumar', 'Amit Kumar Yash', 'C H Tanisha', 'Pratikshya Acharya', 'Mahesh Dakua', 'Anil Kumar Nayak', 'Khushi Sahu']
  };

  // UI par dikhane ke liye dynamic list
  displayMembers: { name: string, isPresent: boolean }[] = [];

  ngOnInit() {
    // Default aaj ki date set hogi calendar mein
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0];
    this.loadAttendance();
  }
  onGroupChange(group: string) {
    this.selectedGroup = group;
    this.loadAttendance();
  }

  onDateChange() {
    this.loadAttendance();
  }

  loadAttendance() {
    const allRecords = localStorage.getItem('internship_attendance');
    let attendanceMap = allRecords ? JSON.parse(allRecords) : {};


    const key = `${this.selectedDate}_Team_${this.selectedGroup}`;
    const savedStatus = attendanceMap[key]; // returns object like { 'Name': true/false }

    const defaultMembers = this.masterData[this.selectedGroup] || [];

    this.displayMembers = defaultMembers.map(name => {
      return {
        name: name,
        isPresent: savedStatus && savedStatus[name] !== undefined ? savedStatus[name] : false
      };
    });
  }

  // [CREATE / UPDATE Operation]
  saveAttendance() {
    const allRecords = localStorage.getItem('internship_attendance');
    let attendanceMap = allRecords ? JSON.parse(allRecords) : {};

    const key = `${this.selectedDate}_Team_${this.selectedGroup}`;
    
    // Naya status object banayenge checkboxes se
    let statusObj: { [key: string]: boolean } = {};
    this.displayMembers.forEach(m => {
      statusObj[m.name] = m.isPresent;
    });

    attendanceMap[key] = statusObj;
    localStorage.setItem('internship_attendance', JSON.stringify(attendanceMap));
    
    alert(`Group ${this.selectedGroup} ki attendance ${this.selectedDate} ke liye save ho gayi hai!`);
  }

  resetAttendance() {
    if (confirm('Do you want to delete all data?')) {
      const allRecords = localStorage.getItem('internship_attendance');
      if (allRecords) {
        let attendanceMap = JSON.parse(allRecords);
        const key = `${this.selectedDate}_Team_${this.selectedGroup}`;
        
        delete attendanceMap[key];
        localStorage.setItem('internship_attendance', JSON.stringify(attendanceMap));
        
        this.loadAttendance();
      }
    }
  }
}
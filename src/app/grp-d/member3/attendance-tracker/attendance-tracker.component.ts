import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Member { 
  name: string; 
  attendanceMap: { [date: string]: boolean }; 
}

export interface Group { 
  groupName: string; 
  members: Member[]; 
}

@Component({
  selector: 'app-attendance-tracker',
  templateUrl: './attendance-tracker.component.html',
  styleUrls: ['./attendance-tracker.component.css']
})
export class AttendanceTrackerComponent implements OnInit {
  // Calendar State
  selectedDate: Date = new Date();
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  daysInMonth: number[] = [];
  
  // Data State
  selectedDateKey: string = new Date().toDateString();
  dayLocks: { [date: string]: boolean } = {};
  
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

  ngOnInit(): void {
    this.generateCalendar();
  }

  // --- Calendar Logic ---
  generateCalendar(): void {
    const days = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: days }, (_, i) => i + 1);
  }

  changeMonth(offset: number): void {
    this.currentMonth += offset;
    if (this.currentMonth > 11) { this.currentMonth = 0; this.currentYear++; }
    else if (this.currentMonth < 0) { this.currentMonth = 11; this.currentYear--; }
    this.generateCalendar();
  }

  updateDate(day: number): void {
    this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
    this.selectedDateKey = this.selectedDate.toDateString();
  }

  // --- Attendance Logic ---
  toggleAttendance(m: Member): void {
    if (!this.dayLocks[this.selectedDateKey]) {
      m.attendanceMap[this.selectedDateKey] = !m.attendanceMap[this.selectedDateKey];
    }
  }

  toggleLock(): void {
    this.dayLocks[this.selectedDateKey] = !this.dayLocks[this.selectedDateKey];
  }

  // --- Export & Exit ---
  exportToCSV(): void {
    const header = "Name,Status\n";
    const rows = this.selectedGroup.members.map(m => 
      `${m.name},${m.attendanceMap[this.selectedDateKey] ? 'Present' : 'Absent'}`
    );
    const content = header + rows.join("\n");
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Attendance_${this.selectedDateKey}.csv`;
    a.click();
  }

  saveAndExit(): void {
    this.router.navigate(['/']); 
  }
}
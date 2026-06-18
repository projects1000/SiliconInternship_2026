import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-trackattendance',
  templateUrl: './trackattendance.component.html',
  styleUrls: ['./trackattendance.component.css']
})
export class TrackattendanceComponent {

  @Output() backToProfile = new EventEmitter<void>();

  goBackToProfile() {
    this.backToProfile.emit();
  }

  // ================= DATA =================
  groups: any = {
    A: ["Soyngsruti Jena","Swagat Das","Samikshya Samadarshini","Archana Devi","Roshan Mishra","Satyabrat Sarangi","Priyanshu Sekhar","Ankit Prasad","Ronit Kumar Swain"],
    B: ["Jagannath Padhi","Rohan Kumar Nayak","Tushar Ranjan Muduli","Snehasis Das","Omkar Sahoo","Motilal Turuk"],
    C: ["Gayatri Pati","Gaurav Patra","Ayush Guharay","Anup Mohanty","Adil Khan","Anurag Mohanty","Debashis Tripathy","Safaq Jamal","Sohan Mohanty","Hrushikesh Pattnaik"],
    D: ["Chandan Kumar Sahu","Sitikantha Dalal","Titiksha Sahu","Anjali Sahoo","Sushree Sangita Sethi","Mama Bisoi","Tanmay Sahu","Pratik Parag Pani","Ranit Das","Shobha Kumari","CS Vishal Rout"],
    E: ["Rajesh Behera","Maniket Padhan","Jeevan Jyoti Panigrahi","Ayush Mishra","Mohit Singal","Dhiraj Mahapatra","Swayam Sahu","Subhashree Mohapatra","Subhalaxmi Sahoo"],
    F: ["Rajshree Panda","Soumyashree Panda","Rupali Jena","Lipsa Panda","Shrestha Mohanty","Sukanya Subhadarshini","Anjali Mishra","Prachi Pratyasha Das","Nirmit Nayak","Padmalaya Meher"],
    G: ["Shubham Kumar","Yash Kumar","Sasawat Rout","Adarsh Kumar","Amit Kumar Yash","C H Tanisha","Pratikshya Acharya","Mahesh Dakua","Anil Kumar Nayak","Khushisahu","Swarna Sharma"]
  };

  selectedGroup = 'A';
  selectedDate = this.getToday();

  attendanceList: any[] = [];

  locked = false;

  // storage (no backend)
  store: any = {};

  constructor() {
    this.loadGroup();
  }

  getToday() {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }

  // ================= LOAD =================
  loadGroup() {
    const key = this.selectedGroup + '_' + this.selectedDate;

    if (this.store[key]) {
      this.attendanceList = this.store[key];
    } else {
      this.attendanceList = this.groups[this.selectedGroup].map((name: string) => ({
        name,
        status: 'Absent'
      }));
    }

    this.locked = false;
  }

  selectGroup(g: string) {
    this.selectedGroup = g;
    this.loadGroup();
  }

  changeDate(event: any) {
    this.selectedDate = event.target.value;
    this.loadGroup();
  }

  // ================= TOGGLE =================
  toggle(i: number) {
    if (this.locked) return;

    this.attendanceList[i].status =
      this.attendanceList[i].status === 'Present' ? 'Absent' : 'Present';
  }

  // ================= LOCK =================
  lockAttendance() {
    const key = this.selectedGroup + '_' + this.selectedDate;
    this.store[key] = this.attendanceList;
    this.locked = true;
    alert('Attendance Locked!');
  }

  // ================= EXPORT CSV (NO LIBRARY) =================
  exportCSV() {
    let csv = 'Name,Status\n';

    this.attendanceList.forEach(s => {
      csv += `${s.name},${s.status}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${this.selectedGroup}_${this.selectedDate}.csv`;
    a.click();

    window.URL.revokeObjectURL(url);
  }
}

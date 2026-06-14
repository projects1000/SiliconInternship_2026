import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {

  selectedGroup = 'A';

  searchText = '';
  newStudent = '';

  groups:any = {

    A:[
      {roll:'101',name:'Soyngsruti Jena',present:false},
      {roll:'102',name:'Swagat Das',present:false},
      {roll:'103',name:'Samikshya Samadarshini',present:false},
      {roll:'104',name:'Archana Devi',present:false},
      {roll:'105',name:'Roshan Mishra',present:false},
      {roll:'106',name:'Satyabrat Sarangi',present:false},
      {roll:'107',name:'Priyanshu Sekhar',present:false},
      {roll:'108',name:'Ankit Prasad',present:false},
      {roll:'109',name:'Ronit Kumar Swain',present:false}
    ],

    B:[
      {roll:'201',name:'Jagannath Padhi',present:false},
      {roll:'202',name:'Rohan Kumar Nayak',present:false},
      {roll:'203',name:'Tushar Ranjan Muduli',present:false},
      {roll:'204',name:'Snehasis Das',present:false},
      {roll:'205',name:'Omkar Sahoo',present:false},
      {roll:'206',name:'Motilal Turuk',present:false}
    ],

    C:[
      {roll:'301',name:'Gayatri Pati',present:false},
      {roll:'302',name:'Gaurav Patra',present:false},
      {roll:'303',name:'Ayush Guharay',present:false},
      {roll:'304',name:'Anup Mohanty',present:false},
      {roll:'305',name:'Adil Khan',present:false},
      {roll:'306',name:'Anurag Mohanty',present:false},
      {roll:'307',name:'Debashis Tripathy',present:false},
      {roll:'308',name:'Safaq Jamal',present:false},
      {roll:'309',name:'Sohan Mohanty',present:false},
      {roll:'310',name:'Hrushikesh Pattnaik',present:false}
    ],

    D:[
      {roll:'401',name:'Chandan Kumar Sahu',present:false},
      {roll:'402',name:'Sitikantha Dalal',present:false},
      {roll:'403',name:'Titiksha Sahu',present:false},
      {roll:'404',name:'Anjali Sahoo',present:false},
      {roll:'405',name:'Sushree Sangita Sethi',present:false},
      {roll:'406',name:'Mama Bisoi',present:false},
      {roll:'407',name:'Tanmay Sahu',present:false},
      {roll:'408',name:'Pratik Parag Pani',present:false},
      {roll:'409',name:'Ranit Das',present:false},
      {roll:'410',name:'Shobha Kumari',present:false},
      {roll:'411',name:'CS Vishal Rout',present:false}
    ],

    E:[
      {roll:'501',name:'Rajesh Behera',present:false},
      {roll:'502',name:'Maniket Padhan',present:false},
      {roll:'503',name:'Jeevan Jyoti Panigrahi',present:false},
      {roll:'504',name:'Ayush Mishra',present:false},
      {roll:'505',name:'Mohit Singal',present:false},
      {roll:'506',name:'Dhiraj Mahapatra',present:false},
      {roll:'507',name:'Swayam Sahu',present:false},
      {roll:'508',name:'Subhashree Mohapatra',present:false},
      {roll:'509',name:'Subhalaxmi Sahoo',present:false}
    ],

    F:[
      {roll:'601',name:'Rajshree Panda',present:false},
      {roll:'602',name:'Soumyashree Panda',present:false},
      {roll:'603',name:'Rupali Jena',present:false},
      {roll:'604',name:'Lipsa Panda',present:false},
      {roll:'605',name:'Shrestha Mohanty',present:false},
      {roll:'606',name:'Sukanya Subhadarshini',present:false},
      {roll:'607',name:'Anjali Mishra',present:false},
      {roll:'608',name:'Prachi Pratyasha Das',present:false},
      {roll:'609',name:'Nirmit Nayak',present:false},
      {roll:'610',name:'Padmalaya Meher',present:false}
    ],

    G:[
      {roll:'701',name:'Shubham Kumar',present:false},
      {roll:'702',name:'Yash Kumar',present:false},
      {roll:'703',name:'Saswat Rout',present:false},
      {roll:'704',name:'Adarsh Kumar',present:false},
      {roll:'705',name:'Amit Kumar Yash',present:false},
      {roll:'706',name:'C H Tanisha',present:false},
      {roll:'707',name:'Pratikshya Acharya',present:false},
      {roll:'708',name:'Mahesh Dakua',present:false},
      {roll:'709',name:'Anil Kumar Nayak',present:false},
      {roll:'710',name:'Khushisahu',present:false},
      {roll:'711',name:'Swarna Sharma',present:false}
    ]
  };

  get students() {
    return this.groups[this.selectedGroup].filter(
      (s:any) =>
        s.name.toLowerCase().includes(
          this.searchText.toLowerCase()
        )
    );
  }

  get totalStudents() {
    return this.students.length;
  }

  get presentCount() {
    return this.students.filter((s:any)=>s.present).length;
  }

  get absentCount() {
    return this.totalStudents - this.presentCount;
  }

  get attendancePercent() {
    if(this.totalStudents === 0) return 0;
    return Math.round(
      (this.presentCount / this.totalStudents) * 100
    );
  }

  addStudent() {

    if(this.newStudent.trim()) {

      this.groups[this.selectedGroup].push({
        roll: Date.now().toString(),
        name: this.newStudent,
        present: false
      });

      this.newStudent = '';
    }
  }

  deleteStudent(roll:string) {

    this.groups[this.selectedGroup] =
      this.groups[this.selectedGroup].filter(
        (s:any) => s.roll !== roll
      );
  }

  saveAttendance() {
    alert(this.selectedGroup + ' Attendance Saved Successfully');
  }
}
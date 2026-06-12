import { Component } from '@angular/core';

@Component({
  selector: 'app-member4attmng',
  templateUrl: './member4attmng.component.html',
  styleUrls: ['./member4attmng.component.css']
})
export class Member4attmngComponent {
  groups = [
  {
    groupName: 'A',
    students: [
      'Soyngsruti Jena',
      'Swagat Das',
      'Samikshya Samadarshini',
      'Archana Devi',
      'Roshan Mishra',
      'Satyabrat Sarangi',
      'Priyanshu Sekhar',
      'Ankit Prasad',
      'Ronit Kumar Swain'
    ]
  },

  {
    groupName: 'B',
    students: [
      'Jagannath Padhi',
      'Rohan Kumar Nayak',
      'Tushar Ranjan Muduli',
      'Snehasis Das',
      'Omkar Sahoo',
      'Motilal Turuk'
    ]
  },

  {
    groupName: 'C',
    students: [
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
    ]
  },

  {
    groupName: 'D',
    students: [
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
    ]
  },

  {
    groupName: 'E',
    students: [
      'Rajesh Behera',
      'Maniket Padhan',
      'Jeevan Jyoti Panigrahi',
      'Ayush Mishra',
      'Mohit Singal',
      'Dhiraj Mahapatra',
      'Swayam Sahu',
      'Subhashree Mohapatra',
      'Subhalaxmi Sahoo'
    ]
  },

  {
    groupName: 'F',
    students: [
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
    ]
  },

  {
    groupName: 'G',
    students: [
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
  }
];
selectedGroup: any = null;

toggleGroup(group: any) {

  if (this.selectedGroup === group) {
    this.selectedGroup = null;
  } else {
    this.selectedGroup = group;
  }

}
selectedDate: string = '';
attendanceData: any = {};
markAttendance(student: string,event:any){

  if(!this.attendanceData[this.selectedDate]){
    this.attendanceData[this.selectedDate] = {};
  }

  this.attendanceData[this.selectedDate][student]
    = event.target.checked;
}
ngOnInit(){

  const data = localStorage.getItem('attendance');

  if(data){
    this.attendanceData = JSON.parse(data);
  }

}
isFutureDate(): boolean {

  const today = new Date();

  const selected =
    new Date(this.selectedDate);

  return selected > today;

}
newStudent: string = '';
addStudent() {
  if (this.newStudent.trim()) {
    this.selectedGroup.students.push(this.newStudent.trim());
    this.newStudent = '';
  }
}

deleteStudent(student: string) {
  const index = this.selectedGroup.students.indexOf(student);

  if (index > -1) {
    this.selectedGroup.students.splice(index, 1);
  }
}
saveAttendance() {
  if (!this.selectedDate) {
    alert('Please select a date first');
    return;
  }

  localStorage.setItem(
    'attendance',
    JSON.stringify(this.attendanceData)
  );

  alert('Attendance saved successfully');
}
getPresentCount(): number {

  if (!this.selectedDate ||
      !this.attendanceData[this.selectedDate] ||
      !this.selectedGroup) {

    return 0;
  }

  let count = 0;

  this.selectedGroup.students.forEach((student: string) => {

    if (this.attendanceData[this.selectedDate][student]) {
      count++;
    }

  });

  return count;
}
getAttendancePercentage(): number {

  if (!this.selectedGroup ||
      this.selectedGroup.students.length === 0) {

    return 0;
  }

  const percentage =
    (this.getPresentCount() /
    this.selectedGroup.students.length) * 100;

  return Math.round(percentage);
}
}

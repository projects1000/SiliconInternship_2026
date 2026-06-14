import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-member8-attendance',
  templateUrl: './member8-attendance.component.html',
  styleUrls: ['./member8-attendance.component.css']
})
export class Member8AttendanceComponent implements OnInit{

  attendanceLocked = false;
  isAdmin = true;

  teams = [
  {
    name: 'Team A',
    expanded: true,
    members: [
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
    name: 'Team B',
    expanded: false,
    members: [
      'Jagannath Padhi',
      'Rohan Kumar Nayak',
      'Tushar Ranjan Muduli',
      'Snehasis Das',
      'Omkar Sahoo',
      'Motilal Turuk'
    ]
  },

  {
    name: 'Team C',
    expanded: false,
    members: [
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
    name: 'Team D',
    expanded: false,
    members: [
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
    name: 'Team E',
    expanded: false,
    members: [
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
    name: 'Team F',
    expanded: false,
    members: [
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
    name: 'Team G',
    expanded: false,
    members: [
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
 students = [

  // Team A
  { name: 'Soyngsruti Jena', team: 'Team A', attendance: {} as { [key:string]: boolean } },
  { name: 'Swagat Das', team: 'Team A', attendance: {} as { [key:string]: boolean } },
  { name: 'Samikshya Samadarshini', team: 'Team A', attendance: {} as { [key:string]: boolean } },
  { name: 'Archana Devi', team: 'Team A', attendance: {} as { [key:string]: boolean } },
  { name: 'Roshan Mishra', team: 'Team A', attendance: {} as { [key:string]: boolean } },
  { name: 'Satyabrat Sarangi', team: 'Team A', attendance: {} as { [key:string]: boolean } },
  { name: 'Priyanshu Sekhar', team: 'Team A', attendance: {} as { [key:string]: boolean } },
  { name: 'Ankit Prasad', team: 'Team A', attendance: {} as { [key:string]: boolean } },
  { name: 'Ronit Kumar Swain', team: 'Team A', attendance: {} as { [key:string]: boolean } },

  // Team B
  { name: 'Jagannath Padhi', team: 'Team B', attendance: {} as { [key:string]: boolean } },
  { name: 'Rohan Kumar Nayak', team: 'Team B', attendance: {} as { [key:string]: boolean } },
  { name: 'Tushar Ranjan Muduli', team: 'Team B', attendance: {} as { [key:string]: boolean } },
  { name: 'Snehasis Das', team: 'Team B', attendance: {} as { [key:string]: boolean } },
  { name: 'Omkar Sahoo', team: 'Team B', attendance: {} as { [key:string]: boolean } },
  { name: 'Motilal Turuk', team: 'Team B', attendance: {} as { [key:string]: boolean } },

  // Team C
  { name: 'Gayatri Pati', team: 'Team C', attendance: {} as { [key:string]: boolean } },
  { name: 'Gaurav Patra', team: 'Team C', attendance: {} as { [key:string]: boolean } },
  { name: 'Ayush Guharay', team: 'Team C', attendance: {} as { [key:string]: boolean } },
  { name: 'Anup Mohanty', team: 'Team C', attendance: {} as { [key:string]: boolean } },
  { name: 'Adil Khan', team: 'Team C', attendance: {} as { [key:string]: boolean } },
  { name: 'Anurag Mohanty', team: 'Team C', attendance: {} as { [key:string]: boolean } },
  { name: 'Debashis Tripathy', team: 'Team C', attendance: {} as { [key:string]: boolean } },
  { name: 'Safaq Jamal', team: 'Team C', attendance: {} as { [key:string]: boolean } },
  { name: 'Sohan Mohanty', team: 'Team C', attendance: {} as { [key:string]: boolean } },
  { name: 'Hrushikesh Pattnaik', team: 'Team C', attendance: {} as { [key:string]: boolean } },

  // Team D
  { name: 'Chandan Kumar Sahu', team: 'Team D', attendance: {} as { [key:string]: boolean } },
  { name: 'Sitikantha Dalal', team: 'Team D', attendance: {} as { [key:string]: boolean } },
  { name: 'Titiksha Sahu', team: 'Team D', attendance: {} as { [key:string]: boolean } },
  { name: 'Anjali Sahoo', team: 'Team D', attendance: {} as { [key:string]: boolean } },
  { name: 'Sushree Sangita Sethi', team: 'Team D', attendance: {} as { [key:string]: boolean } },
  { name: 'Mama Bisoi', team: 'Team D', attendance: {} as { [key:string]: boolean } },
  { name: 'Tanmay Sahu', team: 'Team D', attendance: {} as { [key:string]: boolean } },
  { name: 'Pratik Parag Pani', team: 'Team D', attendance: {} as { [key:string]: boolean } },
  { name: 'Ranit Das', team: 'Team D', attendance: {} as { [key:string]: boolean } },
  { name: 'Shobha Kumari', team: 'Team D', attendance: {} as { [key:string]: boolean } },
  { name: 'CS Vishal Rout', team: 'Team D', attendance: {} as { [key:string]: boolean } },

  // Team E
  { name: 'Rajesh Behera', team: 'Team E', attendance: {} as { [key:string]: boolean } },
  { name: 'Maniket Padhan', team: 'Team E', attendance: {} as { [key:string]: boolean } },
  { name: 'Jeevan Jyoti Panigrahi', team: 'Team E', attendance: {} as { [key:string]: boolean } },
  { name: 'Ayush Mishra', team: 'Team E', attendance: {} as { [key:string]: boolean } },
  { name: 'Mohit Singal', team: 'Team E', attendance: {} as { [key:string]: boolean } },
  { name: 'Dhiraj Mahapatra', team: 'Team E', attendance: {} as { [key:string]: boolean } },
  { name: 'Swayam Sahu', team: 'Team E', attendance: {} as { [key:string]: boolean } },
  { name: 'Subhashree Mohapatra', team: 'Team E', attendance: {} as { [key:string]: boolean } },
  { name: 'Subhalaxmi Sahoo', team: 'Team E', attendance: {} as { [key:string]: boolean } },

  // Team F
  { name: 'Rajshree Panda', team: 'Team F', attendance: {} as { [key:string]: boolean } },
  { name: 'Soumyashree Panda', team: 'Team F', attendance: {} as { [key:string]: boolean } },
  { name: 'Rupali Jena', team: 'Team F', attendance: {} as { [key:string]: boolean } },
  { name: 'Lipsa Panda', team: 'Team F', attendance: {} as { [key:string]: boolean } },
  { name: 'Shreshtha Mohanty', team: 'Team F', attendance: {} as { [key:string]: boolean } },
  { name: 'Sukanya Subhadarshini', team: 'Team F', attendance: {} as { [key:string]: boolean } },
  { name: 'Anjali Mishra', team: 'Team F', attendance: {} as { [key:string]: boolean } },
  { name: 'Prachi Pratyasha Das', team: 'Team F', attendance: {} as { [key:string]: boolean } },
  { name: 'Nirmit Nayak', team: 'Team F', attendance: {} as { [key:string]: boolean } },
  { name: 'Padmalaya Meher', team: 'Team F', attendance: {} as { [key:string]: boolean } },

  // Team G
  { name: 'Shubham Kumar', team: 'Team G', attendance: {} as { [key:string]: boolean } },
  { name: 'Yash Kumar', team: 'Team G', attendance: {} as { [key:string]: boolean } },
  { name: 'Sasawat Rout', team: 'Team G', attendance: {} as { [key:string]: boolean } },
  { name: 'Adarsh Kumar', team: 'Team G', attendance: {} as { [key:string]: boolean } },
  { name: 'Amit Kumar Yash', team: 'Team G', attendance: {} as { [key:string]: boolean } },
  { name: 'C H Tanisha', team: 'Team G', attendance: {} as { [key:string]: boolean } },
  { name: 'Pratikshya Acharya', team: 'Team G', attendance: {} as { [key:string]: boolean } },
  { name: 'Mahesh Dakua', team: 'Team G', attendance: {} as { [key:string]: boolean } },
  { name: 'Anil Kumar Nayak', team: 'Team G', attendance: {} as { [key:string]: boolean } },
  { name: 'Khushi Sahu', team: 'Team G', attendance: {} as { [key:string]: boolean } }

];

  toggleTeam(team: any) {
    team.expanded = !team.expanded;
  }

  toggleLock() {
  this.attendanceLocked =
    !this.attendanceLocked;
}

  get totalStudents() {
    return this.students.length;
  }

  get presentCount() {
  return this.students.filter(
    student => (student.attendance as any)[this.selectedDate]
  ).length;

}
  get absentCount() {
    return this.totalStudents - this.presentCount;
  }

  get attendanceRate() {
    if (this.totalStudents === 0) {
      return 0;
    }

    return Math.round(
      (this.presentCount / this.totalStudents) * 100
    );
  }
  searchText = '';
  get filteredStudents() {

  let filtered =
    this.students.filter(student =>
      student.name
      .toLowerCase()
      .includes(
        this.searchText.toLowerCase()
      )
    );

  if(this.selectedTeam !== 'All'){

    filtered =
      filtered.filter(
        student =>
        student.team ===
        this.selectedTeam
      );

  }

  if(this.cardFilter === 'present'){

    filtered =
      filtered.filter(
        student =>
        this.getAttendance(student)
      );

  }

  if(this.cardFilter === 'absent'){

    filtered =
      filtered.filter(
        student =>
        !this.getAttendance(student)
      );

  }

  return filtered;

}
newStudentName = '';
newStudentTeam = '';
addStudent() {

  if(
    this.newStudentName.trim() &&
    this.newStudentTeam.trim()
  )
  
  {
    const studentExists = this.students.some(
  student =>
    student.name.toLowerCase() ===
    this.newStudentName.toLowerCase()
);

if(studentExists){

  this.message =
    '⚠ Student already exists!';

  setTimeout(() => {
    this.message = '';
  }, 3000);

  return;
}
    this.students.push({

      name: this.newStudentName,

      team: this.newStudentTeam,

      attendance: {} as { [key:string]: boolean }

    });

    const team = this.teams.find(
      t => t.name === this.newStudentTeam
    );

    if(team){

      team.members.push(
        this.newStudentName
      );

    }

    this.saveData();

    this.newStudentName = '';

    this.newStudentTeam = '';

  }
   this.message = '✅ Student added successfully!';
   setTimeout(() => {
    this.message = '';}, 3000);
}
deleteStudent(student: any) {

  this.students = this.students.filter(
    s => s !== student
  );

  const team = this.teams.find(
    t => t.name === student.team
  );

  if(team){

    team.members = team.members.filter(
      member => member !== student.name
    );

  }
  this.message = '🗑️ Student deleted successfully!';
   setTimeout(() => {
  this.message = '';}, 3000);
  this.saveData();
}
selectedDate = new Date().toISOString().split('T')[0];
today = new Date().toISOString().split('T')[0];

getAttendance(student: any): boolean {

  return student.attendance[this.selectedDate] || false;

}
toggleAttendance(student: any) {

  if (
    this.attendanceLocked ||
    !this.isTodaySelected
  ) {
    return;
  }

  student.attendance[this.selectedDate] =
    !student.attendance[this.selectedDate];

  this.saveData();
}
get isTodaySelected() {

  return this.selectedDate === this.today;

}
saveData() {

  localStorage.setItem(
    'attendanceStudents',
    JSON.stringify(this.students)
  );

}
ngOnInit() {

  const savedStudents =
    localStorage.getItem('attendanceStudents');

  if(savedStudents){

    this.students =
      JSON.parse(savedStudents);

    this.rebuildTeams();

  } else {

    this.saveData();

  }

}
rebuildTeams() {

  this.teams.forEach(team => {
    team.members = [];
  });

  this.students.forEach(student => {

    const team = this.teams.find(
      t => t.name === student.team
    );

    if(team){
      team.members.push(student.name);
    }

  });

}
getAttendancePercentage(student: any): number {

  const attendanceValues =
    Object.values(student.attendance);

  const totalDays =
    attendanceValues.length;

  if(totalDays === 0){
    return 0;
  }

  const presentDays =
    attendanceValues.filter(
      value => value === true
    ).length;

  return Math.round(
    (presentDays / totalDays) * 100
  );

}
selectedTeam = 'All';
message = '';
saveAttendance() {

  this.saveData();

  this.message = '✅ Attendance saved successfully!';

  setTimeout(() => {

    this.message = '';

  }, 3000);

}
exportCSV() {

  let csv =
    'Name,Team,Attendance %\n';

  this.students.forEach(student => {

    csv +=
      `${student.name},
      ${student.team},
      ${this.getAttendancePercentage(student)}%\n`;

  });

  const blob =
    new Blob([csv], {type:'text/csv'});

  const url =
    window.URL.createObjectURL(blob);

  const a =
    document.createElement('a');

  a.href = url;

  a.download =
    'Attendance_Report.csv';

  a.click();

}
cardFilter = 'all';
showAllStudents() {
  this.cardFilter = 'all';
}

showPresentStudents() {
  this.cardFilter = 'present';
}

showAbsentStudents() {
  this.cardFilter = 'absent';
}

selectedStudent:any = null;
viewStudent(student:any){

  this.selectedStudent =
    student;

}
closePopup(){

  this.selectedStudent =
    null;

}
}
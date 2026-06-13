import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
selector: 'app-attendance-table',
templateUrl: './attendance-table.component.html',
styleUrls: ['./attendance-table.component.css']
})
export class AttendanceTableComponent implements OnInit {

@Input() selectedGroup: string = 'Group A';

@Output()
attendanceSaved = new EventEmitter();

selectedDate = '';

searchText = '';

groupStudents: any = {

'Group A': [
  { roll: 101, name: 'Soyngsruti', present: false },
  { roll: 102, name: 'Swagat', present: false },
  { roll: 103, name: 'Samikshya', present: false },
  { roll: 104, name: 'Archana', present: false },
  { roll: 105, name: 'Roshan Mishra', present: false },
  { roll: 106, name: 'Satyabrat', present: false },
  { roll: 107, name: 'Priyanshu Sekhar Badhei', present: false },
  { roll: 108, name: 'Ankit', present: false },
  { roll: 109, name: 'Ronit', present: false }
],

'Group B': [
  { roll: 201, name: 'Jagannath Padhi', present: false },
  { roll: 202, name: 'Roshan Kumar Nayak', present: false },
  { roll: 203, name: 'Tushar Ranjan Muduli', present: false },
  { roll: 204, name: 'Snehasis Das', present: false },
  { roll: 205, name: 'Omkar Sahoo', present: false },
  { roll: 206, name: 'Motilal Turuk', present: false }
],

'Group C': [
  { roll: 301, name: 'Gayatri Pati', present: false },
  { roll: 302, name: 'Gaurav Patra', present: false },
  { roll: 303, name: 'Ayush Guharay', present: false },
  { roll: 304, name: 'Anup Mohanty', present: false },
  { roll: 305, name: 'Adil Khan', present: false },
  { roll: 306, name: 'Anurag Mohanty', present: false },
  { roll: 307, name: 'Debashis Tripathy', present: false },
  { roll: 308, name: 'Safaq Jamal', present: false },
  { roll: 309, name: 'Sohan Mohanty', present: false },
  { roll: 310, name: 'Hrushikesh Pattnaik', present: false }
],

'Group F': [
  { roll: 601, name: 'Rajshree Panda', present: false },
  { roll: 602, name: 'Soumyashree Panda', present: false },
  { roll: 603, name: 'Rupali Jena', present: false },
  { roll: 604, name: 'Lipsa Panda', present: false },
  { roll: 605, name: 'Shreshtha Mohanty', present: false },
  { roll: 606, name: 'Sukanya Subhadarshini', present: false },
  { roll: 607, name: 'Anjali Mishra', present: false },
  { roll: 608, name: 'Prachi Pratyasha Das', present: false },
  { roll: 609, name: 'Nirmit Nayak', present: false },
  { roll: 610, name: 'Padmalaya Meher', present: false }
],

'Group E': [
  { roll: 501, name: 'Rajesh Behera', present: false },
  { roll: 502, name: 'Maniket Padhan', present: false },
  { roll: 503, name: 'Jeevan Jyoti Panigrahi', present: false },
  { roll: 504, name: 'Ayush Mishra', present: false },
  { roll: 505, name: 'Mohit Singal', present: false },
  { roll: 506, name: 'Dhiraj Mahapatra', present: false },
  { roll: 507, name: 'Swayam Sahu', present: false },
  { roll: 508, name: 'Subhashree Mohapatra', present: false },
  { roll: 509, name: 'Subhalaxmi Sahoo', present: false }
]

};

ngOnInit() {

const savedData =
  localStorage.getItem('attendanceData');

if (savedData) {

  this.groupStudents =
    JSON.parse(savedData);

}

}

saveToLocalStorage() {

localStorage.setItem(
  'attendanceData',
  JSON.stringify(this.groupStudents)
);

}

get students() {
return this.groupStudents[this.selectedGroup] || [];
}

filteredStudents() {

return this.students.filter((student: any) =>
  student.name
    .toLowerCase()
    .includes(this.searchText.toLowerCase())
);

}

getPresentCount() {

return this.students.filter(
  (student: any) => student.present
).length;

}

getAbsentCount() {

return this.students.length -
  this.getPresentCount();

}

getAttendancePercentage() {

if (this.students.length === 0) {
  return 0;
}

return Math.round(
  (this.getPresentCount() /
    this.students.length) * 100
);

}

saveAttendance() {

this.attendanceSaved.emit({

  presentCount: this.getPresentCount(),

  absentCount: this.getAbsentCount(),

  attendancePercentage: this.getAttendancePercentage(),

  totalStudents: this.students.length

});

this.saveToLocalStorage();

alert(
  `${this.selectedGroup} Attendance Saved Successfully`
);

}

deleteStudent(student: any) {

const currentGroup =
  this.groupStudents[this.selectedGroup];

const index =
  currentGroup.indexOf(student);

if (index > -1) {

  currentGroup.splice(index, 1);

  this.saveToLocalStorage();

}

}

addStudentToGroup(group: string, studentName: string) {

const students = this.groupStudents[group];

if (!students) {
  return;
}

const newRoll =
  students.length > 0
    ? students[students.length - 1].roll + 1
    : 100;

students.push({
  roll: newRoll,
  name: studentName,
  present: false
});

this.saveToLocalStorage();

}

}
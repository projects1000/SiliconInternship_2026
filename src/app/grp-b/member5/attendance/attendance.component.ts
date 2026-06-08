import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {

  attendanceDate = '';

  selectedGroup = '';

  searchText = '';

  locked = false;

  showMessage = false;

  studentName = '';

  studentGroup = '';

  students = [

    { group:'A', name:'Soyngsruti Jena', status:'' },
    { group:'A', name:'Swagat Das', status:'' },
    { group:'A', name:'Samikshya Samadarshini', status:'' },
    { group:'A', name:'Archana Devi', status:'' },
    { group:'A', name:'Roshan Mishra', status:'' },
    { group:'A', name:'Satyabrat Sarangi', status:'' },
    { group:'A', name:'Priyanshu Sekhar', status:'' },
    { group:'A', name:'Ankit Prasad', status:'' },
    { group:'A', name:'Ronit Kumar Swain', status:'' },

    { group:'B', name:'Jagannath Padhi', status:'' },
    { group:'B', name:'Rohan Kumar Nayak', status:'' },
    { group:'B', name:'Tushar Ranjan Muduli', status:'' },
    { group:'B', name:'Snehasis Das', status:'' },
    { group:'B', name:'Omkar Sahoo', status:'' },
    { group:'B', name:'Motilal Turuk', status:'' },

    { group:'C', name:'Gayatri Pati', status:'' },
    { group:'C', name:'Gaurav Patra', status:'' },
    { group:'C', name:'Ayush Guharay', status:'' },
    { group:'C', name:'Anup Mohanty', status:'' },
    { group:'C', name:'Adil Khan', status:'' },
    { group:'C', name:'Anurag Mohanty', status:'' },
    { group:'C', name:'Debashis Tripathy', status:'' },
    { group:'C', name:'Safaq Jamal', status:'' },
    { group:'C', name:'Sohan Mohanty', status:'' },
    { group:'C', name:'Hrushikesh Pattnaik', status:'' },

    { group:'D', name:'Chandan Kumar Sahu', status:'' },
    { group:'D', name:'Sitikantha Dalal', status:'' },
    { group:'D', name:'Titiksha Sahu', status:'' },
    { group:'D', name:'Anjali Sahoo', status:'' },
    { group:'D', name:'Sushree Sangita Sethi', status:'' },
    { group:'D', name:'Mama Bisoi', status:'' },
    { group:'D', name:'Tanmay Sahu', status:'' },
    { group:'D', name:'Pratik Parag Pani', status:'' },
    { group:'D', name:'Ranit Das', status:'' },
    { group:'D', name:'Shobha Kumari', status:'' },
    { group:'D', name:'CS Vishal Rout', status:'' },

    { group:'E', name:'Rajesh Behera', status:'' },
    { group:'E', name:'Maniket Padhan', status:'' },
    { group:'E', name:'Jeevan Jyoti Panigrahi', status:'' },
    { group:'E', name:'Ayush Mishra', status:'' },
    { group:'E', name:'Mohit Singal', status:'' },
    { group:'E', name:'Dhiraj Mahapatra', status:'' },
    { group:'E', name:'Swayam Sahu', status:'' },
    { group:'E', name:'Subhashree Mohapatra', status:'' },
    { group:'E', name:'Subhalaxmi Sahoo', status:'' },

    { group:'F', name:'Rajshree Panda', status:'' },
    { group:'F', name:'Soumyashree Panda', status:'' },
    { group:'F', name:'Rupali Jena', status:'' },
    { group:'F', name:'Lipsa Panda', status:'' },
    { group:'F', name:'Shreshtha Mohanty', status:'' },
    { group:'F', name:'Sukanya Subhadarshini', status:'' },
    { group:'F', name:'Anjali Mishra', status:'' },
    { group:'F', name:'Prachi Pratyasha Das', status:'' },
    { group:'F', name:'Nirmit Nayak', status:'' },
    { group:'F', name:'Padmalaya Meher', status:'' },

    { group:'G', name:'Shubham Kumar', status:'' },
    { group:'G', name:'Yash Kumar', status:'' },
    { group:'G', name:'Sasawat Rout', status:'' },
    { group:'G', name:'Adarsh Kumar', status:'' },
    { group:'G', name:'Amit Kumar Yash', status:'' },
    { group:'G', name:'C H Tanisha', status:'' },
    { group:'G', name:'Pratikshya Acharya', status:'' },
    { group:'G', name:'Mahesh Dakua', status:'' },
    { group:'G', name:'Anil Kumar Nayak', status:'' },
    { group:'G', name:'Khushi Sahu', status:'' }

  ];

  get filteredStudents() {

    return this.students.filter(student => {

      const groupMatch =
        !this.selectedGroup ||
        student.group === this.selectedGroup;

      const searchMatch =
        student.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase());

      return groupMatch && searchMatch;

    });

  }

  markPresent(student:any) {

    if (!this.locked) {
      student.status = 'Present';
    }

  }

  markAbsent(student:any) {

    if (!this.locked) {
      student.status = 'Absent';
    }

  }

  markAttendanceBySearch(status:string) {

    const student = this.students.find(
      x =>
        x.name.toLowerCase() ===
        this.searchText.toLowerCase()
    );

    if (student && !this.locked) {
      student.status = status;
    }

  }

  lockAttendance() {

    this.locked = true;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 4000);

    alert('✅ Attendance Submitted Successfully For Today');

  }

  addStudent() {

    if (this.studentName && this.studentGroup) {

      this.students.push({
        group: this.studentGroup,
        name: this.studentName,
        status: ''
      });

      this.studentName = '';
      this.studentGroup = '';
    }

  }

  deleteStudent() {

    this.students = this.students.filter(
      student =>
        student.name.toLowerCase() !==
        this.studentName.toLowerCase()
    );

    this.studentName = '';

  }

}
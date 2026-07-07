import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance-table',
  templateUrl: './attendance-table.component.html',
  styleUrls: ['./attendance-table.component.css']
})
export class AttendanceTableComponent {

  selectedDate = new Date().toISOString().split('T')[0];
  todayDate = new Date().toISOString().split('T')[0];
  searchText = '';
  selectedMember = '';
  getFilteredAttendance() {

  if (!this.searchText) {
    return this.attendanceData;
  }

  return this.attendanceData.filter(member =>
    member.name.toLowerCase()
      .includes(this.searchText.toLowerCase())
  );

}
getDisplayedAttendance() {

  let filteredData =
    this.attendanceData;

  if(this.selectedMember){

    filteredData =
      filteredData.filter(

        member =>

          member.name ===
          this.selectedMember

      );

  }

  if(this.searchText){

    filteredData =
      filteredData.filter(

        member =>

          member.name
            .toLowerCase()

            .includes(

              this.searchText
                .toLowerCase()

            )

      );

  }

  return filteredData;

}
totalMembers = 0;

presentCount = 0;

attendanceRate = 0;
calculateStats() {

  this.totalMembers =
    this.attendanceData.length;

  this.presentCount =

    this.attendanceData.filter(

      member => member.present

    ).length;

  this.attendanceRate =

    this.totalMembers > 0

      ? Math.round(

          (this.presentCount /
          this.totalMembers) * 100

        )

      : 0;

}
lockedDates: string[] = [];

  attendanceData = [

  // Group A
  { name: 'Soyngsruti Jena', present: false },
  { name: 'Swagat Das', present: false },
  { name: 'Samikshya Samadarshini', present: false },
  { name: 'Archana Devi', present: false },
  { name: 'Roshan Mishra', present: false },
  { name: 'Satyabrat Sarangi', present: false },
  { name: 'Priyanshu Sekhar', present: false },
  { name: 'Ankit Prasad', present: false },
  { name: 'Ronit Kumar Swain', present: false },

  // Group B
  { name: 'Jagannath Padhi', present: false },
  { name: 'Rohan Kumar Nayak', present: false },
  { name: 'Tushar Ranjan Muduli', present: false },
  { name: 'Snehasis Das', present: false },
  { name: 'Omkar Sahoo', present: false },
  { name: 'Motilal Turuk', present: false },

  // Group C
  { name: 'Gayatri Pati', present: false },
  { name: 'Gaurav Patra', present: false },
  { name: 'Ayush Guharay', present: false },
  { name: 'Anup Mohanty', present: false },
  { name: 'Adil Khan', present: false },
  { name: 'Anurag Mohanty', present: false },
  { name: 'Debashis Tripathy', present: false },
  { name: 'Safaq Jamal', present: false },
  { name: 'Sohan Mohanty', present: false },
  { name: 'Hrushikesh Pattnaik', present: false },

  // Group D
  { name: 'Chandan Kumar Sahu', present: false },
  { name: 'Sitikantha Dalal', present: false },
  { name: 'Titiksha Sahu', present: false },
  { name: 'Anjali Sahoo', present: false },
  { name: 'Sushree Sangita Sethi', present: false },
  { name: 'Mama Bisoi', present: false },
  { name: 'Tanmay Sahu', present: false },
  { name: 'Pratik Parag Pani', present: false },
  { name: 'Ranit Das', present: false },
  { name: 'Shobha Kumari', present: false },
  { name: 'CS Vishal Rout', present: false },

  // Group E
  { name: 'Rajesh Behera', present: false },
  { name: 'Maniket Padhan', present: false },
  { name: 'Jeevan Jyoti Panigrahi', present: false },
  { name: 'Ayush Mishra', present: false },
  { name: 'Mohit Singal', present: false },
  { name: 'Dhiraj Mahapatra', present: false },
  { name: 'Swayam Sahu', present: false },
  { name: 'Subhashree Mohapatra', present: false },
  { name: 'Subhalaxmi Sahoo', present: false },

  // Group F
  { name: 'Rajshree Panda', present: false },
  { name: 'Soumyashree Panda', present: false },
  { name: 'Rupali Jena', present: false },
  { name: 'Lipsa Panda', present: false },
  { name: 'Shrestha Mohanty', present: false },
  { name: 'Sukanya Subhadarshini', present: false },
  { name: 'Anjali Mishra', present: false },
  { name: 'Prachi Pratyasha Das', present: false },
  { name: 'Nirmit Nayak', present: false },
  { name: 'Padmalaya Meher', present: false },

  // Group G
  { name: 'Shubham Kumar', present: false },
  { name: 'Yash Kumar', present: false },
  { name: 'Sasawat Rout', present: false },
  { name: 'Adarsh Kumar', present: false },
  { name: 'Amit Kumar Yash', present: false },
  { name: 'C H Tanisha', present: false },
  { name: 'Pratikshya Acharya', present: false },
  { name: 'Mahesh Dakua', present: false },
  { name: 'Anil Kumar Nayak', present: false },
  { name: 'Khushisahu', present: false },
  { name: 'Swarna Sharma', present: false }

];
 

constructor() {
   

  const savedLockedDates =
    localStorage.getItem('lockedDates');

  if(savedLockedDates){

    this.lockedDates =
      JSON.parse(savedLockedDates);

  }

  const savedDate =
    localStorage.getItem('selectedDate');

  if(savedDate){

    this.selectedDate =
      savedDate;

  }

 

  window.addEventListener(
  'memberSelected',
  () => {

    this.selectedMember =
      localStorage.getItem(
        'selectedMember'
      ) || '';
          this.loadAttendanceForDate();

  }
);

  window.addEventListener(
    'dateSelected',
    () => {

      const date =
        localStorage.getItem(
          'selectedDate'
        );

      if(date){

        this.selectedDate = date;

        this.loadAttendanceForDate();

      }

    }
  );

  this.loadAttendanceForDate();

}
saveAttendance() {

  localStorage.setItem(

    `attendance-${this.selectedDate}`,

    JSON.stringify(
      this.attendanceData
    )

  );

  this.calculateStats();

  alert(
    'Attendance Saved Successfully'
  );

}
  loadAttendanceForDate() {

  const data =

    localStorage.getItem(

      `attendance-${this.selectedDate}`

    );

  if(data){

    this.attendanceData =

      JSON.parse(data);

  }

  this.calculateStats();

}

isDateLocked(): boolean {

  return this.lockedDates.includes(
    this.selectedDate
  );

}
lockAttendance() {

  if(this.isDateLocked()){

    alert(
      'Attendance already locked'
    );

    return;

  }

  localStorage.setItem(

    `attendance-${this.selectedDate}`,

    JSON.stringify(
      this.attendanceData
    )

  );

  this.lockedDates.push(
    this.selectedDate
  );

  localStorage.setItem(

    'lockedDates',

    JSON.stringify(
      this.lockedDates
    )

  );

  alert(
    'Attendance Locked Successfully'
  );

}
isFutureDate(): boolean {

  return new Date(
    this.selectedDate
  ) > new Date();

}
markAllPresent() {

  this.attendanceData.forEach(
    member => {

      member.present = true;

    }
  );

  this.calculateStats();

}
markAllAbsent() {

  this.attendanceData.forEach(
    member => {

      member.present = false;

    }
  );

  this.calculateStats();

}
toggleAttendance() {

  this.attendanceData.forEach(
    member => {

      member.present =
        !member.present;

    }
  );

  this.calculateStats();

}
}
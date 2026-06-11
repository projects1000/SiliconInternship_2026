import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  totalStudents = 65;
  

  searchText: string = '';
  selectedGroup = 'All';
  students: any[] = [

{ name:'Soyngsruti Jena', group:'A', presentDays:28, attendance:93, status:'Present' },
{ name:'Swagat Das', group:'A', presentDays:27, attendance:90, status:'Present' },
{ name:'Samikshya Samadarshini', group:'A', presentDays:29, attendance:97, status:'Present' },
{ name:'Archana Devi', group:'A', presentDays:26, attendance:87, status:'Absent' },
{ name:'Roshan Mishra', group:'A', presentDays:28, attendance:94, status:'Present' },
{ name:'Satyabrat Sarangi', group:'A', presentDays:27, attendance:91, status:'Present' },
{ name:'Priyanshu Sekhar', group:'A', presentDays:29, attendance:96, status:'Present' },
{ name:'Ankit Prasad', group:'A', presentDays:26, attendance:88, status:'Absent' },
{ name:'Ronit Kumar Swain', group:'A', presentDays:28, attendance:93, status:'Present' },

{ name:'Jagannath Padhi', group:'B', presentDays:29, attendance:98, status:'Present' },
{ name:'Rohan Kumar Nayak', group:'B', presentDays:28, attendance:94, status:'Present' },
{ name:'Tushar Ranjan Muduli', group:'B', presentDays:27, attendance:90, status:'Present' },
{ name:'Snehasis Das', group:'B', presentDays:26, attendance:87, status:'Absent' },
{ name:'Omkar Sahoo', group:'B', presentDays:28, attendance:93, status:'Present' },
{ name:'Motilal Turuk', group:'B', presentDays:27, attendance:91, status:'Present' },

{ name:'Gayatri Pati', group:'C', presentDays:29, attendance:97, status:'Present' },
{ name:'Gaurav Patra', group:'C', presentDays:28, attendance:94, status:'Present' },
{ name:'Ayush Guharay', group:'C', presentDays:27, attendance:90, status:'Present' },
{ name:'Anup Mohanty', group:'C', presentDays:28, attendance:93, status:'Present' },
{ name:'Adil Khan', group:'C', presentDays:26, attendance:87, status:'Absent' },
{ name:'Anurag Mohanty', group:'C', presentDays:29, attendance:98, status:'Present' },
{ name:'Debashis Tripathy', group:'C', presentDays:28, attendance:95, status:'Present' },
{ name:'Safaq Jamal', group:'C', presentDays:27, attendance:90, status:'Present' },
{ name:'Sohan Mohanty', group:'C', presentDays:28, attendance:94, status:'Present' },
{ name:'Hrushikesh Pattnaik', group:'C', presentDays:29, attendance:97, status:'Present' },

{ name:'Chandan Kumar Sahu', group:'D', presentDays:28, attendance:94, status:'Present' },
{ name:'Sitikantha Dalal', group:'D', presentDays:27, attendance:91, status:'Present' },
{ name:'Titiksha Sahu', group:'D', presentDays:29, attendance:98, status:'Present' },
{ name:'Anjali Sahoo', group:'D', presentDays:26, attendance:87, status:'Absent' },
{ name:'Sushree Sangita Sethi', group:'D', presentDays:28, attendance:94, status:'Present' },
{ name:'Mama Bisoi', group:'D', presentDays:27, attendance:90, status:'Present' },
{ name:'Tanmay Sahu', group:'D', presentDays:29, attendance:96, status:'Present' },
{ name:'Pratik Parag Pani', group:'D', presentDays:28, attendance:93, status:'Present' },
{ name:'Ranit Das', group:'D', presentDays:27, attendance:91, status:'Present' },
{ name:'Shobha Kumari', group:'D', presentDays:28, attendance:94, status:'Present' },
{ name:'CS Vishal Rout', group:'D', presentDays:29, attendance:97, status:'Present' },

{ name:'Rajesh Behera', group:'E', presentDays:28, attendance:93, status:'Present' },
{ name:'Maniket Padhan', group:'E', presentDays:27, attendance:90, status:'Present' },
{ name:'Jeevan Jyoti Panigrahi', group:'E', presentDays:29, attendance:97, status:'Present' },
{ name:'Ayush Mishra', group:'E', presentDays:28, attendance:94, status:'Present' },
{ name:'Mohit Singal', group:'E', presentDays:26, attendance:88, status:'Absent' },
{ name:'Dhiraj Mahapatra', group:'E', presentDays:28, attendance:93, status:'Present' },
{ name:'Swayam Sahu', group:'E', presentDays:29, attendance:96, status:'Present' },
{ name:'Subhashree Mohapatra', group:'E', presentDays:28, attendance:94, status:'Present' },
{ name:'Subhalaxmi Sahoo', group:'E', presentDays:27, attendance:91, status:'Present' },

{ name:'Rajshree Panda', group:'F', presentDays:29, attendance:98, status:'Present' },
{ name:'Soumyashree Panda', group:'F', presentDays:28, attendance:95, status:'Present' },
{ name:'Rupali Jena', group:'F', presentDays:27, attendance:90, status:'Present' },
{ name:'Lipsa Panda', group:'F', presentDays:28, attendance:94, status:'Present' },
{ name:'Shrestha Mohanty', group:'F', presentDays:29, attendance:97, status:'Present' },
{ name:'Sukanya Subhadarshini', group:'F', presentDays:28, attendance:94, status:'Present' },
{ name:'Anjali Mishra', group:'F', presentDays:27, attendance:91, status:'Present' },
{ name:'Prachi Pratyasha Das', group:'F', presentDays:28, attendance:93, status:'Present' },
{ name:'Nirmit Nayak', group:'F', presentDays:29, attendance:98, status:'Present' },
{ name:'Padmalaya Meher', group:'F', presentDays:27, attendance:90, status:'Present' },

{ name:'Shubham Kumar', group:'G', presentDays:29, attendance:98, status:'Present' },
{ name:'Yash Kumar', group:'G', presentDays:28, attendance:94, status:'Present' },
{ name:'Sasawat Rout', group:'G', presentDays:27, attendance:91, status:'Present' },
{ name:'Adarsh Kumar', group:'G', presentDays:29, attendance:97, status:'Present' },
{ name:'Amit Kumar Yash', group:'G', presentDays:28, attendance:93, status:'Present' },
{ name:'C H Tanisha', group:'G', presentDays:27, attendance:90, status:'Present' },
{ name:'Pratikshya Acharya', group:'G', presentDays:29, attendance:96, status:'Present' },
{ name:'Mahesh Dakua', group:'G', presentDays:28, attendance:94, status:'Present' },
{ name:'Anil Kumar Nayak', group:'G', presentDays:27, attendance:91, status:'Present' },
{ name:'Khushisa Sahu', group:'G', presentDays:28, attendance:93, status:'Present' },
{ name:'Swarna Sharma', group:'G', presentDays:29, attendance:97, status:'Present' }

];
attendanceHistory: any[] = [];
  selectedDate: string = new Date().toISOString().split('T')[0];

  get filteredStudents() {

  return this.students.filter(student => {

    const nameMatch =
      student.name
      .toLowerCase()
      .includes(this.searchText.toLowerCase());

    const groupMatch =
      this.selectedGroup === 'All' ||
      student.group === this.selectedGroup;

    return nameMatch && groupMatch;

  });

}

  get presentToday() {

  return this.students.filter(
    student => student.status === 'Present'
  ).length;

}

get absentToday() {

  return this.students.filter(
    student => student.status === 'Absent'
  ).length;

}

get attendancePercentage() {

  return Math.round(
    (this.presentToday / this.students.length) * 100
  );

}
showStudent(student: any) {

  alert(
    'Name: ' + student.name +
    '\nGroup: ' + student.group +
    '\nPresent Days: ' + student.presentDays +
    '\nAttendance: ' + student.attendance + '%' +
    '\nStatus: ' + student.status
  );

}
saveAttendance() {

  const record = {

    date: this.selectedDate,

    present: this.presentToday,

    absent: this.absentToday,

    percentage: this.attendancePercentage

  };

  this.attendanceHistory.push(record);

}

downloadPDF() {

  const pdf = new jsPDF();

  pdf.setFontSize(18);

  pdf.text('Attendance Report', 20, 20);

  pdf.setFontSize(12);

  let y = 40;

  this.students.forEach(student => {

    pdf.text(

      `${student.name} | Group ${student.group} | ${student.attendance}% | ${student.status}`,

      20,

      y

    );

    y += 10;

  });

  pdf.save('Attendance_Report.pdf');

}

downloadExcel() {

  const worksheet =
    XLSX.utils.json_to_sheet(this.students);

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    'Attendance'
  );

  XLSX.writeFile(
    workbook,
    'Attendance_Report.xlsx'
  );

}
workingDays = 30;
monthlyPresent = 26;
monthlyAbsent = 4;
monthlyPercentage = 87;
}
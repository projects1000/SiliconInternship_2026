import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { NestedTreeControl } from '@angular/cdk/tree';
import {
  MatTreeNestedDataSource
} from '@angular/material/tree';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
interface TreeNode {
  name: string;
  children?: TreeNode[];
}
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  treeControl =
    new NestedTreeControl<TreeNode>(
      node => node.children
    );

  treeDataSource =
    new MatTreeNestedDataSource<TreeNode>();

  treeData: TreeNode[] = [

    {
      name: 'Team A',
      children: [

        { name: 'Soyngsruti Jena' },
        { name: 'Swagat Das' },
        { name: 'Samikshya Samadarshini' },
        { name: 'Archana Devi' },
        { name: 'Roshan Mishra' },
        { name: 'Satyabrat Sarangi' },
        { name: 'Priyanshu Sekhar' },
        { name: 'Ankit Prasad' },
        { name: 'Ronit Kumar Swain' }

      ]
    },

    {
      name: 'Team B',
      children: [

        { name: 'Jagannath Padhi' },
        { name: 'Rohan Kumar Nayak' },
        { name: 'Tushar Ranjan Muduli' },
        { name: 'Snehasis Das' },
        { name: 'Omkar Sahoo' },
        { name: 'Motilal Turuk' }

      ]
    },

    {
      name: 'Team C',
      children: [

        { name: 'Gayatri Pati' },
        { name: 'Gaurav Patra' },
        { name: 'Ayush Guharay' },
        { name: 'Anup Mohanty' },
        { name: 'Adil Khan' },
        { name: 'Anurag Mohanty' },
        { name: 'Debashis Tripathy' },
        { name: 'Safaq Jamal' },
        { name: 'Sohan Mohanty' },
        { name: 'Hrushikesh Pattnaik' }

      ]
    },

    {
      name: 'Team D',
      children: [

        { name: 'Chandan Kumar Sahu' },
        { name: 'Sitikantha Dalal' },
        { name: 'Titiksha Sahu' },
        { name: 'Anjali Sahoo' },
        { name: 'Sushree Sangita Sethi' },
        { name: 'Mama Bisoi' },
        { name: 'Tanmay Sahu' },
        { name: 'Pratik Parag Pani' },
        { name: 'Ranit Das' },
        { name: 'Shobha Kumari' },
        { name: 'CS Vishal Rout' }

      ]
    },

    {
      name: 'Team E',
      children: [

        { name: 'Rajesh Behera' },
        { name: 'Maniket Padhan' },
        { name: 'Jeevan Jyoti Panigrahi' },
        { name: 'Ayush Mishra' },
        { name: 'Mohit Singal' },
        { name: 'Dhiraj Mahapatra' },
        { name: 'Swayam Sahu' },
        { name: 'Subhashree Mohapatra' },
        { name: 'Subhalaxmi Sahoo' }

      ]
    },

    {
      name: 'Team F',
      children: [

        { name: 'Rajshree Panda' },
        { name: 'Soumyashree Panda' },
        { name: 'Rupali Jena' },
        { name: 'Lipsa Panda' },
        { name: 'Shreshtha Mohanty' },
        { name: 'Sukanya Subhadarshini' },
        { name: 'Anjali Mishra' },
        { name: 'Prachi Pratyasha Das' },
        { name: 'Nirmit Nayak' },
        { name: 'Padmalaya Meher' }

      ]
    },

    {
      name: 'Team G',
      children: [

        { name: 'Shubham Kumar' },
        { name: 'Yash Kumar' },
        { name: 'Sasawat Rout' },
        { name: 'Adarsh Kumar' },
        { name: 'Amit Kumar Yash' },
        { name: 'C H Tanisha' },
        { name: 'Pratikshya Acharya' },
        { name: 'Mahesh Dakua' },
        { name: 'Anil Kumar Nayak' },
        { name: 'Khushi Sahu' }

      ]
    }

  ];
  onTreeNodeClick(node: TreeNode) {

    // Team clicked
    if (node.children) {

      const teamName =
        node.name.replace('Team ', '');

      this.selectedTeam = teamName;

      this.searchText = '';

      this.filterStudents();

      return;
    }

    // Student clicked
    this.searchText = node.name;

    this.filterStudents();

  }

  getTeamCount(team: string): number {

    return this.members.filter(
      student => student.team === team
    ).length;

  }
  selectedDate = new Date();
  maxDate = new Date();

  searchText = '';

  newName = '';
  newRegNo = '';

  displayedColumns = [
    'team',
    'name',
    'regNo',
    'present',
    'status',
    'lock',
    'edit',
    'delete'
  ];

  members: any[] = [];

  filteredMembers: any[] = [];
  hasChild = (_: number,
    node: TreeNode) =>

    !!node.children &&
    node.children.length > 0;
  ngOnInit(): void {
    this.treeDataSource.data =
      this.treeData;

    this.loadData();

    if (this.members.length === 0) {

      this.members = [

        {
          id: 1,
          team: 'A',
          regNo: 'A001',
          name: 'Soyngsruti Jena',
          attendance: {}
        },
        {
          id: 2,
          team: 'A',
          regNo: 'A002',
          name: 'Swagat Das',
          attendance: {}
        },
        {
          id: 3,
          team: 'A',
          regNo: 'A003',
          name: 'Samikshya Samadarshini',
          attendance: {}
        },
        {
          id: 4,
          team: 'A',
          regNo: 'A004',
          name: 'Archana Devi',
          attendance: {}
        },
        {
          id: 5,
          team: 'A',
          regNo: 'A005',
          name: 'Roshan Mishra',
          attendance: {}
        },
        {
          id: 6,
          team: 'A',
          regNo: 'A006',
          name: 'Satyabrat Sarangi',
          attendance: {}
        },
        {
          id: 7,
          team: 'A',
          regNo: 'A007',
          name: 'Priyanshu Sekhar',
          attendance: {}
        },
        {
          id: 8,
          team: 'A',
          regNo: 'A008',
          name: 'Ankit Prasad',
          attendance: {}
        },
        {
          id: 9,
          team: 'A',
          regNo: 'A009',
          name: 'Ronit Kumar Swain',
          attendance: {}
        },

        {
          id: 10,
          team: 'B',
          regNo: 'B001',
          name: 'Jagannath Padhi',
          attendance: {}
        },
        {
          id: 11,
          team: 'B',
          regNo: 'B002',
          name: 'Rohan Kumar Nayak',
          attendance: {}
        },
        {
          id: 12,
          team: 'B',
          regNo: 'B003',
          name: 'Tushar Ranjan Muduli',
          attendance: {}
        },
        {
          id: 13,
          team: 'B',
          regNo: 'B004',
          name: 'Snehasis Das',
          attendance: {}
        },
        {
          id: 14,
          team: 'B',
          regNo: 'B005',
          name: 'Omkar Sahoo',
          attendance: {}
        },
        {
          id: 15,
          team: 'B',
          regNo: 'B006',
          name: 'Motilal Turuk',
          attendance: {}
        },

        {
          id: 16,
          team: 'C',
          regNo: 'C001',
          name: 'Gayatri Pati',
          attendance: {}
        },
        {
          id: 17,
          team: 'C',
          regNo: 'C002',
          name: 'Gaurav Patra',
          attendance: {}
        },
        {
          id: 18,
          team: 'C',
          regNo: 'C003',
          name: 'Ayush Guharay',
          attendance: {}
        },
        {
          id: 19,
          team: 'C',
          regNo: 'C004',
          name: 'Anup Mohanty',
          attendance: {}
        },
        {
          id: 20,
          team: 'C',
          regNo: 'C005',
          name: 'Adil Khan',
          attendance: {}
        },
        {
          id: 21,
          team: 'C',
          regNo: 'C006',
          name: 'Anurag Mohanty',
          attendance: {}
        },
        {
          id: 22,
          team: 'C',
          regNo: 'C007',
          name: 'Debashis Tripathy',
          attendance: {}
        },
        {
          id: 23,
          team: 'C',
          regNo: 'C008',
          name: 'Safaq Jamal',
          attendance: {}
        },
        {
          id: 24,
          team: 'C',
          regNo: 'C009',
          name: 'Sohan Mohanty',
          attendance: {}
        },
        {
          id: 25,
          team: 'C',
          regNo: 'C010',
          name: 'Hrushikesh Pattnaik',
          attendance: {}
        },

        {
          id: 26,
          team: 'D',
          regNo: 'D001',
          name: 'Chandan Kumar Sahu',
          attendance: {}
        },
        {
          id: 27,
          team: 'D',
          regNo: 'D002',
          name: 'Sitikantha Dalal',
          attendance: {}
        },
        {
          id: 28,
          team: 'D',
          regNo: 'D003',
          name: 'Titiksha Sahu',
          attendance: {}
        },
        {
          id: 29,
          team: 'D',
          regNo: 'D004',
          name: 'Anjali Sahoo',
          attendance: {}
        },
        {
          id: 30,
          team: 'D',
          regNo: 'D005',
          name: 'Sushree Sangita Sethi',
          attendance: {}
        },
        {
          id: 31,
          team: 'D',
          regNo: 'D006',
          name: 'Mama Bisoi',
          attendance: {}
        },
        {
          id: 32,
          team: 'D',
          regNo: 'D007',
          name: 'Tanmay Sahu',
          attendance: {}
        },
        {
          id: 33,
          team: 'D',
          regNo: 'D008',
          name: 'Pratik Parag Pani',
          attendance: {}
        },
        {
          id: 34,
          team: 'D',
          regNo: 'D009',
          name: 'Ranit Das',
          attendance: {}
        },
        {
          id: 35,
          team: 'D',
          regNo: 'D010',
          name: 'Shobha Kumari',
          attendance: {}
        },
        {
          id: 36,
          team: 'D',
          regNo: 'D011',
          name: 'CS Vishal Rout',
          attendance: {}
        },
        {
          id: 37,
          team: 'E',
          regNo: 'E001',
          name: 'Rajesh Behera',
          attendance: {}
        },
        {
          id: 38,
          team: 'E',
          regNo: 'E002',
          name: 'Maniket Padhan',
          attendance: {}
        },
        {
          id: 39,
          team: 'E',
          regNo: 'E003',
          name: 'Jeevan Jyoti Panigrahi',
          attendance: {}
        },
        {
          id: 40,
          team: 'E',
          regNo: 'E004',
          name: 'Ayush Mishra',
          attendance: {}
        },
        {
          id: 41,
          team: 'E',
          regNo: 'E005',
          name: 'Mohit Singal',
          attendance: {}
        },
        {
          id: 42,
          team: 'E',
          regNo: 'E006',
          name: 'Dhiraj Mahapatra',
          attendance: {}
        },
        {
          id: 43,
          team: 'E',
          regNo: 'E007',
          name: 'Swayam Sahu',
          attendance: {}
        },
        {
          id: 44,
          team: 'E',
          regNo: 'E008',
          name: 'Subhashree Mohapatra',
          attendance: {}
        },
        {
          id: 45,
          team: 'E',
          regNo: 'E009',
          name: 'Subhalaxmi Sahoo',
          attendance: {}
        },
        {
          id: 46,
          team: 'F',
          regNo: 'F001',
          name: 'Rajshree Panda',
          attendance: {}
        },
        {
          id: 47,
          team: 'F',
          regNo: 'F002',
          name: 'Soumyashree Panda',
          attendance: {}
        },
        {
          id: 48,
          team: 'F',
          regNo: 'F003',
          name: 'Rupali Jena',
          attendance: {}
        },
        {
          id: 49,
          team: 'F',
          regNo: 'F004',
          name: 'Lipsa Panda',
          attendance: {}
        },
        {
          id: 50,
          team: 'F',
          regNo: 'F005',
          name: 'Shreshtha Mohanty',
          attendance: {}
        },
        {
          id: 51,
          team: 'F',
          regNo: 'F006',
          name: 'Sukanya Subhadarshini',
          attendance: {}
        },
        {
          id: 52,
          team: 'F',
          regNo: 'F007',
          name: 'Anjali Mishra',
          attendance: {}
        },
        {
          id: 53,
          team: 'F',
          regNo: 'F008',
          name: 'Prachi Pratyasha Das',
          attendance: {}
        },
        {
          id: 54,
          team: 'F',
          regNo: 'F009',
          name: 'Nirmit Nayak',
          attendance: {}
        },
        {
          id: 55,
          team: 'F',
          regNo: 'F010',
          name: 'Padmalaya Meher',
          attendance: {}
        },
        {
          id: 56,
          team: 'G',
          regNo: 'G001',
          name: 'Shubham Kumar',
          attendance: {}
        },
        {
          id: 57,
          team: 'G',
          regNo: 'G002',
          name: 'Yash Kumar',
          attendance: {}
        },
        {
          id: 58,
          team: 'G',
          regNo: 'G003',
          name: 'Sasawat Rout',
          attendance: {}
        },
        {
          id: 59,
          team: 'G',
          regNo: 'G004',
          name: 'Adarsh Kumar',
          attendance: {}
        },
        {
          id: 60,
          team: 'G',
          regNo: 'G005',
          name: 'Amit Kumar Yash',
          attendance: {}
        },
        {
          id: 61,
          team: 'G',
          regNo: 'G006',
          name: 'C H Tanisha',
          attendance: {}
        },
        {
          id: 62,
          team: 'G',
          regNo: 'G007',
          name: 'Pratikshya Acharya',
          attendance: {}
        },
        {
          id: 63,
          team: 'G',
          regNo: 'G008',
          name: 'Mahesh Dakua',
          attendance: {}
        },
        {
          id: 64,
          team: 'G',
          regNo: 'G009',
          name: 'Anil Kumar Nayak',
          attendance: {}
        },
        {
          id: 65,
          team: 'G',
          regNo: 'G010',
          name: 'Khushi Sahu',
          attendance: {}
        }
      ];
      this.filteredMembers = [...this.members];
      this.saveData();
    }

  }

  saveData() {

    localStorage.setItem(
      'attendanceMembers',
      JSON.stringify(this.members)
    );
  }

  loadData() {

    const data =
      localStorage.getItem('attendanceMembers');

    if (data) {

      this.members =
        JSON.parse(data);
    }
  }

  filterStudents() {

    let data = [...this.members];

    if (this.selectedTeam !== 'ALL') {

      data =
        data.filter(
          student =>
            student.team === this.selectedTeam
        );
    }

    if (this.searchText.trim()) {

      data =
        data.filter(student =>

          student.name
            .toLowerCase()
            .includes(
              this.searchText.toLowerCase()
            )
        );
    }

    this.filteredMembers = data;
  }

  addStudent() {

    if (
      !this.newName.trim() ||
      !this.newRegNo.trim()
    ) {
      return;
    }

    const student = {

      id: Date.now(),

      team: 'B',

      name: this.newName,

      regNo: this.newRegNo,

      attendance: {}
    };

    this.members.push(student);

    this.filteredMembers = [...this.members];

    this.saveData();

    this.newName = '';
    this.newRegNo = '';
  }
  getFormattedDate(): string {

    const date = new Date(this.selectedDate);

    return date.toISOString().split('T')[0];

  }

  isPresent(row: any): boolean {

    const date = this.getFormattedDate();

    return row.attendance?.[date]?.present || false;

  }

  isLocked(row: any): boolean {

    const date = this.getFormattedDate();

    return row.attendance?.[date]?.locked || false;

  }

  toggleAttendance(row: any, event: any) {

    const date = this.getFormattedDate();

    if (!row.attendance) {

      row.attendance = {};

    }

    row.attendance[date] = {

      present: event.checked,

      locked: false

    };

    this.saveData();

  }


  deleteStudent(id: number) {

    this.members =
      this.members.filter(
        x => x.id !== id
      );

    this.filteredMembers =
      [...this.members];

    this.saveData();
  }

  lockAttendance(row: any) {

    const date = this.getFormattedDate();

    if (!row.attendance) {

      row.attendance = {};

    }

    if (!row.attendance[date]) {

      row.attendance[date] = {

        present: false,

        locked: false

      };

    }

    row.attendance[date].locked = true;

    this.saveData();


  }
  selectedStudentId: number = 0;

  months: string[] = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12'
  ];

  selectedMonth =
    (new Date().getMonth() + 1)
      .toString()
      .padStart(2, '0');

  getPresentToday(): number {

    const date = this.getFormattedDate();

    return this.members.filter(member =>

      member.attendance?.[date]?.present

    ).length;

  }

  getAbsentToday(): number {

    return this.members.length -
      this.getPresentToday();

  }

  getAttendancePercentage(): number {

    if (this.members.length === 0) {

      return 0;

    }

    return Math.round(

      (this.getPresentToday() /
        this.members.length) * 100

    );

  }



  getStudentReport(studentId: number) {

    const student =
      this.members.find(

        x => x.id == studentId

      );

    if (!student) {

      return [];

    }

    return Object.keys(student.attendance)

      .map(date => ({

        date,

        present:
          student.attendance[date].present

      }));

  }

  getMonthlyAttendance(studentId: number) {

    const student =
      this.members.find(

        x => x.id == studentId

      );

    if (!student) {

      return {
        present: 0,
        total: 0
      };
    }

    let present = 0;
    let total = 0;

    Object.keys(student.attendance)

      .forEach(date => {

        const month =
          date.split('-')[1];

        if (month === this.selectedMonth) {

          total++;

          if (
            student.attendance[date]
              .present
          ) {
            present++;
          }

        }

      });

    return {
      present,
      total
    };

  }
  editingStudentId: number | null = null;

  editName = '';
  editRegNo = '';

  startEdit(student: any) {

    this.editingStudentId = student.id;

    this.editName = student.name;

    this.editRegNo = student.regNo;

  }
  saveEdit() {

    const student =
      this.members.find(
        x => x.id === this.editingStudentId
      );

    if (student) {

      student.name = this.editName;
      student.regNo = this.editRegNo;

      this.saveData();

      this.filteredMembers =
        [...this.members];
    }

    this.editingStudentId = null;
  }

  exportExcel() {

    const selectedMonth =
      this.selectedDate
        .toISOString()
        .split('-')[1];

    const monthDates = new Set<string>();


    // Collect all dates of selected month

    this.members.forEach(student => {

      Object.keys(student.attendance || {})
        .forEach(date => {

          if (
            date.split('-')[1] === selectedMonth
          ) {
            monthDates.add(date);
          }

        });

    });

    const sortedDates =
      Array.from(monthDates).sort();


    const reportData =
      this.members.map(student => {

        const row: any = {

          Name: student.name,

          RegNo: student.regNo
        };

        let presentCount = 0;

        let absentCount = 0;


        sortedDates.forEach(date => {

          const record =
            student.attendance?.[date];

          const status =

            record
              ? record.present
                ? 'P'
                : 'A'
              : '-';

          row[date] = status;

          if (status === 'P') {

            presentCount++;

          } else if (status === 'A') {

            absentCount++;

          }

        });

        const totalDays =
          presentCount + absentCount;

        row['Present Days'] =
          presentCount;

        row['Absent Days'] =
          absentCount;

        row['Attendance %'] =

          totalDays > 0

            ? (
              (presentCount /
                totalDays) * 100
            ).toFixed(2) + '%'

            : '0%';

        return row;

      });

    const worksheet =
      XLSX.utils.json_to_sheet(
        reportData
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(

      workbook,

      worksheet,

      'Monthly Attendance'

    );

    XLSX.writeFile(

      workbook,

      `Attendance_${selectedMonth}.xlsx`

    );

  }

  importExcel(event: any) {

    const target =
      event.target;

    if (target.files.length !== 1) {

      return;
    }

    const reader =
      new FileReader();

    reader.onload = (e: any) => {

      const workbook =
        XLSX.read(
          e.target.result,
          { type: 'binary' }
        );

      const sheet =
        workbook.Sheets[
        workbook.SheetNames[0]
        ];

      const data =
        XLSX.utils.sheet_to_json(sheet);

      data.forEach((row: any) => {

        this.members.push({

          id: Date.now() + Math.random(),

          name: row.Name,

          regNo: row.RegNo,

          attendance: {}

        });

      });

      this.filteredMembers =
        [...this.members];

      this.saveData();

    };

    reader.readAsBinaryString(
      target.files[0]
    );

  }

  exportPDF() {

  const doc = new jsPDF();

  const selectedMonth =
    this.selectedDate
      .toISOString()
      .split('-')[1];

  const rows = this.members.map(

    student => {

      let present = 0;

      let total = 0;

      Object.keys(
        student.attendance || {}
      )

      .forEach(date => {

        if (

          date.split('-')[1] ===
          selectedMonth

        ) {

          total++;

          if (
            student.attendance[date]
              .present
          ) {
            present++;
          }

        }

      });

      return [

        student.name,

        student.regNo,

        present,

        total - present,

        total > 0
          ? (
              present /
              total *
              100
            ).toFixed(2) + '%'
          : '0%'
      ];

    });

  doc.text(
    'Monthly Attendance Report',
    14,
    15
  );

  autoTable(doc, {

    head: [[

      'Name',

      'Reg No',

      'Present',

      'Absent',

      '%'

    ]],

    body: rows,

    startY: 25

  });

  doc.save(
    'MonthlyAttendance.pdf'
  );

}

  clearAllData() {

    if (confirm(
      'Delete all attendance data?'
    )) {

      localStorage.clear();

      location.reload();

    }

  }

  selectedTeam = 'ALL';

  filterByTeam(team?: string) {

    if (team) {
      this.selectedTeam = team;
    }

    this.filterStudents();
  }




}

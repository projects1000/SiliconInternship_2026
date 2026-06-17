import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

interface TeamMember {
  id: number;
  name: string;
  team: string;
  present: boolean;
}

@Component({
  selector: 'app-attendance-dashboard',
  templateUrl: './attendance-dashboard.component.html',
  styleUrls: ['./attendance-dashboard.component.css']
})
export class AttendanceDashboardComponent implements OnInit {

  selectedStudent: TeamMember | null = null;

  studentReport = {
    totalDays: 0,
    presentDays: 0,
    absentDays: 0,
    percentage: 0
  };

  currentDate = new Date().toLocaleDateString();
  selectedDate: string = new Date().toISOString().split('T')[0];

  searchText = '';
  showSavedMessage = false;

  selectedTeam = 'A';
  teams = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  displayedColumns: string[] = ['id', 'name', 'attendance', 'status'];

  constructor(private router: Router) { }

  // ================= LOCK =================

  getLockKey(): string {
    return `lock_${this.selectedDate}_${this.selectedTeam}`;
  }

  get isLocked(): boolean {
    return localStorage.getItem(this.getLockKey()) === 'true';
  }

  downloadFinalExcel(): void {

    const allAttendance: any[] = [];

    this.teams.forEach(team => {

      // Get all members belonging to this team
      const teamMembers =
        this.allMembers.filter(
          m => m.team === team
        );

      const key =
        `attendance_${this.selectedDate}_${team}`;

      const saved =
        localStorage.getItem(key);

      let attendanceData: TeamMember[] = [];

      if (saved) {
        attendanceData = JSON.parse(saved);
      }

      teamMembers.forEach(member => {

        const found =
          attendanceData.find(
            m => m.id === member.id
          );

        allAttendance.push({
          ID: member.id,
          Name: member.name,
          Team: member.team,
          Date: this.selectedDate,
          Status:
            found?.present
              ? 'Present'
              : 'Absent'
        });

      });

    });

    const worksheet =
      XLSX.utils.json_to_sheet(allAttendance);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Attendance'
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

    const file =
      new Blob([excelBuffer], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

    saveAs(
      file,
      `Attendance_Report_${this.selectedDate}.xlsx`
    );
  }

  // ================= DATA =================

  allMembers: TeamMember[] = [
    // TEAM A
    { id: 1, name: 'Soyngsruti Jena', team: 'A', present: false },
    { id: 2, name: 'Swagat Das', team: 'A', present: false },
    { id: 3, name: 'Samikshya Samadarshini', team: 'A', present: false },
    { id: 4, name: 'Archana Devi', team: 'A', present: false },
    { id: 5, name: 'Roshan Mishra', team: 'A', present: false },
    { id: 6, name: 'Satyabrat Sarangi', team: 'A', present: false },
    { id: 7, name: 'Priyanshu Sekhar', team: 'A', present: false },
    { id: 8, name: 'Ankit Prasad', team: 'A', present: false },
    { id: 9, name: 'Ronit Kumar Swain', team: 'A', present: false },

    // TEAM B
    { id: 10, name: 'Jagannath Padhi', team: 'B', present: false },
    { id: 11, name: 'Rohan Kumar Nayak', team: 'B', present: false },
    { id: 12, name: 'Tushar Ranjan Muduli', team: 'B', present: false },
    { id: 13, name: 'Snehasis Das', team: 'B', present: false },
    { id: 14, name: 'Omkar Sahoo', team: 'B', present: false },
    { id: 15, name: 'Motilal Turuk', team: 'B', present: false },

    // TEAM C
    { id: 16, name: 'Gayatri Pati', team: 'C', present: false },
    { id: 17, name: 'Gaurav Patra', team: 'C', present: false },
    { id: 18, name: 'Ayush Guharay', team: 'C', present: false },
    { id: 19, name: 'Anup Mohanty', team: 'C', present: false },
    { id: 20, name: 'Adil Khan', team: 'C', present: false },
    { id: 21, name: 'Anurag Mohanty', team: 'C', present: false },
    { id: 22, name: 'Debashis Tripathy', team: 'C', present: false },
    { id: 23, name: 'Safaq Jamal', team: 'C', present: false },
    { id: 24, name: 'Sohan Mohanty', team: 'C', present: false },
    { id: 25, name: 'Hrushikesh Pattnaik', team: 'C', present: false },

    // TEAM D
    { id: 26, name: 'Chandan Kumar Sahu', team: 'D', present: false },
    { id: 27, name: 'Sitikantha Dalal', team: 'D', present: false },
    { id: 28, name: 'Titiksha Sahu', team: 'D', present: false },
    { id: 29, name: 'Anjali Sahoo', team: 'D', present: false },
    { id: 30, name: 'Sushree Sangita Sethi', team: 'D', present: false },
    { id: 31, name: 'Mama Bisoi', team: 'D', present: false },
    { id: 32, name: 'Tanmay Sahu', team: 'D', present: false },
    { id: 33, name: 'Pratik Parag Pani', team: 'D', present: false },
    { id: 34, name: 'Ranit Das', team: 'D', present: false },
    { id: 35, name: 'Shobha Kumari', team: 'D', present: false },
    { id: 36, name: 'CS Vishal Rout', team: 'D', present: false },

    // TEAM E
    { id: 37, name: 'Rajesh Behera', team: 'E', present: false },
    { id: 38, name: 'Maniket Padhan', team: 'E', present: false },
    { id: 39, name: 'Jeevan Jyoti Panigrahi', team: 'E', present: false },
    { id: 40, name: 'Ayush Mishra', team: 'E', present: false },
    { id: 41, name: 'Mohit Singal', team: 'E', present: false },
    { id: 42, name: 'Dhiraj Mahapatra', team: 'E', present: false },
    { id: 43, name: 'Swayam Sahu', team: 'E', present: false },
    { id: 44, name: 'Subhashree Mohapatra', team: 'E', present: false },
    { id: 45, name: 'Subhalaxmi Sahoo', team: 'E', present: false },

    // TEAM F
    { id: 46, name: 'Rajshree Panda', team: 'F', present: false },
    { id: 47, name: 'Soumyashree Panda', team: 'F', present: false },
    { id: 48, name: 'Rupali Jena', team: 'F', present: false },
    { id: 49, name: 'Lipsa Panda', team: 'F', present: false },
    { id: 50, name: 'Shrestha Mohanty', team: 'F', present: false },
    { id: 51, name: 'Sukanya Subhadarshini', team: 'F', present: false },
    { id: 52, name: 'Anjali Mishra', team: 'F', present: false },
    { id: 53, name: 'Prachi Pratyasha Das', team: 'F', present: false },
    { id: 54, name: 'Nirmit Nayak', team: 'F', present: false },

    // TEAM G
    { id: 55, name: 'Padmalaya Meher', team: 'G', present: false },
    { id: 56, name: 'Shubham Kumar', team: 'G', present: false },
    { id: 57, name: 'Yash Kumar', team: 'G', present: false },
    { id: 58, name: 'Sasawat Rout', team: 'G', present: false },
    { id: 59, name: 'Adarsh Kumar', team: 'G', present: false },
    { id: 60, name: 'Amit Kumar Yash', team: 'G', present: false },
    { id: 61, name: 'C H Tanisha', team: 'G', present: false },
    { id: 62, name: 'Pratikshya Acharya', team: 'G', present: false },
    { id: 63, name: 'Mahesh Dakua', team: 'G', present: false },
    { id: 64, name: 'Anil Kumar Nayak', team: 'G', present: false },
    { id: 65, name: 'Khushi Sahu', team: 'G', present: false },
    { id: 66, name: 'Swarna Sharma', team: 'G', present: false }
  ];

  // ================= MEMBERS =================

  get members(): TeamMember[] {
    return this.allMembers.filter(
      m => m.team === this.selectedTeam
    );
  }

  get filteredMembers(): TeamMember[] {
    return this.members.filter(m =>
      m.name.toLowerCase().includes(
        this.searchText.toLowerCase()
      )
    );
  }

  // ================= INIT =================

  ngOnInit(): void {
    this.loadAttendance();
  }

  // ================= DATE =================

  onDateChange(): void {

    this.selectedStudent = null;

    this.loadAttendance();

    console.log(
      'Date changed:',
      this.selectedDate,
      'Locked:',
      this.isLocked
    );
  }

  // ================= TEAM =================

  selectTeam(team: string): void {

    const currentTeam = this.selectedTeam;

    const currentLock =
      localStorage.getItem(
        `lock_${this.selectedDate}_${currentTeam}`
      ) === 'true';

    if (!currentLock) {
      this.saveAttendance();
    }

    this.selectedTeam = team;
    this.searchText = '';
    this.selectedStudent = null;

    this.loadAttendance();
  }

  // ================= SAVE =================

  saveAttendance(): void {
    if (this.isLocked) {
      alert('This date is locked.');
      return;
    }

    const key = `attendance_${this.selectedDate}_${this.selectedTeam}`;
    localStorage.setItem(key, JSON.stringify(this.members));

    this.showSavedMessage = true;
    setTimeout(() => this.showSavedMessage = false, 3000);
  }

  // ================= LOAD (FIXED CORE BUG) =================

  loadAttendance(): void {

    const key =
      `attendance_${this.selectedDate}_${this.selectedTeam}`;

    const saved =
      localStorage.getItem(key);

    // Reset only selected team
    this.allMembers.forEach(member => {

      if (member.team === this.selectedTeam) {
        member.present = false;
      }

    });

    if (!saved) {
      return;
    }

    const savedMembers: TeamMember[] =
      JSON.parse(saved);

    this.allMembers.forEach(member => {

      const found =
        savedMembers.find(
          m => m.id === member.id
        );

      if (found) {
        member.present = found.present;
      }

    });

  }

  // ================= TOGGLE =================

  toggleAttendance(member: TeamMember): void {
    if (this.isLocked) return;
    member.present = !member.present;
  }

  // ================= REPORT =================

  viewStudentReport(student: TeamMember): void {

    this.selectedStudent = student;

    let totalDays = 0;
    let presentDays = 0;

    Object.keys(localStorage).forEach(key => {

      if (
        key.startsWith('attendance_') &&
        key !== 'attendance_final_lock'
      ) {

        const storedData = localStorage.getItem(key);

        if (!storedData) {
          return;
        }

        const data: TeamMember[] = JSON.parse(storedData);

        if (!Array.isArray(data)) {
          return;
        }

        const found = data.find(
          m => m.id === student.id
        );

        if (found) {
          totalDays++;

          if (found.present) {
            presentDays++;
          }
        }
      }
    });

    this.studentReport = {
      totalDays,
      presentDays,
      absentDays: totalDays - presentDays,
      percentage:
        totalDays > 0
          ? Math.round(
            (presentDays / totalDays) * 100
          )
          : 0
    };
  }

  // ================= LOCK =================

  lockAllAttendance(): void {

    const confirmed = confirm(
      `Lock attendance for ALL teams on ${this.selectedDate}?`
    );

    if (!confirmed) {
      return;
    }

    // Save current team first
    this.saveAttendance();

    // Lock every team for this date
    this.teams.forEach(team => {

      localStorage.setItem(
        `lock_${this.selectedDate}_${team}`,
        'true'
      );

    });

    this.downloadFinalExcel();

    alert('All teams locked successfully');
  }

  // ================= RESET =================

  resetAttendance(): void {
    localStorage.clear();
    location.reload();
  }

  // ================= NAV =================

  backToProfile(): void {
    this.router.navigate(['grp-c/member2']);
  }

  // ================= STATS =================

  get presentCount(): number {
    return this.members.filter(m => m.present).length;
  }

  get absentCount(): number {
    return this.members.length - this.presentCount;
  }

  get attendancePercentage(): number {
    return this.members.length
      ? Math.round((this.presentCount / this.members.length) * 100)
      : 0;
  }

}
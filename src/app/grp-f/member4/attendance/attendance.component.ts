import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface Member {
  id: string;
  name: string;
  team: string;
  attendance: { [date: string]: boolean };
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class   Member4AttendanceComponent  implements OnInit {
  constructor(private router: Router) {}
  selectedDate: string = new Date().toISOString().split('T')[0];

  search: string = '';
  selectedTeam: string = '';
  showAddMemberForm: boolean = false;
  newMemberName: string = '';
  newMemberTeam: string = '';

  currentMonth: string = '';
  currentYear: number = 0;
  currentDate: Date = new Date();
  calendarDays: (Date | null)[] = [];

  ngOnInit(): void {
    this.generateCalendar();
  }

  teams: string[] = ['Team A','Team B','Team C','Team D','Team E','Team F','Team G'];

  members: Member[] = [

    // ---------------- TEAM A ----------------
    { id: 'a1', name: 'Soyngsruti Jena', team: 'Team A', attendance: {} },
    { id: 'a2', name: 'Swagat Das', team: 'Team A', attendance: {} },
    { id: 'a3', name: 'Samikshya Samadarshini', team: 'Team A', attendance: {} },
    { id: 'a4', name: 'Archana Devi', team: 'Team A', attendance: {} },
    { id: 'a5', name: 'Roshan Mishra', team: 'Team A', attendance: {} },
    { id: 'a6', name: 'Satyabrat Sarangi', team: 'Team A', attendance: {} },
    { id: 'a7', name: 'Priyanshu Sekhar', team: 'Team A', attendance: {} },
    { id: 'a8', name: 'Ankit Prasad', team: 'Team A', attendance: {} },
    { id: 'a9', name: 'Ronit Kumar Swain', team: 'Team A', attendance: {} },

    // ---------------- TEAM B ----------------
    { id: 'b1', name: 'Jagannath Padhi', team: 'Team B', attendance: {} },
    { id: 'b2', name: 'Rohan Kumar Nayak', team: 'Team B', attendance: {} },
    { id: 'b3', name: 'Tushar Ranjan Muduli', team: 'Team B', attendance: {} },
    { id: 'b4', name: 'Snehasis Das', team: 'Team B', attendance: {} },
    { id: 'b5', name: 'Omkar Sahoo', team: 'Team B', attendance: {} },
    { id: 'b6', name: 'Motilal Turuk', team: 'Team B', attendance: {} },

    // ---------------- TEAM C ----------------
    { id: 'c1', name: 'Gayatri Pati', team: 'Team C', attendance: {} },
    { id: 'c2', name: 'Gaurav Patra', team: 'Team C', attendance: {} },
    { id: 'c3', name: 'Ayush Guharay', team: 'Team C', attendance: {} },
    { id: 'c4', name: 'Anup Mohanty', team: 'Team C', attendance: {} },
    { id: 'c5', name: 'Adil Khan', team: 'Team C', attendance: {} },
    { id: 'c6', name: 'Anurag Mohanty', team: 'Team C', attendance: {} },
    { id: 'c7', name: 'Debashis Tripathy', team: 'Team C', attendance: {} },
    { id: 'c8', name: 'Safaq Jamal', team: 'Team C', attendance: {} },
    { id: 'c9', name: 'Sohan Mohanty', team: 'Team C', attendance: {} },
    { id: 'c10', name: 'Hrushikesh Pattnaik', team: 'Team C', attendance: {} },

    // ---------------- TEAM D ----------------
    { id: 'd1', name: 'Chandan Kumar Sahu', team: 'Team D', attendance: {} },
    { id: 'd2', name: 'Sitikantha Dalal', team: 'Team D', attendance: {} },
    { id: 'd3', name: 'Titiksha Sahu', team: 'Team D', attendance: {} },
    { id: 'd4', name: 'Anjali Sahoo', team: 'Team D', attendance: {} },
    { id: 'd5', name: 'Sushree Sangita Sethi', team: 'Team D', attendance: {} },
    { id: 'd6', name: 'Mama Bisoi', team: 'Team D', attendance: {} },
    { id: 'd7', name: 'Tanmay Sahu', team: 'Team D', attendance: {} },
    { id: 'd8', name: 'Pratik Parag Pani', team: 'Team D', attendance: {} },
    { id: 'd9', name: 'Ranit Das', team: 'Team D', attendance: {} },
    { id: 'd10', name: 'Shobha Kumari', team: 'Team D', attendance: {} },
    { id: 'd11', name: 'CS Vishal Rout', team: 'Team D', attendance: {} },

    // ---------------- TEAM E ----------------
    { id: 'e1', name: 'Rajesh Behera', team: 'Team E', attendance: {} },
    { id: 'e2', name: 'Maniket Padhan', team: 'Team E', attendance: {} },
    { id: 'e3', name: 'Jeevan Jyoti Panigrahi', team: 'Team E', attendance: {} },
    { id: 'e4', name: 'Ayush Mishra', team: 'Team E', attendance: {} },
    { id: 'e5', name: 'Mohit Singal', team: 'Team E', attendance: {} },
    { id: 'e6', name: 'Dhiraj Mahapatra', team: 'Team E', attendance: {} },
    { id: 'e7', name: 'Swayam Sahu', team: 'Team E', attendance: {} },
    { id: 'e8', name: 'Subhashree Mohapatra', team: 'Team E', attendance: {} },
    { id: 'e9', name: 'Subhalaxmi Sahoo', team: 'Team E', attendance: {} },

    // ---------------- TEAM F ----------------
    { id: 'f1', name: 'Rajshree Panda', team: 'Team F', attendance: {} },
    { id: 'f2', name: 'Soumyashree Panda', team: 'Team F', attendance: {} },
    { id: 'f3', name: 'Rupali Jena', team: 'Team F', attendance: {} },
    { id: 'f4', name: 'Lipsa Panda', team: 'Team F', attendance: {} },
    { id: 'f5', name: 'Shrestha Mohanty', team: 'Team F', attendance: {} },
    { id: 'f6', name: 'Sukanya Subhadarshini', team: 'Team F', attendance: {} },
    { id: 'f7', name: 'Anjali Mishra', team: 'Team F', attendance: {} },
    { id: 'f8', name: 'Prachi Pratyasha Das', team: 'Team F', attendance: {} },
    { id: 'f9', name: 'Nirmit Nayak', team: 'Team F', attendance: {} },
    { id: 'f10', name: 'Padmalaya Meher', team: 'Team F', attendance: {} },

    // ---------------- TEAM G ----------------
    { id: 'g1', name: 'Shubham Kumar', team: 'Team G', attendance: {} },
    { id: 'g2', name: 'Yash Kumar', team: 'Team G', attendance: {} },
    { id: 'g3', name: 'Sasawat Rout', team: 'Team G', attendance: {} },
    { id: 'g4', name: 'Adarsh Kumar', team: 'Team G', attendance: {} },
    { id: 'g5', name: 'Amit Kumar Yash', team: 'Team G', attendance: {} },
    { id: 'g6', name: 'C H Tanisha', team: 'Team G', attendance: {} },
    { id: 'g7', name: 'Pratikshya Acharya', team: 'Team G', attendance: {} },
    { id: 'g8', name: 'Mahesh Dakua', team: 'Team G', attendance: {} },
    { id: 'g9', name: 'Anil Kumar Nayak', team: 'Team G', attendance: {} },
    { id: 'g10', name: 'Khushisahu', team: 'Team G', attendance: {} },
    { id: 'g11', name: 'Swarna Sharma', team: 'Team G', attendance: {} },

  ];

  filtered: Member[] = [...this.members];

  /* FILTER */
  filter() {
    this.filtered = this.members.filter(m =>
      (!this.selectedTeam || m.team === this.selectedTeam) &&
      (!this.search || m.name.toLowerCase().includes(this.search.toLowerCase()))
    );
  }

  /* ATTENDANCE TOGGLE */
  toggle(member: Member) {
    this.filtered = this.filtered.map(m => {
      if (m.id === member.id) {
        m.attendance[this.selectedDate] = !m.attendance[this.selectedDate];
      }
      return m;
    });
  }

  isPresent(member: Member): boolean {
    return !!member.attendance[this.selectedDate];
  }

  changeDate() {
    this.filter();
  }

  /* CALENDAR METHODS */
  generateCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    this.currentMonth = monthNames[this.currentDate.getMonth()];
    this.currentYear = this.currentDate.getFullYear();

    const firstDay = new Date(this.currentYear, this.currentDate.getMonth(), 1);
    const lastDay = new Date(this.currentYear, this.currentDate.getMonth() + 1, 0);
    const prevLastDay = new Date(this.currentYear, this.currentDate.getMonth(), 0);

    const firstDayIndex = firstDay.getDay();
    const lastDayDate = lastDay.getDate();
    const prevLastDayDate = prevLastDay.getDate();

    this.calendarDays = [];

    // Previous month days
    for (let i = firstDayIndex; i > 0; i--) {
      this.calendarDays.push(null);
    }

    // Current month days
    for (let i = 1; i <= lastDayDate; i++) {
      this.calendarDays.push(new Date(this.currentYear, this.currentDate.getMonth(), i));
    }

    // Next month days
    const totalCells = this.calendarDays.length;
    const remainingCells = (totalCells % 7 === 0) ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= remainingCells; i++) {
      this.calendarDays.push(null);
    }
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.currentDate = new Date(this.currentDate);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.currentDate = new Date(this.currentDate);
    this.generateCalendar();
  }

  selectDate(day: Date | null) {
    if (!day) return;
    
    // Fix timezone issue - format date in local timezone
    const year = day.getFullYear();
    const month = String(day.getMonth() + 1).padStart(2, '0');
    const date = String(day.getDate()).padStart(2, '0');
    
    this.selectedDate = `${year}-${month}-${date}`;
    this.changeDate();
  }

  hasAbsence(day: Date | null): boolean {
    if (!day) return false;
    
    const dateStr = day.toISOString().split('T')[0];
    
    // Check if any member is absent on this date
    return this.members.some(member => {
      // If attendance is not recorded, consider it as absent
      return member.attendance[dateStr] === false || (member.attendance[dateStr] === undefined && this.isPastDate(day));
    });
  }

  isPastDate(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date <= today;
  }

  getDateClass(day: Date | null): string {
    if (!day) return 'empty';
    
    // Format date in local timezone
    const year = day.getFullYear();
    const month = String(day.getMonth() + 1).padStart(2, '0');
    const date = String(day.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${date}`;
    
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
    const todayDate = String(today.getDate()).padStart(2, '0');
    const todayStr = `${todayYear}-${todayMonth}-${todayDate}`;
    
    if (dateStr === this.selectedDate) return 'selected';
    if (dateStr === todayStr) return 'today';
    
    return '';
  }

  isSearchMatch(member: Member): boolean {
    return member.name.toLowerCase().includes(this.search.toLowerCase());
  }

  save() {
    localStorage.setItem('attendance_full', JSON.stringify(this.members));
    alert('Saved Successfully');
  }

  lock() {
    alert('System Locked');
  }

  /* ADD MEMBER FUNCTIONALITY */
  openAddMemberForm() {
    this.showAddMemberForm = true;
    this.newMemberName = '';
    this.newMemberTeam = '';
  }

  closeAddMemberForm() {
    this.showAddMemberForm = false;
    this.newMemberName = '';
    this.newMemberTeam = '';
  }

  addNewMember() {
    if (!this.newMemberName.trim() || !this.newMemberTeam) {
      alert('Please enter member name and select a team');
      return;
    }

    const newId = this.generateMemberId();
    const newMember: Member = {
      id: newId,
      name: this.newMemberName,
      team: this.newMemberTeam,
      attendance: {}
    };

    this.members.push(newMember);
    this.filter();
    this.closeAddMemberForm();
    alert('Member added successfully!');
  }

  generateMemberId(): string {
    const teamPrefix = this.newMemberTeam.split(' ')[1].toLowerCase();
    const maxId = Math.max(
      ...this.members
        .filter(m => m.team === this.newMemberTeam)
        .map(m => parseInt(m.id.substring(1)) || 0)
    );
    return teamPrefix + (maxId + 1);
  }
  goHome() {
  this.router.navigate(['/grp-f/member4']);
}
}

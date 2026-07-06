import { Component, OnInit } from '@angular/core';

interface Member {
  name: string;
  group: string;
  attendance: { [key: string]: boolean };
}

interface DateCol {
  shortDate: string;
  dayName: string;
  key: string;
  isToday: boolean;
}


@Component({
  selector: 'app-member10-attendance-dashboard',
  templateUrl: './member10-attendance-dashboard.component.html',
  styleUrls: ['./member10-attendance-dashboard.component.css']
})
export class Member10AttendanceDashboardComponent  implements OnInit {

  groups: string[] = ['Group A','Group B','Group C','Group D','Group E','Group F','Group G'];
  months: string[] = ['June 2026','July 2026','August 2026'];
  dayNames: string[] = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  avatarColors: string[] = ['#6c63ff','#ff6b6b','#48cfad','#ffd93d','#ff9f43','#00cec9','#a29bfe','#fd79a8'];

  members: Member[] = [
  
  { name: 'Soumyasruti Jena', group: 'Group A', attendance: {} },
  { name: 'Swagat Das', group: 'Group A', attendance: {} },
  { name: 'Samikshya Samadarshini', group: 'Group A', attendance: {} },
  { name: 'Archana Devi', group: 'Group A', attendance: {} },
  { name: 'Roshan Mishra', group: 'Group A', attendance: {} },
  { name: 'Satyabrat Sarangi', group: 'Group A', attendance: {} },
  { name: 'Priyanshu Sekhar', group: 'Group A', attendance: {} },
  { name: 'Ankit Prasad', group: 'Group A', attendance: {} },
  { name: 'Ronit Kumar Swain', group: 'Group A', attendance: {} },

  { name: 'Jagannath Padhi', group: 'Group B', attendance: {} },
  { name: 'Rohan Kumar Nayak', group: 'Group B', attendance: {} },
  { name: 'Tushar Ranjan Muduli', group: 'Group B', attendance: {} },
  { name: 'Snehasis Das', group: 'Group B', attendance: {} },
  { name: 'Omkar Sahoo', group: 'Group B', attendance: {} },
  { name: 'Motilal Turuk', group: 'Group B', attendance: {} },

  { name: 'Gayatri Pati', group: 'Group C', attendance: {} },
  { name: 'Gaurav Patra', group: 'Group C', attendance: {} },
  { name: 'Ayush Guharay', group: 'Group C', attendance: {} },
  { name: 'Anup Mohanty', group: 'Group C', attendance: {} },
  { name: 'Adil Khan', group: 'Group C', attendance: {} },
  { name: 'Anurag Mohanty', group: 'Group C', attendance: {} },
  { name: 'Debashis Tripathy', group: 'Group C', attendance: {} },
  { name: 'Safaq Jamal', group: 'Group C', attendance: {} },
  { name: 'Sohan Mohanty', group: 'Group C', attendance: {} },
  { name: 'Hrushikesh Pattnaik', group: 'Group C', attendance: {} },

  { name: 'Chandan Kumar Sahu', group: 'Group D', attendance: {} },
  { name: 'Stikantha Dalai', group: 'Group D', attendance: {} },
  { name: 'Titiksha Sahu', group: 'Group D', attendance: {} },
  { name: 'Anjali Sahoo', group: 'Group D', attendance: {} },
  { name: 'Sushree Sangita Sethi', group: 'Group D', attendance: {} },
  { name: 'Mama Bisoi', group: 'Group D', attendance: {} },
  { name: 'Tanmaya Sahu', group: 'Group D', attendance: {} },
  { name: 'Pratik Parag Pani', group: 'Group D', attendance: {} },
  { name: 'Ranit Kumar Das', group: 'Group D', attendance: {} },
  { name: 'Shobha Kumari', group: 'Group D', attendance: {} },
  { name: 'CS Vishal Rout', group: 'Group D', attendance: {} },

  { name: 'Rajesh Behera', group: 'Group E', attendance: {} },
  { name: 'Maniket Padhan', group: 'Group E', attendance: {} },
  { name: 'Jeevan Jyoti Panigrahi', group: 'Group E', attendance: {} },
  { name: 'Ayush Mishra', group: 'Group E', attendance: {} },
  { name: 'Mohit Singal', group: 'Group E', attendance: {} },
  { name: 'Dhiraj Mahapatra', group: 'Group E', attendance: {} },
  { name: 'Swayam Sahu', group: 'Group E', attendance: {} },
  { name: 'Subhashree Mohapatra', group: 'Group E', attendance: {} },
  { name: 'Subhalaxmi Sahoo', group: 'Group E', attendance: {} },

  { name: 'Rajshree Panda', group: 'Group F', attendance: {} },
  { name: 'Soumyashree Panda', group: 'Group F', attendance: {} },
  { name: 'Rupali Jena', group: 'Group F', attendance: {} },
  { name: 'Lipsa Panda', group: 'Group F', attendance: {} },
  { name: 'Shresthha Mohanty', group: 'Group F', attendance: {} },
  { name: 'Sukanya Subhadarshini', group: 'Group F', attendance: {} },
  { name: 'Anjali Mishra', group: 'Group F', attendance: {} },
  { name: 'Prachi Pratyasha Das', group: 'Group F', attendance: {} },
  { name: 'Nirmit Nayak', group: 'Group F', attendance: {} },
  { name: 'Padmalaya Meher', group: 'Group F', attendance: {} },

  { name: 'Shubham Kumar', group: 'Group G', attendance: {} },
  { name: 'Yash Kumar', group: 'Group G', attendance: {} },
  { name: 'Sasawat Rout', group: 'Group G', attendance: {} },
  { name: 'Adarsh Kumar', group: 'Group G', attendance: {} },
  { name: 'Amit Kumar Yash', group: 'Group G', attendance: {} },
  { name: 'C H Tanisha', group: 'Group G', attendance: {} },
  { name: 'Pratikshya Acharya', group: 'Group G', attendance: {} },
  { name: 'Mahesh Dakua', group: 'Group G', attendance: {} },
  { name: 'Anil Kumar Nayak', group: 'Group G', attendance: {} },
  { name: 'Khushi Sahu', group: 'Group G', attendance: {} },


  ];

  dateCols: DateCol[] = [];
  newName: string = '';
  newGroup: string = '';
  permanentLocked: boolean = false;
  historyMember: string = '';
  historyMonth: string = 'June 2026';
  filterGroup: string = '';
  expandedGroups: string[] = [];
  todayLabel: string = '';

  ngOnInit(): void {
    this.buildCols();
    const now = new Date();
    this.todayLabel = now.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  buildCols(): void {
    const today = new Date();
    this.dateCols = [];
    for (let i = -2; i <= 2; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const key = d.toISOString().split('T')[0];
      this.dateCols.push({
        shortDate: d.toLocaleString('en', { month: 'short' }) + ' ' + d.getDate(),
        dayName: this.dayNames[d.getDay()],
        key: key,
        isToday: i === 0
      });
    }
  }

  addMember(): void {
    if (!this.newName.trim() || !this.newGroup || this.permanentLocked) return;
    this.members.push({ name: this.newName.trim(), group: this.newGroup, attendance: {} });
    this.newName = '';
    this.newGroup = '';
  }

  deleteMember(m: Member): void {
    if (this.permanentLocked) return;
    this.members = this.members.filter(x => x !== m);
  }

  toggle(m: Member, key: string): void {
    if (this.permanentLocked) return;
    m.attendance[key] = !m.attendance[key];
  }

  isPresent(m: Member, key: string): boolean {
    return !!m.attendance[key];
  }

  isTodayPresent(m: Member): boolean {
    const k = new Date().toISOString().split('T')[0];
    return !!m.attendance[k];
  }

  getPresentToday(): number {
    const k = new Date().toISOString().split('T')[0];
    return this.members.filter(m => m.attendance[k]).length;
  }

  getRate(): number {
    if (!this.members.length) return 0;
    return Math.round((this.getPresentToday() / this.members.length) * 100);
  }

  getFiltered(): Member[] {
    if (!this.filterGroup) return this.members;
    return this.members.filter(m => m.group === this.filterGroup);
  }

  getMembersByGroup(g: string): Member[] {
    return this.members.filter(m => m.group === g);
  }

  toggleExpand(g: string): void {
    if (this.expandedGroups.includes(g)) {
      this.expandedGroups = this.expandedGroups.filter(x => x !== g);
    } else {
      this.expandedGroups = [...this.expandedGroups, g];
    }
  }

  isExpanded(g: string): boolean {
    return this.expandedGroups.includes(g);
  }

  submitDate(): void {
    alert('Attendance submitted for ' + new Date().toDateString());
  }

  triggerPermanentLock(): void {
    if (this.permanentLocked) return;
    const yes = confirm('WARNING: This will PERMANENTLY lock the system. No edits will be allowed. Continue?');
    if (yes) this.permanentLocked = true;
  }

  unlockSystem(): void {
    const yes = confirm('Unlock the system? (Admin action)');
    if (yes) this.permanentLocked = false;
  }

  resetAll(): void {
    const yes = confirm('Reset ALL attendance data? This cannot be undone.');
    if (yes) this.members.forEach(m => m.attendance = {});
  }

  getHistPresent(): number {
    const m = this.members.find(x => x.name === this.historyMember);
    if (!m) return 0;
    return Object.values(m.attendance).filter(Boolean).length;
  }

  getHistAbsent(): number {
    return Math.max(0, 30 - this.getHistPresent());
  }

  getHistPct(): number {
    return Math.round((this.getHistPresent() / 30) * 100);
  }

  getAvaColor(i: number): string {
    return this.avatarColors[i % this.avatarColors.length];
  }


}

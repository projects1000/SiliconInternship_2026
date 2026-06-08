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
  selector: 'app-attendance-dashboard',
  templateUrl: './attendance-dashboard.component.html',
  styleUrls: ['./attendance-dashboard.component.css']
})
export class AttendanceDashboardComponent implements OnInit {

  groups: string[] = ['Group A','Group B','Group C','Group D','Group E','Group F','Group G'];
  months: string[] = ['June 2026','July 2026','August 2026'];
  dayNames: string[] = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  avatarColors: string[] = ['#6c63ff','#ff6b6b','#48cfad','#ffd93d','#ff9f43','#00cec9','#a29bfe','#fd79a8'];

  members: Member[] = [
    { name: 'Padmalaya Meher', group: 'Group F', attendance: {} },
    { name: 'Rupali jena',      group: 'Group F', attendance: {} },
    { name: 'Sukanya Subadarshini',     group: 'Group F', attendance: {} },
    { name: 'Rajashree Panda',        group: 'Group A', attendance: {} },
    { name: 'Lipsa Panda',     group: 'Group B', attendance: {} },
    { name: 'Shrestha Mohanty',     group: 'Group C', attendance: {} },
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
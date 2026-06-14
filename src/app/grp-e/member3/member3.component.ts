import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface AttendanceMember {
  id: string;
  name: string;
  attendance: Record<string, boolean>;
  lockedDates: Record<string, boolean>;
}

interface AttendanceTeam {
  name: string;
  members: AttendanceMember[];
}

@Component({
  selector: 'app-member3',
  templateUrl: './member3.component.html',
  styleUrls: ['./member3.component.css']
})

export class Member3Component implements OnInit {
  readonly currentDateKey = this.formatDateKey(new Date());
  readonly minDateKey = this.formatDateKey(this.getDateDaysAgo(7));
  readonly teams: AttendanceTeam[] = [
    this.createTeam('Team A', [
      'Soyngsruti Jena',
      'Swagat Das',
      'Samikshya Samadarshini',
      'Archana Devi',
      'Roshan Mishra',
      'Satyabrat Sarangi',
      'Priyanshu Sekhar',
      'Ankit Prasad',
      'Ronit Kumar Swain'
    ]),
    this.createTeam('Team B', [
      'Jagannath Padhi',
      'Rohan Kumar Nayak',
      'Tushar Ranjan Muduli',
      'Snehasis Das',
      'Omkar Sahoo',
      'Motilal Turuk'
    ]),
    this.createTeam('Team C', [
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
    ]),
    this.createTeam('Team D', [
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
    ]),
    this.createTeam('Team E', [
      'Rajesh Behera',
      'Maniket Padhan',
      'Jeevan Jyoti Panigrahi',
      'Ayush Mishra',
      'Mohit Singal',
      'Dhiraj Mahapatra',
      'Swayam Sahu',
      'Subhashree Mohapatra',
      'Subhalaxmi Sahoo'
    ]),
    this.createTeam('Team F', [
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
    ]),
    this.createTeam('Team G', [
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
    ])
  ];

  showAttendance = false;
  selectedDateKey = this.currentDateKey;
  selectedTeamName = 'Team E';

  private readonly storageKey = 'jeevan-member3-attendance';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.showAttendance = this.router.url.includes('/attendance');
    this.loadAttendance();
  }

  get selectedTeam(): AttendanceTeam {
    return this.teams.find(team => team.name === this.selectedTeamName) ?? this.teams[0];
  }

  toggleAttendance(): void {
    this.showAttendance = !this.showAttendance;
  }

  selectTeam(teamName: string): void {
    this.selectedTeamName = teamName;
  }

  selectDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    const nextDate = input.value || this.currentDateKey;

    if (nextDate < this.minDateKey || nextDate > this.currentDateKey) {
      this.selectedDateKey = this.currentDateKey;
      return;
    }

    this.selectedDateKey = nextDate;
  }

  isSelectedDateWithinWindow(): boolean {
    return this.selectedDateKey >= this.minDateKey && this.selectedDateKey <= this.currentDateKey;
  }

  canEdit(member: AttendanceMember): boolean {
    return this.isSelectedDateWithinWindow() && !this.isLocked(member);
  }

  isPresent(member: AttendanceMember): boolean {
    return Boolean(member.attendance[this.selectedDateKey]);
  }

  isLocked(member: AttendanceMember): boolean {
    return Boolean(member.lockedDates[this.selectedDateKey]);
  }

  markAttendance(member: AttendanceMember, checked: boolean): void {
    if (!this.canEdit(member)) {
      return;
    }

    member.attendance[this.selectedDateKey] = checked;
    this.saveAttendance();
  }

  lockAttendance(): void {
    if (!this.isSelectedDateWithinWindow()) {
      return;
    }

    this.selectedTeam.members.forEach(member => {
      member.lockedDates[this.selectedDateKey] = true;
    });

    this.saveAttendance();
  }

  isSelectedDateLocked(): boolean {
    return this.selectedTeam.members.every(member => this.isLocked(member));
  }

  presentCount(): number {
    return this.selectedTeam.members.filter(member => this.isPresent(member)).length;
  }

  selectedDateLabel(): string {
    const [year, month, day] = this.selectedDateKey.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  currentDateLabel(): string {
    const [year, month, day] = this.currentDateKey.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  minDateLabel(): string {
    const [year, month, day] = this.minDateKey.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  private createTeam(name: string, memberNames: string[]): AttendanceTeam {
    return {
      name,
      members: memberNames.map((memberName, index) => ({
        id: `${name.toLowerCase().replace(' ', '-')}-member-${index + 1}`,
        name: memberName,
        attendance: {},
        lockedDates: {}
      }))
    };
  }

  private formatDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  private getDateDaysAgo(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  }

  private loadAttendance(): void {
    const savedAttendance = localStorage.getItem(this.storageKey);

    if (!savedAttendance) {
      return;
    }

    const parsedAttendance = JSON.parse(savedAttendance) as Record<string, {
      attendance: Record<string, boolean>;
      lockedDates: Record<string, boolean>;
    }>;

    this.teams.flatMap(team => team.members).forEach(member => {
      const savedMember = parsedAttendance[member.id];

      if (savedMember) {
        member.attendance = savedMember.attendance ?? {};
        member.lockedDates = savedMember.lockedDates ?? {};
      }
    });
  }

  private saveAttendance(): void {
    const attendanceState: Record<string, {
      attendance: Record<string, boolean>;
      lockedDates: Record<string, boolean>;
    }> = {};

    this.teams.flatMap(team => team.members).forEach(member => {
      attendanceState[member.id] = {
        attendance: member.attendance,
        lockedDates: member.lockedDates
      };
    });

    localStorage.setItem(this.storageKey, JSON.stringify(attendanceState));
  }
}

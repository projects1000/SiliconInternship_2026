import { Component } from '@angular/core';

@Component({
  selector: 'app-member2-attendance',
  templateUrl: './member2-attendance.component.html',
  styleUrls: ['./member2-attendance.component.css']
})
export class Member2AttendanceComponent {
  isDarkMode = true;

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
  }
}
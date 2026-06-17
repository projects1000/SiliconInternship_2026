import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member6',
  templateUrl: './member6.component.html',
  styleUrls: ['./member6.component.css']
})
export class Member6Component {

  constructor(private router: Router) {}

  // existing working code
  goBackToGroup() {
    this.router.navigate(['grp-d']);
  }

  // 🔥 VIEW CONTROL
  activeView: string = 'profile';

  // Attendance
  openAttendance() {
    this.activeView = 'attendance';
  }

  // Billing
  openBilling() {
    this.activeView = 'billing';
  }

  // Back to profile from ANY module
  goBackToProfile() {
    this.activeView = 'profile';
  }

  // ✅ ADDED ONLY (FIX FOR ERROR)
  openFriendsFun() {
    this.activeView = 'friendsfun';
  }
}


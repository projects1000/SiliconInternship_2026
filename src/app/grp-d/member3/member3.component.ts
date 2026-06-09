import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member3',
  templateUrl: './member3.component.html',
  styleUrls: ['./member3.component.css']
})
export class Member3Component {
  // Your existing state variable
  showAttendance: boolean = false;

  constructor(private router: Router) {}

  /**
   * Navigates back to the parent group page
   */
  goBackToGroup() {
    this.router.navigate(['grp-d']);
  }

  /**
   * NEW: Navigates to the dedicated Attendance Matrix page
   */
  openMatrix() {
    this.router.navigate(['grp-d/member3/attendance-matrix']);
  }
}
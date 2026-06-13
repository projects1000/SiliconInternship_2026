import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member6',
  templateUrl: './member6.component.html',
  styleUrls: ['./member6.component.css']
})
export class Member6Component {

  constructor(private router: Router) {}

  // Navigation to the Group page
  goBackToGroup() {
    this.router.navigate(['/grp-d']);
  }

  // Navigation to Attendance
  goToAttendance() {
    this.router.navigate(['/grp-d/member6/attendance']);
  }

  // Navigation to Product Management
  openProductManagement() {
    this.router.navigate(['/grp-d/member6/product-management']);
  }
}

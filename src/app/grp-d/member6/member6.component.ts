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

  // Navigation to the Attendance component
  goToAttendance() {
    // This route must be defined in your app-routing.module.ts or member6-routing.module.ts
    // Based on your folder structure (grp-d/member6/attendance), use this path:
    this.router.navigate(['/grp-d/member6/attendance']);
  }
}

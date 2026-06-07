import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member2',
  templateUrl: './member2.component.html',
  styleUrls: ['./member2.component.css']
})
export class Member2Component {

  constructor(private router: Router) {}

  goBackToGroup() {
    this.router.navigate(['grp-c']);
  }

  openAttendanceDashboard() {
    this.router.navigate(['grp-c/member2/attendance']);
  }
}
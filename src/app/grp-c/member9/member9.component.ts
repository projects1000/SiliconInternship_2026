import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member9',
  templateUrl: './member9.component.html',
  styleUrls: ['./member9.component.css']
})
export class Member9Component {

  name = 'Sohan Mohanty';
  role = 'Angular Developer';
  college = 'SILICON UNIVERSITY';
  email = 'sohan@gmail.com';
  phone = '+91 6789032112';

  constructor(private router: Router) {}

 openAttendance() {
  this.router.navigate(['/grp-c/attendance']);
}
}
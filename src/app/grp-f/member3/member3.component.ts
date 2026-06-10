import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member3',
  templateUrl: './member3.component.html',
  styleUrls: ['./member3.component.css']
})
export class Member3Component {

  constructor(private router: Router) {}

  goBackToGroup() {
    this.router.navigate(['grp-f']);
  }

 goToAttendance() {
  console.log('Button clicked');
  this.router.navigate(['/grp-f/member3/attendance-project']);
}

}
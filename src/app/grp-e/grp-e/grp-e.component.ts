import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grp-e',
  templateUrl: './grp-e.component.html',
  styleUrls: ['./grp-e.component.css']
})
export class GrpEComponent {

  constructor(private router: Router) {}

   goBack() {
    this.router.navigate(['']);
  }

  goToMember1() {
    this.router.navigate(['grp-e/member1']);
  }

  goToMember2() {
    this.router.navigate(['grp-e/member2']);
  }

  goToMember3() {
    this.router.navigate(['grp-e/member3']);
  }

  goToMember4() {
    this.router.navigate(['grp-e/member4']);
  }

  goToMember5() {
    this.router.navigate(['grp-e/member5']);
  }

  goToMember6() {
    this.router.navigate(['grp-e/member6']);
  }

  goToMember7() {
    this.router.navigate(['grp-e/member7']);
  }

  goToMember8() {
    this.router.navigate(['grp-e/member8']);
  }

  goToMember9() {
    this.router.navigate(['grp-e/member9']);
  }
}

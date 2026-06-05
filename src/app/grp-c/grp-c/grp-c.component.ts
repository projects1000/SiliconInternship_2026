import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grp-c',
  templateUrl: './grp-c.component.html',
  styleUrls: ['./grp-c.component.css']
})
export class GrpCComponent {

  constructor(private router: Router) {}

   goBack() {
    this.router.navigate(['']);
  }

  goToMember1() {
    this.router.navigate(['grp-c/member1']);
  }

  goToMember2() {
    this.router.navigate(['grp-c/member2']);
  }

  goToMember3() {
    this.router.navigate(['grp-c/member3']);
  }

  goToMember4() {
    this.router.navigate(['grp-c/member4']);
  }

  goToMember5() {
    this.router.navigate(['grp-c/member5']);
  }

  goToMember6() {
    this.router.navigate(['grp-c/member6']);
  }

  goToMember7() {
    this.router.navigate(['grp-c/member7']);
  }

  goToMember8() {
    this.router.navigate(['grp-c/member8']);
  }

  goToMember9() {
    this.router.navigate(['grp-c/member9']);
  }

  goToMember10() {
    this.router.navigate(['grp-c/member10']);
  }
}
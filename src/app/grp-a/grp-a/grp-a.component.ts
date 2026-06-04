import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grp-a',
  templateUrl: './grp-a.component.html',
  styleUrls: ['./grp-a.component.css']
})
export class GrpAComponent {

  constructor(private router: Router) {}

   goBack() {
    this.router.navigate(['']);
  }

  goToMember1() {
    this.router.navigate(['grp-a/member1']);
  }

  goToMember2() {
    this.router.navigate(['grp-a/member2']);
  }

  goToMember3() {
    this.router.navigate(['grp-a/member3']);
  }

  goToMember4() {
    this.router.navigate(['grp-a/member4']);
  }

  goToMember5() {
    this.router.navigate(['grp-a/member5']);
  }

  goToMember6() {
    this.router.navigate(['grp-a/member6']);
  }

  goToMember7() {
    this.router.navigate(['grp-a/member7']);
  }

  goToMember8() {
    this.router.navigate(['grp-a/member8']);
  }

  goToMember9() {
    this.router.navigate(['grp-a/member9']);
  }

  goToMember10() {
    this.router.navigate(['grp-a/member10']);
  }
}
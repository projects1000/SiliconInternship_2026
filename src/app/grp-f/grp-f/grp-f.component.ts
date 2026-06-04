import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grp-f',
  templateUrl: './grp-f.component.html',
  styleUrls: ['./grp-f.component.css']
})
export class GrpFComponent {

  constructor(private router: Router) {}

   goBack() {
    this.router.navigate(['']);
  }

  goToMember1() {
    this.router.navigate(['grp-f/member1']);
  }

  goToMember2() {
    this.router.navigate(['grp-f/member2']);
  }

  goToMember3() {
    this.router.navigate(['grp-f/member3']);
  }

  goToMember4() {
    this.router.navigate(['grp-f/member4']);
  }

  goToMember5() {
    this.router.navigate(['grp-f/member5']);
  }

  goToMember6() {
    this.router.navigate(['grp-f/member6']);
  }

  goToMember7() {
    this.router.navigate(['grp-f/member7']);
  }

  goToMember8() {
    this.router.navigate(['grp-f/member8']);
  }

  goToMember9() {
    this.router.navigate(['grp-f/member9']);
  }

  goToMember10() {
    this.router.navigate(['grp-f/member10']);
  }
}

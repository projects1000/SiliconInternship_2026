import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grp-d',
  templateUrl: './grp-d.component.html',
  styleUrls: ['./grp-d.component.css']
})
export class GrpDComponent {

  constructor(private router: Router) {}

   goBack() {
    this.router.navigate(['']);
  }

  goToMember1() {
    this.router.navigate(['grp-d/member1']);
  }

  goToMember2() {
    this.router.navigate(['grp-d/member2']);
  }

  goToMember3() {
    this.router.navigate(['grp-d/member3']);
  }

  goToMember4() {
    this.router.navigate(['grp-d/member4']);
  }

  goToMember5() {
    this.router.navigate(['grp-d/member5']);
  }

  goToMember6() {
    this.router.navigate(['grp-d/member6']);
  }

  goToMember7() {
    this.router.navigate(['grp-d/member7']);
  }

  goToMember8() {
    this.router.navigate(['grp-d/member8']);
  }

  goToMember9() {
    this.router.navigate(['grp-d/member9']);
  }

  goToMember10() {
    this.router.navigate(['grp-d/member10']);
  }
  goToMember11() {
    this.router.navigate(['grp-d/member11']);
  }
}

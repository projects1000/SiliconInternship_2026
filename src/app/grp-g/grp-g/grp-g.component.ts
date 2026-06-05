import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grp-g',
  templateUrl: './grp-g.component.html',
  styleUrls: ['./grp-g.component.css']
})
export class GrpGComponent {

  constructor(private router: Router) {}

   goBack() {
    this.router.navigate(['']);
  }

  goToMember1() {
    this.router.navigate(['grp-g/member1']);
  }

  goToMember2() {
    this.router.navigate(['grp-g/member2']);
  }

  goToMember3() {
    this.router.navigate(['grp-g/member3']);
  }

  goToMember4() {
    this.router.navigate(['grp-g/member4']);
  }

  goToMember5() {
    this.router.navigate(['grp-g/member5']);
  }

  goToMember6() {
    this.router.navigate(['grp-g/member6']);
  }

  goToMember7() {
    this.router.navigate(['grp-g/member7']);
  }

  goToMember8() {
    this.router.navigate(['grp-g/member8']);
  }

  goToMember9() {
    this.router.navigate(['grp-g/member9']);
  }

  goToMember10() {
    this.router.navigate(['grp-g/member10']);
  }
  goToMember11() {
    this.router.navigate(['grp-g/member11']);
  }
}

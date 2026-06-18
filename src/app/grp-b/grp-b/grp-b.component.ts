import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grp-b',
  templateUrl: './grp-b.component.html',
  styleUrls: ['./grp-b.component.css']
})
export class GrpBComponent {

  constructor(private router: Router) {}

   goBack() {
    this.router.navigate(['']);
  }

  goToMember1() {
    this.router.navigate(['grp-b/member1']);
  }

  goToMember2() {
    this.router.navigate(['grp-b/member2']);
  }

  goToMember3() {
    this.router.navigate(['grp-b/product-management']);
  }

  goToMember4() {
    this.router.navigate(['grp-b/member4']);
  }

  goToMember5() {
    this.router.navigate(['grp-b/member5']);
  }

  goToMember6() {
    this.router.navigate(['grp-b/member6']);
  }

}
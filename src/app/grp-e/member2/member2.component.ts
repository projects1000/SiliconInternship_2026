import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member2',
  templateUrl: './member2.component.html',
  styleUrls: ['./member2.component.css'],
})
export class Member2Component {
  constructor(private router: Router) {}

  goBackToGroup() {
    this.router.navigate(['grp-e']);
  }

  goToAttendance() {
  this.router.navigate(['grp-e/member2/attendence0001']);
}

  goToBilling() {
    this.router.navigate(['grp-e/member2/billingmanagement0001']);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }
}

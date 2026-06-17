import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member1',
  templateUrl: './member1.component.html',
  styleUrls: ['./member1.component.css']
})
export class Member1Component {

  constructor(private router: Router) {}

  goBackToGroup() {
    this.router.navigate(['grp-d']);
  }

  openAttendance() {
    this.router.navigate(['/grp-d/member1/attendance']);
  }

  openProductManagement() {
    this.router.navigate(['/grp-d/member1/product-management']);
  }

  openWhatsAppAssignment() {
    this.router.navigate(['/grp-d/member1/whatsapp-chat']);
  }
}
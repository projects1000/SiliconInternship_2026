import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member10',
  templateUrl: './member10.component.html',
  styleUrls: ['./member10.component.css']
})
export class Member10Component {
 constructor(private router: Router) {}

  goBackToGroup() {
    this.router.navigate(['grp-f']);
    
  }

  goToBilling() {
    this.router.navigate(['/member10/billing']);
  }
}

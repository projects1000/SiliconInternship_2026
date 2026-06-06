import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member4',
  templateUrl: './member4.component.html',
  styleUrls: ['./member4.component.css']
})
export class Member4Component {
 constructor(private router: Router) {}

  goBackToGroup() {
    this.router.navigate(['grp-g']);
  }
}

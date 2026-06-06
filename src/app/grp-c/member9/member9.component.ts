import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member9',
  templateUrl: './member9.component.html',
  styleUrls: ['./member9.component.css']
})
export class Member9Component {
 constructor(private router: Router) {}

  goBackToGroup() {
    this.router.navigate(['grp-c']);
  }
}

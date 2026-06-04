import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member7',
  templateUrl: './member7.component.html',
  styleUrls: ['./member7.component.css']
})
export class Member7Component {
 constructor(private router: Router) {}

  goBackToGroup() {
    this.router.navigate(['grp-c']);
  }
}

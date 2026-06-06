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
    this.router.navigate(['grp-c']);
  }
}

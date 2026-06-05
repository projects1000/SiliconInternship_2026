import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member11',
  templateUrl: './member11.component.html',
  styleUrls: ['./member11.component.css']
})
export class Member11Component {
 constructor(private router: Router) {}

  goBackToGroup() {
    this.router.navigate(['grp-d']);
  }
}

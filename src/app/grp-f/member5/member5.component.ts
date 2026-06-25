import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member5',
  templateUrl: './member5.component.html',
  styleUrls: ['./member5.component.css']
})
export class Member5Component {
 constructor(private router: Router) {}

  goBackToGroup() {
    this.router.navigate(['grp-f']);
  }
  openMember5Chat() {

  this.router.navigate([
    'grp-f/member5/member5-chat-window'
  ]);
}
}

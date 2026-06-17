import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member5',
  templateUrl: './member5.component.html',
  styleUrls: ['./member5.component.css']
})
export class Member5Component {

  showChat = false;

constructor(private router: Router) {}
/*
  openPrivateChat() {
    this.showChat = true;
  }

  goBackToProfile() {
    this.showChat = false;
  }

  goBackToGroup() {
    this.router.navigate(['/grp-b']);
  } */
  

openPrivateChat(){
  this.router.navigate(['/grp-b/member5/chat-window']);
}
goBackToGroup() {
  this.router.navigate(['/grp-b']);
}

}
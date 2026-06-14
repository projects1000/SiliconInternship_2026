import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whatsapp-chat',
  templateUrl: './whatsapp-chat.component.html',
  styleUrls: ['./whatsapp-chat.component.css']
})
export class WhatsappChatComponent {

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['grp-c/member2']);
  }

}
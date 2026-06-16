// src/app/grp-f/member10/member10-chatapp/user-b/user-b.component.ts

import { Component } from '@angular/core';
import { Member10ChatService } from '../chat.service';

@Component({
  selector: 'app-member10-user-b',
  templateUrl: './user-b.component.html',
  styleUrls: ['./user-b.component.css']
})
export class Member10UserBComponent {
  message: string = '';
  readonly senderName = 'Mayur';

  constructor(private chatService: Member10ChatService) {}

  sendMessage(): void {
    const trimmed = this.message.trim();
    if (!trimmed) return;
    this.chatService.sendMessage({
      sender: this.senderName,
      text: trimmed,
      timestamp: new Date()
    });
    this.message = '';
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.sendMessage();
  }
}
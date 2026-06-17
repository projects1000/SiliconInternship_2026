// src/app/grp-f/member10/member10-chatapp/user-a/user-a.component.ts

import { Component } from '@angular/core';
import { Member10ChatService } from '../chat.service';

@Component({
  selector: 'app-member10-user-a',
  templateUrl: './user-a.component.html',
  styleUrls: ['./user-a.component.css']
})
export class Member10UserAComponent {
  message: string = '';
  readonly senderName = 'Gents';

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
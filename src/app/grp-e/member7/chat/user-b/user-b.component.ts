import { Component } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-m7-user-b',
  templateUrl: './user-b.component.html',
  styleUrls: ['./user-b.component.css']
})
export class UserBComponent {
  messageText = '';

  constructor(private chatService: ChatService) {}

  sendMessage(): void {
    if (!this.messageText.trim()) return;
    this.chatService.sendMessage('Mayur', this.messageText.trim());
    this.messageText = '';
  }
}

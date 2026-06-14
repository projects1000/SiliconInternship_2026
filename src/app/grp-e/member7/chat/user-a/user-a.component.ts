import { Component } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-m7-user-a',
  templateUrl: './user-a.component.html',
  styleUrls: ['./user-a.component.css']
})
export class UserAComponent {
  messageText = '';

  constructor(private chatService: ChatService) {}

  sendMessage(): void {
    if (!this.messageText.trim()) return;
    this.chatService.sendMessage('Zen', this.messageText.trim());
    this.messageText = '';
  }
}

import { Component } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-user-anshuman',
  templateUrl: './user-anshuman.component.html'
})
export class UserAnshumanComponent {
  messageText: string = '';

  constructor(private chatService: ChatService) {}

  send() {
    if (this.messageText.trim()) {
      this.chatService.sendMessage({
        sender: 'Anshuman',
        text: this.messageText,
        timestamp: new Date()
      });
      this.messageText = '';
    }
  }
}
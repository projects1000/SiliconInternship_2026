import { Component } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-user-ayush',
  templateUrl: './user-ayush.component.html'
})
export class UserAyushComponent {
  messageText: string = '';

  constructor(private chatService: ChatService) {}

  send() {
    if (this.messageText.trim()) {
      this.chatService.sendMessage({
        sender: 'Ayush',
        text: this.messageText,
        timestamp: new Date()
      });
      this.messageText = ''; // Box clear karo bhejne ke baad
    }
  }
}
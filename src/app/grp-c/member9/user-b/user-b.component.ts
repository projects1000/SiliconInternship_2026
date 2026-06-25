import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-user-b',
 
  templateUrl: './user-b.component.html',
  styleUrls: ['./user-b.component.css']
})
export class UserBComponent {

  message = '';

  constructor(private chatService: ChatService) {}

  send() {

    if (!this.message.trim()) return;

    this.chatService.sendMessage({
      sender: 'Mayur',
      text: this.message,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    });

    this.message = '';
  }
}
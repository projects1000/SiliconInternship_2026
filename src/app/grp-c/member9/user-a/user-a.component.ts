import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-user-a',
  
  templateUrl: './user-a.component.html',
  styleUrls: ['./user-a.component.css']
})
export class UserAComponent {

  message = '';

  constructor(private chatService: ChatService) {}

  send() {

    if (!this.message.trim()) return;

    this.chatService.sendMessage({
      sender: 'Gents',
      text: this.message,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    });

    this.message = '';
  }
}
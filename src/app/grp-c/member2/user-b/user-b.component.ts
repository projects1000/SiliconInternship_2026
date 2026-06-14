import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-user-b',
  templateUrl: './user-b.component.html',
  styleUrls: ['./user-b.component.css']
})
export class UserBComponent {

  message = '';

  constructor(
    private chatService: ChatService,
    private notificationService: NotificationService
  ) { }

  sendMessage() {

    if (!this.message.trim()) {
      return;
    }

    this.chatService.sendMessage({
      sender: 'Juliet',
      text: this.message,
      time: new Date().toLocaleTimeString()
    });

    this.message = '';

    this.chatService.setTyping('');

    this.notificationService.sendMessage(
      '🌸 Juliet sent a message.'
    );

  }

  typing() {

    this.chatService.setTyping(
      '🌸 Juliet'
    );

  }
}
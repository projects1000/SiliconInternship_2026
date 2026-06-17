import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-user-romeo',
  templateUrl: './user-romeo.component.html',
  styleUrls: ['./user-romeo.component.css']
})
export class UserRomeoComponent {

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
      sender: 'Romeo',
      text: this.message,
      time: new Date().toLocaleTimeString()
    });

    this.message = '';

    this.chatService.setTyping('');

    this.notificationService.sendMessage(
      '👑 Romeo sent a message.'
    );
  }

  typing() {

    this.chatService.setTyping(
      '👑 Romeo'
    );

  }
}
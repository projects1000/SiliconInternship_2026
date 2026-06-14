import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-friend1',
  templateUrl: './friend1.component.html',
  styleUrls: ['./friend1.component.css']
})
export class Friend1Component {

  message: string = '';

  constructor(private chatService: ChatService) {}

  sendMessage(): void {

    if (!this.message.trim()) {
      return;
    }

    this.chatService.sendMessage({
      sender: 'Arjun',
      text: this.message,
      time: new Date()
    });

    this.message = '';
  }
}

import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-friend2',
  templateUrl: './friend2.component.html',
  styleUrls: ['./friend2.component.css']
})
export class Friend2Component {

  message: string = '';

  constructor(private chatService: ChatService) {}

  sendMessage(): void {

    if (!this.message.trim()) {
      return;
    }

    this.chatService.sendMessage({
      sender: 'Priya',
      text: this.message,
      time: new Date()
    });

    this.message = '';
  }
}

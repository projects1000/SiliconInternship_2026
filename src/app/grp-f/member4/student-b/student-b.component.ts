import { Component } from '@angular/core';
import { ChatService } from '../chat-service/chat.service';

@Component({
  selector: 'app-student-b',
  templateUrl: './student-b.component.html',
  styleUrls: ['./student-b.component.css']
})
export class StudentBComponent {

  message: string = '';

  constructor(private chatService: ChatService) {}

  sendMessage() {

    if (this.message.trim() !== '') {

      const msg = {
        sender: 'Banita',
        text: this.message,
        time: new Date().toLocaleTimeString()
      };

      this.chatService.sendMessage(msg);

      this.message = '';
    }
  }
}
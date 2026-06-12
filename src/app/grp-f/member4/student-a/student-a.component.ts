import { Component } from '@angular/core';
import { ChatService } from '../chat-service/chat.service';

@Component({
  selector: 'app-student-a',
  templateUrl: './student-a.component.html',
  styleUrls: ['./student-a.component.css']
})
export class StudentAComponent {

  message: string = '';

  constructor(private chatService: ChatService) {}

  sendMessage() {

    if (this.message.trim() !== '') {

      const msg = {
        sender: 'Lipsa',
        text: this.message,
        time: new Date().toLocaleTimeString()
      };

      this.chatService.sendMessage(msg);

      this.message = '';
    }
  }
}
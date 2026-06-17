import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Member5ChatService } from '../services/member5-chat.service';

@Component({
  selector: 'app-member5-mayur',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './member5-mayur.component.html',
  styleUrls: ['./member5-mayur.component.css']
})
export class Member5MayurComponent {
  message = '';

  constructor(
    private chatService: Member5ChatService
  ) {}

  sendMessage() {

    if (!this.message.trim()) return;

    this.chatService.sendMessage({
      sender: 'Neo',
      text: this.message,
      timestamp: new Date()
    });

    this.message = '';
  }

}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Member5ChatService } from '../services/member5-chat.service';


@Component({
  selector: 'app-member5-gents',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './member5-gents.component.html',
  styleUrls: ['./member5-gents.component.css']
})
export class Member5GentsComponent {

   message = '';

  constructor(
    private chatService: Member5ChatService
  ) {}

  sendMessage() {

    if (!this.message.trim()) return;

    this.chatService.sendMessage({
      sender: 'Nova',
      text: this.message,
      timestamp: new Date()
    });

    this.message = '';
  }

}

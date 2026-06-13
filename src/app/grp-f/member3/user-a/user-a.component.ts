import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-a',
  templateUrl: './user-a.component.html',
  styleUrls: ['./user-a.component.css']
})
export class UserAComponent {

  message = '';

  constructor(
    public chatService: ChatService,
    private snackBar: MatSnackBar
  ) {}

  sendMessage() {

    if (!this.message.trim()) {
      return;
    }

    this.chatService.sendMessage(
      'User A',
      this.message
    );

    this.snackBar.open(
      '✅ Message Sent',
      'Close',
      {
        duration: 2000
      }
    );

    this.message = '';

  }

}
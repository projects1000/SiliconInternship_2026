import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-b',
  templateUrl: './user-b.component.html',
  styleUrls: ['./user-b.component.css']
})
export class UserBComponent {

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
      'User B',
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
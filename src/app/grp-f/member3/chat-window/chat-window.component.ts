import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent {

  userAStatus = 'Online';

  userBStatus = 'Online';

  constructor(
    public chatService: ChatService,
    private snackBar: MatSnackBar
  ) {}

  clearChat() {

    const confirmDelete =
      confirm('Clear all messages?');

    if (!confirmDelete) {
      return;
    }

    this.chatService.clearChat();

    this.snackBar.open(
      '🗑️ Chat Cleared',
      'Close',
      {
        duration: 2000
      }
    );

  }

  deleteMessage(index: number) {

    this.chatService.deleteMessage(index);

    this.snackBar.open(
      '🗑️ Message Deleted',
      'Close',
      {
        duration: 2000
      }
    );

  }

}
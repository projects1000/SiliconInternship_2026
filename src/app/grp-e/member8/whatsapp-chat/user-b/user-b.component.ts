import { Component, OnDestroy } from '@angular/core';
import { WhatsappChatService } from '../whatsapp-chat.service';

@Component({
  selector: 'app-wa-user-b',
  templateUrl: './user-b.component.html',
  styleUrls: ['./user-b.component.css']
})
export class WaUserBComponent implements OnDestroy {
  messageText = '';
  private typingTimeout: any;

  constructor(private chatService: WhatsappChatService) {}

  onInputChange(): void {
    this.chatService.setTyping('Priya', true);

    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }

    this.typingTimeout = setTimeout(() => {
      this.chatService.setTyping('Priya', false);
    }, 1200);
  }

  sendMessage(): void {
    if (!this.messageText.trim()) return;

    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    this.chatService.setTyping('Priya', false);

    this.chatService.sendMessage('Priya', this.messageText.trim());
    this.messageText = '';
  }

  ngOnDestroy(): void {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    this.chatService.setTyping('Priya', false);
  }
}

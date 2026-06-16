import { Component, OnDestroy } from '@angular/core';
import { WhatsappChatService } from '../whatsapp-chat.service';

@Component({
  selector: 'app-wa-user-a',
  templateUrl: './user-a.component.html',
  styleUrls: ['./user-a.component.css']
})
export class WaUserAComponent implements OnDestroy {
  messageText = '';
  private typingTimeout: any;

  constructor(private chatService: WhatsappChatService) {}

  onInputChange(): void {
    this.chatService.setTyping('Aman', true);

    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }

    this.typingTimeout = setTimeout(() => {
      this.chatService.setTyping('Aman', false);
    }, 1200);
  }

  sendMessage(): void {
    if (!this.messageText.trim()) return;

    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    this.chatService.setTyping('Aman', false);

    this.chatService.sendMessage('Aman', this.messageText.trim());
    this.messageText = '';
  }

  ngOnDestroy(): void {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    this.chatService.setTyping('Aman', false);
  }
}

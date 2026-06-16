import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-user-b',
  templateUrl: './user-b.component.html',
  styleUrls: ['./user-b.component.css']
})
export class UserBComponent implements OnInit, OnDestroy {
  messageText = '';
  isSending = false;
  private typingTimer: any;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    clearTimeout(this.typingTimer);
    this.chatService.setTyping('mayur', false);
  }

  onInput(): void {
    clearTimeout(this.typingTimer);
    if (this.messageText.trim()) {
      this.chatService.setTyping('mayur', true);
      this.typingTimer = setTimeout(() => this.chatService.setTyping('mayur', false), 2000);
    } else {
      this.chatService.setTyping('mayur', false);
    }
  }

  send(): void {
    if (!this.messageText.trim() || this.isSending) return;
    clearTimeout(this.typingTimer);
    this.chatService.setTyping('mayur', false);
    this.chatService.sendMessage('mayur', this.messageText);  // Subject.next()
    this.messageText = '';
    this.isSending = true;
    setTimeout(() => (this.isSending = false), 900);
  }

  onKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.send();
    }
  }
}

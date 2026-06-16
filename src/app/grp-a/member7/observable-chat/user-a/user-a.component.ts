import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-user-a',
  templateUrl: './user-a.component.html',
  styleUrls: ['./user-a.component.css']
})
export class UserAComponent implements OnInit, OnDestroy {
  messageText = '';
  isSending = false;
  private typingTimer: any;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    clearTimeout(this.typingTimer);
    this.chatService.setTyping('gents', false);
  }

  onInput(): void {
    clearTimeout(this.typingTimer);
    if (this.messageText.trim()) {
      this.chatService.setTyping('gents', true);
      this.typingTimer = setTimeout(() => this.chatService.setTyping('gents', false), 2000);
    } else {
      this.chatService.setTyping('gents', false);
    }
  }

  send(): void {
    if (!this.messageText.trim() || this.isSending) return;
    clearTimeout(this.typingTimer);
    this.chatService.setTyping('gents', false);
    this.chatService.sendMessage('gents', this.messageText);  // Subject.next()
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

import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ChatService, ChatMessage } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;
  
  messages: ChatMessage[] = [];
  totalMessages: number = 0;
  lastMessage: string = 'None';
  
  private messageSub!: Subscription;
  private clearSub!: Subscription;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    // 1. Subscribe to incoming messages
    this.messageSub = this.chatService.messages$.subscribe((msg: ChatMessage) => {
      this.messages.push(msg);
      this.totalMessages = this.messages.length;
      this.lastMessage = msg.text;
      this.scrollToBottom();
    });

    // 2. Subscribe to the clear chat command
    this.clearSub = this.chatService.clearChat$.subscribe(() => {
      this.messages = [];
      this.totalMessages = 0;
      this.lastMessage = 'None';
    });
  }

  clearChat() {
    this.chatService.clearChat();
  }

  // Auto-scroll logic
  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    }, 50);
  }

  // Always clean up subscriptions to prevent memory leaks
  ngOnDestroy() {
    if (this.messageSub) this.messageSub.unsubscribe();
    if (this.clearSub) this.clearSub.unsubscribe();
  }
}
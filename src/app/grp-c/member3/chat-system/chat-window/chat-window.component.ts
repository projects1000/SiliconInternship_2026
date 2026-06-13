import { Component, OnInit } from '@angular/core';
import { ChatService, ChatMessage } from '../chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html'
})
export class ChatWindowComponent implements OnInit {
  messages: ChatMessage[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    // Service se naye message receive karna (Subscribe)
    this.chatService.message$.subscribe((msg) => {
      this.messages.push(msg);
    });

    // Clear message receive karna
    this.chatService.clear$.subscribe(() => {
      this.messages = [];
    });
  }

  clearChat() {
    this.chatService.clearChat();
  }
}
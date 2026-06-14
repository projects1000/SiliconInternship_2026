import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService, ChatMessage } from '../services/chat.service';

@Component({
  selector: 'app-chat-window',

  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  messages: ChatMessage[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {

    this.chatService.messages$.subscribe(message => {
      this.messages.push(message);
    });
  }

  clearChat() {
    this.messages = [];
  }

  get lastMessage() {
    return this.messages.length
      ? this.messages[this.messages.length - 1].text
      : 'No messages';
  }
}
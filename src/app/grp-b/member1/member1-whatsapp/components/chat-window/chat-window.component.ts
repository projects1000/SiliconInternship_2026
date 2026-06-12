// grp-b/member1/member1-whatsapp/components/chat-window/chat-window.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  chatHistory: ChatMessage[] = [];
  private chatSubscription!: Subscription;

  // Bonus metric properties
  lastMessageText: string = 'No messages yet';
  lastMessageSender: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    // Crucial: Component hooks into the stream via .subscribe()
    this.chatSubscription = this.chatService.message$.subscribe(
      (msg: ChatMessage) => {
        this.chatHistory.push(msg); // Append to history without overwriting

        // Update assignments metrics properties
        this.lastMessageText = msg.text;
        this.lastMessageSender = msg.sender;
      },
    );
  }

  clearChat() {
    this.chatHistory = [];
    this.lastMessageText = 'No messages yet';
    this.lastMessageSender = '';
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.chatSubscription) this.chatSubscription.unsubscribe();
  }
}

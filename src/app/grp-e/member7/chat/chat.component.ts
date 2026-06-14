import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messageCount = 0;
  lastMessage = 'No messages yet';
  private messageSubscription!: Subscription;
  private clearSubscription!: Subscription;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // Hide navigation bar of application to have a fully immersive layout
    const sidebar = document.querySelector('app-nav-bar') as HTMLElement;
    const content = document.querySelector('.content') as HTMLElement;
    if (sidebar) sidebar.style.display = 'none';
    if (content) content.style.padding = '0';

    // Subscribe to messages to update parent stats
    this.messageSubscription = this.chatService.message$.subscribe(msg => {
      this.messageCount++;
      this.lastMessage = `"${msg.text}" by ${msg.sender}`;
    });

    // Subscribe to clear command to reset stats
    this.clearSubscription = this.chatService.clear$.subscribe(() => {
      this.messageCount = 0;
      this.lastMessage = 'No messages yet';
    });
  }

  ngOnDestroy(): void {
    const sidebar = document.querySelector('app-nav-bar') as HTMLElement;
    const content = document.querySelector('.content') as HTMLElement;
    if (sidebar) sidebar.style.display = '';
    if (content) content.style.padding = '';

    if (this.messageSubscription) this.messageSubscription.unsubscribe();
    if (this.clearSubscription) this.clearSubscription.unsubscribe();
  }

  clearChat(): void {
    this.chatService.clearChat();
  }
}

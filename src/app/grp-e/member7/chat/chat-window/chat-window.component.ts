import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService, ChatMessage } from '../chat.service';

@Component({
  selector: 'app-m7-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy, AfterViewChecked {
  messages: ChatMessage[] = [];
  private messageSubscription!: Subscription;
  private clearSubscription!: Subscription;

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // Subscribe to incoming messages
    this.messageSubscription = this.chatService.message$.subscribe(msg => {
      this.messages.push(msg);
    });

    // Subscribe to clear commands
    this.clearSubscription = this.chatService.clear$.subscribe(() => {
      this.messages = [];
    });
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) this.messageSubscription.unsubscribe();
    if (this.clearSubscription) this.clearSubscription.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  get messageCount(): number {
    return this.messages.length;
  }

  get lastMessage(): string {
    if (this.messages.length === 0) return 'No messages yet';
    const last = this.messages[this.messages.length - 1];
    return `"${last.text}" by ${last.sender}`;
  }
}

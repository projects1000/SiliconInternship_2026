import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { WhatsappChatService, WaMessage, WaTyping } from '../whatsapp-chat.service';

@Component({
  selector: 'app-wa-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class WaChatWindowComponent implements OnInit, OnDestroy, AfterViewChecked {
  messages: WaMessage[] = [];
  typingUser: 'Aman' | 'Priya' | null = null;

  private messageSubscription!: Subscription;
  private clearSubscription!: Subscription;
  private typingSubscription!: Subscription;

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  constructor(private chatService: WhatsappChatService) {}

  ngOnInit(): void {
    // Subscribe to the messages observable
    this.messageSubscription = this.chatService.message$.subscribe(msg => {
      this.messages.push(msg);
      // Clear typing indicator for that sender once their message arrives
      if (this.typingUser === msg.sender) {
        this.typingUser = null;
      }
    });

    // Subscribe to the clear-chat observable
    this.clearSubscription = this.chatService.clear$.subscribe(() => {
      this.messages = [];
    });

    // Subscribe to the typing observable
    this.typingSubscription = this.chatService.typing$.subscribe((status: WaTyping) => {
      this.typingUser = status.isTyping ? status.sender : null;
    });
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) this.messageSubscription.unsubscribe();
    if (this.clearSubscription) this.clearSubscription.unsubscribe();
    if (this.typingSubscription) this.typingSubscription.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  clearChat(): void {
    this.chatService.clearChat();
  }
}

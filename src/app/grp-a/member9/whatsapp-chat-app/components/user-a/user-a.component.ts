import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ChatService, ChatMessage } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-a',
  templateUrl: './user-a.component.html',
  styleUrls: ['./user-a.component.css'],
})
export class UserAComponent implements OnInit, OnDestroy {
  @ViewChild('scrollMe') private chatContainer!: ElementRef;

  messageText: string = '';
  messages: ChatMessage[] = [];
  private messageSub!: Subscription;

  // Dynamic Island State Variables
  showDynamicIsland: boolean = false;
  notificationMessage: string = '';
  private notificationTimer: any;

  constructor(private chatService: ChatService) {}

  currentTime: string = '';

  updateTime() {
    this.currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  ngOnInit() {
    this.updateTime();

    setInterval(() => {
      this.updateTime();
    }, 1000);
    this.messageSub = this.chatService.messages$.subscribe(
      (msg: ChatMessage) => {
        this.messages.push(msg);
        this.scrollToBottom();

        // IF the message is NOT from Gents, trigger the Dynamic Island
        if (msg.sender !== 'Gents') {
          this.triggerNotification(msg);
        }
      },
    );
  }

  // Logic to show and auto-hide the island
  triggerNotification(msg: ChatMessage) {
    this.notificationMessage = msg.text;
    this.showDynamicIsland = true;

    // Clear any existing timer so multiple fast messages don't glitch it
    if (this.notificationTimer) clearTimeout(this.notificationTimer);

    // Hide the island after 3 seconds
    this.notificationTimer = setTimeout(() => {
      this.showDynamicIsland = false;
    }, 3000);
  }

  send() {
    if (this.messageText.trim() === '') return;
    this.chatService.sendMessage({
      sender: 'Gents',
      text: this.messageText,
      timestamp: new Date(),
    });
    this.messageText = '';
  }

  clearChat() {
    this.messages = [];
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatContainer)
        this.chatContainer.nativeElement.scrollTop =
          this.chatContainer.nativeElement.scrollHeight;
    }, 50);
  }

  ngOnDestroy() {
    if (this.messageSub) this.messageSub.unsubscribe();
  }

  get totalMessages(): number {
    return this.messages.length;
  }

  get lastMessage(): string {
    return this.messages.length > 0
      ? this.messages[this.messages.length - 1].text
      : 'No messages yet';
  }
}

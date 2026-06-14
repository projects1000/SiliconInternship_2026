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
  selector: 'app-user-b',
  templateUrl: './user-b.component.html',
  styleUrls: ['./user-b.component.css'],
})
export class UserBComponent implements OnInit, OnDestroy {
  @ViewChild('scrollMe') private chatContainer!: ElementRef;

  messageText: string = '';
  messages: ChatMessage[] = [];
  private messageSub!: Subscription;

  // 🔥 FIX: Added the missing state variables for the Dynamic Island
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

        // Trigger the island if the message is NOT from Mayur
        if (msg.sender !== 'Mayur') {
          this.triggerNotification(msg);
        }
      },
    );
  }

  // 🔥 FIX: Added the missing notification logic
  triggerNotification(msg: ChatMessage) {
    this.notificationMessage = msg.text;
    this.showDynamicIsland = true;

    // Clear existing timer so fast messages don't overlap awkwardly
    if (this.notificationTimer) clearTimeout(this.notificationTimer);

    // Hide after 3 seconds
    this.notificationTimer = setTimeout(() => {
      this.showDynamicIsland = false;
    }, 3000);
  }

  send() {
    if (this.messageText.trim() === '') return;

    this.chatService.sendMessage({
      sender: 'Mayur',
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
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTop =
          this.chatContainer.nativeElement.scrollHeight;
      }
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

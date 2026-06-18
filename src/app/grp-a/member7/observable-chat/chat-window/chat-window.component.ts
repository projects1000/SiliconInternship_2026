import {
  Component, OnInit, OnDestroy,
  ViewChild, ElementRef, AfterViewChecked
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService, ChatMessage } from '../chat.service';

export interface DisplayMessage extends ChatMessage {
  isNew: boolean;
}

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('chatBody') chatBody!: ElementRef;

  messages: DisplayMessage[] = [];
  gentsTyping = false;
  mayurTyping = false;
  private shouldScroll = false;

  private msgSub!: Subscription;
  private typSub!: Subscription;
  private clrSub!: Subscription;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // subscribe() — receives all messages from Observable stream
    this.msgSub = this.chatService.messages$.subscribe(msg => {
      const dm: DisplayMessage = { ...msg, isNew: true };
      this.messages.push(dm);
      this.shouldScroll = true;
      // Remove entrance animation class after it plays
      setTimeout(() => { dm.isNew = false; }, 600);
    });

    // subscribe() — typing indicator
    this.typSub = this.chatService.typing$.subscribe(({ user, typing }) => {
      if (user === 'gents') this.gentsTyping = typing;
      else this.mayurTyping = typing;
      if (typing) this.shouldScroll = true;
    });

    // subscribe() — clear all messages
    this.clrSub = this.chatService.clear$.subscribe(() => {
      this.messages = [];
      this.gentsTyping = false;
      this.mayurTyping = false;
    });
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  ngOnDestroy(): void {
    this.msgSub?.unsubscribe();
    this.typSub?.unsubscribe();
    this.clrSub?.unsubscribe();
  }

  private scrollToBottom(): void {
    try {
      const el = this.chatBody?.nativeElement;
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    } catch {}
  }

  clearChat(): void {
    this.chatService.clearAll();
  }

  formatTime(d: Date): string {
    return new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit', minute: '2-digit', hour12: true
    }).format(d);
  }

  trackById(_: number, m: DisplayMessage): number { return m.id; }
}

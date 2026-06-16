// src/app/grp-f/member10/member10-chatapp/chat-window/chat-window.component.ts

import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { Member10ChatService, ChatMessage } from '../chat.service';

@Component({
  selector: 'app-member10-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class Member10ChatWindowComponent implements OnInit, OnDestroy, AfterViewChecked {
  messages: ChatMessage[] = [];
  private subscription!: Subscription;

  @ViewChild('chatBody') private chatBody!: ElementRef;

  constructor(private chatService: Member10ChatService) {}

  ngOnInit(): void {
    this.subscription = this.chatService.message$.subscribe((msg: ChatMessage) => {
      this.messages.push(msg);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    } catch (e) {}
  }

  get lastMessage(): string {
    return this.messages.length > 0
      ? this.messages[this.messages.length - 1].text
      : '—';
  }

  clearChat(): void {
    this.messages = [];
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
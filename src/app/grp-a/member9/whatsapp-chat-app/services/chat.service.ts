import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Interface defining the structure of our chat messages
export interface ChatMessage {
  sender: 'Gents' | 'Mayur';
  text: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // 1. Subject & Observable for Messages
  private messageSource = new Subject<ChatMessage>();
  messages$ = this.messageSource.asObservable();

  // 2. Subject & Observable for Clearing Chat
  private clearChatSource = new Subject<void>();
  clearChat$ = this.clearChatSource.asObservable();

  // 3. Subject & Observable for Toast Notifications
  private toastSource = new Subject<string>();
  toasts$ = this.toastSource.asObservable();

  // Method to send a message to the stream
  sendMessage(msg: ChatMessage) {
    this.messageSource.next(msg);
    this.showToast(`New message from ${msg.sender}`);
  }

  // Method to trigger clearing the chat history
  clearChat() {
    this.clearChatSource.next();
    this.showToast('Chat history cleared!');
  }

  // Method to trigger a toast notification
  showToast(message: string) {
    this.toastSource.next(message);
  }
}
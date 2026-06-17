import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ChatMessage {
  sender: string;
  text: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // Subject jo naye messages ko broadcast karega
  private messageSource = new Subject<ChatMessage>();
  // Observable jisko components subscribe karenge
  message$ = this.messageSource.asObservable();

  // Clear chat ke liye bonus feature
  private clearSource = new Subject<void>();
  clear$ = this.clearSource.asObservable();

  constructor() { }

  // Message bhejne ka function
  sendMessage(msg: ChatMessage) {
    this.messageSource.next(msg); 
  }

  // Chat delete karne ka function
  clearChat() {
    this.clearSource.next();
  }
}
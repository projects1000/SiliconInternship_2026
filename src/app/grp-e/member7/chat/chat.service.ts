import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface ChatMessage {
  sender: 'Zen' | 'Mayur';
  text: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messageSource = new Subject<ChatMessage>();
  message$ = this.messageSource.asObservable();

  private clearSource = new Subject<void>();
  clear$ = this.clearSource.asObservable();

  sendMessage(sender: 'Zen' | 'Mayur', text: string): void {
    this.messageSource.next({
      sender,
      text,
      timestamp: new Date()
    });
  }

  clearChat(): void {
    this.clearSource.next();
  }
}

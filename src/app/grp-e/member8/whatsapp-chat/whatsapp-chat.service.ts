import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface WaMessage {
  sender: 'Aman' | 'Priya';
  text: string;
  timestamp: Date;
}

export interface WaTyping {
  sender: 'Aman' | 'Priya';
  isTyping: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class WhatsappChatService {
  private messageSource = new Subject<WaMessage>();
  message$: Observable<WaMessage> = this.messageSource.asObservable();

  private clearSource = new Subject<void>();
  clear$: Observable<void> = this.clearSource.asObservable();

  private typingSource = new Subject<WaTyping>();
  typing$: Observable<WaTyping> = this.typingSource.asObservable();

  sendMessage(sender: 'Aman' | 'Priya', text: string): void {
    this.messageSource.next({
      sender,
      text,
      timestamp: new Date()
    });
  }

  setTyping(sender: 'Aman' | 'Priya', isTyping: boolean): void {
    this.typingSource.next({ sender, isTyping });
  }

  clearChat(): void {
    this.clearSource.next();
  }
}

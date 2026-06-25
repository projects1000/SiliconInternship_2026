import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface ChatMessage {
  id: number;
  sender: 'gents' | 'mayur';
  senderName: string;
  message: string;
  timestamp: Date;
}

@Injectable()
export class ChatService {
  private counter = 0;

  // ── Core RxJS Subject (private — not exposed directly) ─────────────────
  private _messageSource = new Subject<ChatMessage>();
  private _typingSource  = new Subject<{ user: 'gents' | 'mayur'; typing: boolean }>();
  private _clearSource   = new Subject<void>();

  // ── Public Observable streams (asObservable hides next()) ─────────────
  messages$: Observable<ChatMessage>                             = this._messageSource.asObservable();
  typing$:   Observable<{ user: 'gents' | 'mayur'; typing: boolean }> = this._typingSource.asObservable();
  clear$:    Observable<void>                                    = this._clearSource.asObservable();

  // ── Send a chat message via Subject.next() ─────────────────────────────
  sendMessage(sender: 'gents' | 'mayur', text: string): void {
    const msg: ChatMessage = {
      id: ++this.counter,
      sender,
      senderName: sender === 'gents' ? 'Gents' : 'Mayur',
      message: text.trim(),
      timestamp: new Date()
    };
    this._messageSource.next(msg);   // 📡 broadcasts to all subscribers
  }

  // ── Typing indicator ───────────────────────────────────────────────────
  setTyping(user: 'gents' | 'mayur', typing: boolean): void {
    this._typingSource.next({ user, typing });
  }

  // ── Clear all chat history ─────────────────────────────────────────────
  clearAll(): void {
    this.counter = 0;
    this._clearSource.next();
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatMessage, ChatSender } from '../models/chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messageSource = new Subject<ChatMessage>();
  message$ = this.messageSource.asObservable();

  sendMessage(text: string, sender: ChatSender): void {
    this.messageSource.next({
      sender,
      text,
      timestamp: new Date(),
    });
  }
}

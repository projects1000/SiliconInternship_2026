// grp-b/member1/member1-whatsapp/services/chat.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatMessage } from '../models/chat.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor() {}
  // A Subject acts as both an Observable and an Observer
  private messageSource = new Subject<ChatMessage>();

  // Expose as an observable stream for components to subscribe to
  message$ = this.messageSource.asObservable();

  sendMessage(text: string, sender: 'Gents' | 'Mayur') {
    const newMessage: ChatMessage = {
      sender,
      text,
      timestamp: new Date(),
    };
    // Emit the next data item into the streaming loop pipeline
    this.messageSource.next(newMessage);
  }
}
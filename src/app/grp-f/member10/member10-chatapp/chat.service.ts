// src/app/grp-f/member10/member10-chatapp/chat.service.ts

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface ChatMessage {
  sender: string;
  text: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class Member10ChatService {
  private messageSource = new Subject<ChatMessage>();
  message$: Observable<ChatMessage> = this.messageSource.asObservable();

  sendMessage(msg: ChatMessage): void {
    this.messageSource.next(msg);
  }
}

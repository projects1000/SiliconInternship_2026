import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ChatMessage {
  sender: string;
  text: string;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private messageSource = new Subject<ChatMessage>();

  messages$ = this.messageSource.asObservable();

  sendMessage(message: ChatMessage) {
    this.messageSource.next(message);
  }
}
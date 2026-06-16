import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private messageSource =
    new BehaviorSubject<ChatMessage[]>([]);

  messages$ = this.messageSource.asObservable();

  sendMessage(message: ChatMessage) {

    const currentMessages =
      this.messageSource.value;

    this.messageSource.next([
      ...currentMessages,
      message
    ]);
  }
  clearMessages() {

  this.messageSource.next([]);
}
private typingSource =new BehaviorSubject<string>('');
typing$ =this.typingSource.asObservable();

private typingTimeout: any;

setTyping(user: string) {

  this.typingSource.next(user);

  clearTimeout(this.typingTimeout);

  this.typingTimeout = setTimeout(() => {

    this.typingSource.next('');

  }, 2000);

}
}
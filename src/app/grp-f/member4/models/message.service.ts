import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Message {
  sender: string;
  text: string;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageSource = new Subject<Message>();

  messages$ = this.messageSource.asObservable();

  sendMessage(message: Message) {
    this.messageSource.next(message);
  }
}
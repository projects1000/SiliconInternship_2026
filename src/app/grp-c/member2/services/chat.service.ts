import { Injectable } from '@angular/core';
import {
  Subject,
  BehaviorSubject
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private messageSubject =
    new Subject<any>();

  messages$ =
    this.messageSubject.asObservable();

  sendMessage(message: any) {
    this.messageSubject.next(message);
  }

  private typingSubject =
    new BehaviorSubject<string>('');

  typing$ =
    this.typingSubject.asObservable();

  setTyping(user: string) {
    this.typingSubject.next(user);
  }

}
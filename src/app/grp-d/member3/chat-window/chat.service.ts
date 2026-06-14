import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private messageSource = new Subject<{user: string, text: string, time: string}>();
  message$ = this.messageSource.asObservable();

  sendMessage(user: string, text: string) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.messageSource.next({ user, text, time });
  }
}
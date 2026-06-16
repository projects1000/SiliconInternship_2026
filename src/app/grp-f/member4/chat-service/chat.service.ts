// member4/chat.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Message {
  sender: string;
  text: string;
  time: string;
  type: 'sent' | 'received';
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<Message[]>([
  
  ]);
  
  messages$ = this.messagesSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<string>('Student A');
  currentUser$ = this.currentUserSubject.asObservable();

  addMessage(sender: string, text: string) {
    const currentMessages = this.messagesSubject.value;
    const newMessage: Message = {
      sender: sender,
      text: text,
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      type: 'sent'
    };
    this.messagesSubject.next([...currentMessages, newMessage]);
  }

  sendMessage(sender: string, text: string) {
    this.addMessage(sender, text);
  }

  setCurrentUser(user: string) {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): string {
    return this.currentUserSubject.value;
  }

  clearChat() {
    this.messagesSubject.next([]);
  }
}
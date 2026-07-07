import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  shareReplay
} from 'rxjs';
import { CHAT_USERS } from '../constants/chat.constants';
import { ChatMessage, ChatUser, ChatUserId } from '../models/chat.models';

@Injectable()
export class ChatService {
  private readonly messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  private readonly searchQuerySubject = new BehaviorSubject<string>('');

  readonly messages$ = this.messagesSubject.asObservable();
  readonly searchQuery$ = this.searchQuerySubject.asObservable();

  readonly filteredMessages$ = combineLatest([
    this.messagesSubject,
    this.searchQuerySubject
  ]).pipe(
    map(([messages, query]) => {
      const normalized = query.trim().toLowerCase();
      if (!normalized) {
        return messages;
      }

      return messages.filter(message =>
        message.text.toLowerCase().includes(normalized) ||
        message.sender.toLowerCase().includes(normalized)
      );
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly users: ChatUser[] = CHAT_USERS;

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  sendMessage(sender: ChatUserId, text: string): void {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }

    const nextMessage: ChatMessage = {
      id: `msg-${Date.now()}-${sender.replace(' ', '')}`,
      sender,
      text: trimmed,
      timestamp: new Date()
    };

    this.messagesSubject.next([
      ...this.messagesSubject.getValue(),
      nextMessage
    ]);
  }

  getUser(id: ChatUserId): ChatUser | undefined {
    return this.users.find(user => user.id === id);
  }
}

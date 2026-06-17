import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isEdited?: boolean;
  type?: 'text' | 'audio' | 'folder';
  audioUrl?: any;
  folderData?: {
    folderName: string;
    fileCount: number;
    totalSize: string;
    files: { name: string; size: string }[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messages: ChatMessage[] = [];
  private messageSource = new BehaviorSubject<ChatMessage[]>([]);
  messages$ = this.messageSource.asObservable();

  constructor() { }

  sendMessage(msg: Omit<ChatMessage, 'id'>) {
    const newMessage: ChatMessage = {
      ...msg,
      id: Math.random().toString(36).substring(2, 9)
    };
    this.messages.push(newMessage);
    this.messageSource.next([...this.messages]);
  }

  editMessage(id: string, newText: string) {
    const index = this.messages.findIndex(m => m.id === id);
    if (index !== -1) {
      this.messages[index].text = newText;
      this.messages[index].isEdited = true;
      this.messageSource.next([...this.messages]);
    }
  }

  deleteMessage(id: string) {
    this.messages = this.messages.filter(m => m.id !== id);
    this.messageSource.next([...this.messages]);
  }

  clearChat() {
    this.messages = [];
    this.messageSource.next([...this.messages]);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
}

export interface ChatMessage {
  id: string;
  sender: string;    
  recipient: string; 
  text?: string;
  mediaType: 'text' | 'image' | 'file' | 'voice';
  mediaUrl?: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messages: ChatMessage[] = [];
  private messageStream = new Subject<ChatMessage[]>();
  messages$ = this.messageStream.asObservable();

  private contactsPhoneA = new BehaviorSubject<Contact[]>([
    { id: 'c1', name: 'Mayur', avatar: 'https://i.pravatar.cc/100?img=47', lastMessage: 'Tap to chat', time: '12:35', unreadCount: 0 }
  ]);
  private contactsPhoneB = new BehaviorSubject<Contact[]>([
    { id: 'c2', name: 'Gents', avatar: 'https://i.pravatar.cc/100?img=11', lastMessage: 'Tap to chat', time: '12:35', unreadCount: 0 }
  ]);

  contactsPhoneA$ = this.contactsPhoneA.asObservable();
  contactsPhoneB$ = this.contactsPhoneB.asObservable();

  private activeTargetPhoneA = new BehaviorSubject<string>('Mayur');
  private activeTargetPhoneB = new BehaviorSubject<string>('Gents');
  activeTargetPhoneA$ = this.activeTargetPhoneA.asObservable();
  activeTargetPhoneB$ = this.activeTargetPhoneB.asObservable();

  private typingState = new BehaviorSubject<{ [key: string]: string }>({});
  typingState$ = this.typingState.asObservable();

  private notificationStream = new Subject<{ receiver: 'A' | 'B'; sender: string; text: string }>();
  notifications$ = this.notificationStream.asObservable();

  getMessagesForSession(user1: string, user2: string): ChatMessage[] {
    return this.messages.filter(m => 
      (m.sender === user1 && m.recipient === user2) || 
      (m.sender === user2 && m.recipient === user1)
    );
  }

  setPhoneTarget(phone: 'A' | 'B', targetName: string) {
    if (phone === 'A') {
      this.activeTargetPhoneA.next(targetName);
      if (targetName) this.resetUnreadCount('A', targetName);
    } else {
      this.activeTargetPhoneB.next(targetName);
      if (targetName) this.resetUnreadCount('B', targetName);
    }
    this.messageStream.next([...this.messages]);
  }

  sendMessage(sender: string, recipient: string, text: string, mediaType: 'text' | 'image' | 'file' | 'voice' = 'text', mediaUrl?: string) {
    // 1. Immediately force typing state to drop clear
    this.setTyping(sender, recipient, false);

    const newMessage: ChatMessage = {
      id: 'msg-' + Math.random().toString(36).substring(2, 9),
      sender,
      recipient,
      text,
      mediaType,
      mediaUrl,
      timestamp: new Date(),
      status: 'sent'
    };

    this.messages.push(newMessage);

    // 2. Safety Check: Automatically check contact profiles
    this.ensureContactExists(sender, recipient);

    // Fixed Routing: Maps recipient "Mayur" to active phone target A stream, and recipient "Gents" to target B stream
    const activeViewOnTarget = recipient === 'Mayur' ? this.activeTargetPhoneA.getValue() : this.activeTargetPhoneB.getValue();
    
    if (activeViewOnTarget === sender) {
      newMessage.status = 'read';
    } else {
      newMessage.status = 'delivered';
      this.incrementUnreadCount(recipient === 'Mayur' ? 'A' : 'B', sender, text || 'Sent an attachment');
      
      this.notificationStream.next({
        receiver: recipient === 'Mayur' ? 'A' : 'B',
        sender,
        text: mediaType === 'text' ? text : `Sent a media attachment`
      });
    }

    this.messageStream.next([...this.messages]);
  }

  // Individual message deletion function
  deleteSingleMessage(msgId: string) {
    this.messages = this.messages.filter(m => m.id !== msgId);
    this.messageStream.next([...this.messages]);
  }

  clearSessionHistory(user1: string, user2: string) {
    this.messages = this.messages.filter(m => 
      !((m.sender === user1 && m.recipient === user2) || 
        (m.sender === user2 && m.recipient === user1))
    );
    this.messageStream.next([...this.messages]);
  }

  deleteContactProfile(phone: 'A' | 'B', name: string) {
    if (phone === 'A') {
      this.contactsPhoneA.next(this.contactsPhoneA.getValue().filter(c => c.name !== name));
      this.setPhoneTarget('A', '');
    } else {
      this.contactsPhoneB.next(this.contactsPhoneB.getValue().filter(c => c.name !== name));
      this.setPhoneTarget('B', '');
    }
  }

  setTyping(sender: string, target: string, isTyping: boolean) {
    const current = this.typingState.getValue();
    const key = sender + '->' + target;
    if (isTyping) {
      current[key] = 'Typing...';
    } else {
      delete current[key];
    }
    this.typingState.next({ ...current });
  }

  private ensureContactExists(sender: string, recipient: string) {
    if (sender === 'Gents') {
      const rosterB = this.contactsPhoneB.getValue();
      if (!rosterB.some(c => c.name === 'Gents')) {
        const fallback: Contact = {
          id: 'cnt-auto', name: 'Gents', avatar: 'https://i.pravatar.cc/100?img=11',
          lastMessage: 'Channel Re-established', time: 'Now', unreadCount: 0
        };
        this.contactsPhoneB.next([...rosterB, fallback]);
      }
    } 
    else if (sender === 'Mayur') {
      const rosterA = this.contactsPhoneA.getValue();
      if (!rosterA.some(c => c.name === 'Mayur')) {
        const fallback: Contact = {
          id: 'cnt-auto', name: 'Mayur', avatar: 'https://i.pravatar.cc/100?img=47',
          lastMessage: 'Channel Re-established', time: 'Now', unreadCount: 0
        };
        this.contactsPhoneA.next([...rosterA, fallback]);
      }
    }
  }

  private incrementUnreadCount(phone: 'A' | 'B', senderName: string, text: string) {
    const subject = phone === 'A' ? this.contactsPhoneA : this.contactsPhoneB;
    const list = subject.getValue().map(c => {
      if (c.name === senderName) {
        return { ...c, unreadCount: c.unreadCount + 1, lastMessage: text, time: 'Now' };
      }
      return c;
    });
    subject.next(list);
  }

  private resetUnreadCount(phone: 'A' | 'B', targetName: string) {
    const subject = phone === 'A' ? this.contactsPhoneA : this.contactsPhoneB;
    const list = subject.getValue().map(c => {
      if (c.name === targetName) return { ...c, unreadCount: 0 };
      return c;
    });
    subject.next(list);
  }

  addNewContact(phone: 'A' | 'B', name: string) {
    if (!name.trim()) return;
    const randomId = Math.floor(Math.random() * 70);
    const item: Contact = {
      id: 'cnt-' + Math.random().toString(36).substring(2, 5),
      name, avatar: `https://i.pravatar.cc/100?img=${randomId}`,
      lastMessage: 'Connected channel', time: 'Now', unreadCount: 0
    };
    if (phone === 'A') this.contactsPhoneA.next([...this.contactsPhoneA.getValue(), item]);
    else this.contactsPhoneB.next([...this.contactsPhoneB.getValue(), item]);
  }
}
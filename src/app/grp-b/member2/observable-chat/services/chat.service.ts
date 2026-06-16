import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { ChatMessage, ChatStatistics, MessageType } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // Core: Subject and Observable for messages
  private messageSubject = new Subject<ChatMessage>();
  public messages$ = this.messageSubject.asObservable();

  // State maintenance for appending messages
  private messageHistory: ChatMessage[] = [];
  
  // Typing indicators
  private typingSubject = new BehaviorSubject<{ userA: boolean; userB: boolean }>({ userA: false, userB: false });
  public typing$ = this.typingSubject.asObservable();

  // Statistics
  private statsSubject = new BehaviorSubject<ChatStatistics>({
    totalMessages: 0,
    filesShared: 0,
    imagesShared: 0,
    lastMessage: null,
    activeSubscribers: 0
  });
  public stats$ = this.statsSubject.asObservable();

  // Online status (always online for this demo)
  public onlineStatus$ = new BehaviorSubject<{ userA: boolean; userB: boolean }>({ userA: true, userB: true }).asObservable();

  constructor() {}

  // Emulate active subscribers count
  registerSubscriber() {
    const currentStats = this.statsSubject.value;
    this.statsSubject.next({ ...currentStats, activeSubscribers: currentStats.activeSubscribers + 1 });
  }

  unregisterSubscriber() {
    const currentStats = this.statsSubject.value;
    this.statsSubject.next({ ...currentStats, activeSubscribers: Math.max(0, currentStats.activeSubscribers - 1) });
  }

  // Get current history (useful for initial load)
  getHistory(): ChatMessage[] {
    return [...this.messageHistory];
  }

  sendMessage(senderId: 'userA' | 'userB', senderName: string, text: string) {
    const msg: ChatMessage = {
      id: this.generateId(),
      senderId,
      senderName,
      message: text,
      type: 'text',
      timestamp: new Date()
    };
    this.pushMessage(msg);
  }

  sendFile(senderId: 'userA' | 'userB', senderName: string, file: File, type: MessageType) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const msg: ChatMessage = {
        id: this.generateId(),
        senderId,
        senderName,
        message: type === 'image' ? 'Image shared' : 'File shared',
        type,
        fileName: file.name,
        fileSize: this.formatBytes(file.size),
        fileUrl: e.target.result, // Data URL for preview
        timestamp: new Date()
      };
      this.pushMessage(msg);
    };
    reader.readAsDataURL(file);
  }

  private pushMessage(msg: ChatMessage) {
    this.messageHistory.push(msg); // Append to history
    this.messageSubject.next(msg); // Emit via Subject

    // Update stats
    const stats = this.statsSubject.value;
    this.statsSubject.next({
      ...stats,
      totalMessages: stats.totalMessages + 1,
      filesShared: msg.type === 'file' ? stats.filesShared + 1 : stats.filesShared,
      imagesShared: msg.type === 'image' ? stats.imagesShared + 1 : stats.imagesShared,
      lastMessage: msg
    });
  }

  setTyping(user: 'userA' | 'userB', isTyping: boolean) {
    const current = this.typingSubject.value;
    this.typingSubject.next({ ...current, [user]: isTyping });
  }

  clearChat() {
    this.messageHistory = [];
    const stats = this.statsSubject.value;
    this.statsSubject.next({
      ...stats,
      totalMessages: 0,
      filesShared: 0,
      imagesShared: 0,
      lastMessage: null
    });
    // Emit a special clear event if needed, but for now we just return empty array on getHistory
    // To handle UI clearing, we can push a clear signal, but typically components reload from history.
    // Let's emit a specific 'clear' message type (hidden in UI) or handle it gracefully.
    // For simplicity, we can emit a null-like message to notify subscribers to clear their arrays.
    this.messageSubject.next({
      id: 'CLEAR',
      senderId: 'userA',
      senderName: 'System',
      message: 'CLEAR',
      type: 'text',
      timestamp: new Date()
    });
  }

  exportChat() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.messageHistory, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "chat-export.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
}

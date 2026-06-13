import { Component, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { ChatService, ChatMessage } from '../chat.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy, AfterViewChecked {
  messages: ChatMessage[] = [];
  private subscription: Subscription = new Subscription();
  @ViewChild('chatScroll') private chatScrollContainer!: ElementRef;

  editingMessageId: string | null = null;
  editText: string = '';

  constructor(private chatService: ChatService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.subscription.add(
      this.chatService.messages$.subscribe(msgs => {
        this.messages = msgs.map(msg => {
          if (msg.type === 'audio' && msg.audioUrl && typeof msg.audioUrl === 'string') {
            return {
              ...msg,
              audioUrl: this.sanitizer.bypassSecurityTrustUrl(msg.audioUrl)
            };
          }
          return msg;
        });
      })
    );
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clearChat() {
    this.chatService.clearChat();
  }

  startEdit(msg: ChatMessage) {
    if (msg.type === 'text' || !msg.type) {
      this.editingMessageId = msg.id;
      this.editText = msg.text;
    }
  }

  saveEdit() {
    if (this.editingMessageId && this.editText.trim()) {
      this.chatService.editMessage(this.editingMessageId, this.editText.trim());
      this.editingMessageId = null;
      this.editText = '';
    }
  }

  cancelEdit() {
    this.editingMessageId = null;
    this.editText = '';
  }

  deleteMessage(id: string) {
    this.chatService.deleteMessage(id);
  }

  get totalMessages(): number {
    return this.messages.length;
  }

  get lastMessage(): string {
    if (this.messages.length === 0) return 'No messages yet';
    return this.messages[this.messages.length - 1].text;
  }
}

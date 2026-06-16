import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  
  messages: ChatMessage[] = [];
  filteredMessages: ChatMessage[] = [];
  searchQuery = '';
  
  typingA = false;
  typingB = false;

  private messageSub!: Subscription;
  private typingSub!: Subscription;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.registerSubscriber();
    
    // Load initial history
    this.messages = this.chatService.getHistory();
    this.filterMessages();

    // Subscribe to new messages
    this.messageSub = this.chatService.messages$.subscribe(msg => {
      if (msg.id === 'CLEAR') {
        this.messages = [];
      } else {
        // We append messages, never overwrite
        this.messages.push(msg);
      }
      this.filterMessages();
    });

    // Subscribe to typing indicator
    this.typingSub = this.chatService.typing$.subscribe(typing => {
      this.typingA = typing.userA;
      this.typingB = typing.userB;
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  filterMessages() {
    if (!this.searchQuery) {
      this.filteredMessages = [...this.messages];
      return;
    }
    const q = this.searchQuery.toLowerCase();
    this.filteredMessages = this.messages.filter(m => 
      m.message.toLowerCase().includes(q) || 
      m.senderName.toLowerCase().includes(q) ||
      (m.fileName && m.fileName.toLowerCase().includes(q))
    );
  }

  clearChat() {
    if (confirm('Are you sure you want to clear the conversation?')) {
      this.chatService.clearChat();
    }
  }

  exportChat() {
    this.chatService.exportChat();
  }

  downloadFile(url: string | undefined, fileName: string | undefined) {
    if (!url || !fileName) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
  }

  ngOnDestroy() {
    if (this.messageSub) this.messageSub.unsubscribe();
    if (this.typingSub) this.typingSub.unsubscribe();
    this.chatService.unregisterSubscriber();
  }
}

// member4/student-b/student-b.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChatService, Message } from '../chat-service/chat.service';

@Component({
  selector: 'app-student-b',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-b.component.html',
  styleUrls: ['./student-b.component.css']
})
export class StudentBComponent implements OnInit, OnDestroy {
  // ✅ ALL messages in one conversation
  allMessages: Message[] = [];
  message: string = '';
  private sub!: Subscription;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.sub = this.chatService.messages$.subscribe((messages: Message[]) => {
      // ✅ Show ALL messages (both Student A and Student B)
      this.allMessages = messages;
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  sendMessage() {
    if (this.message.trim()) {
      this.chatService.addMessage('Student B', this.message.trim());
      this.message = '';
    }
  }
}
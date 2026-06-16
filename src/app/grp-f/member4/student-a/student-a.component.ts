// member4/student-a/student-a.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChatService, Message } from '../chat-service/chat.service';

@Component({
  selector: 'app-student-a',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-a.component.html',
  styleUrls: ['./student-a.component.css']
})
export class StudentAComponent implements OnInit, OnDestroy {
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
      this.chatService.addMessage('Student A', this.message.trim());
      this.message = '';
    }
  }
}
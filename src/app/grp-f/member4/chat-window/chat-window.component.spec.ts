// member4/chat-window/chat-window.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';  // ✅ Add Router
import { Subscription } from 'rxjs';
import { ChatService, Message } from '../chat-service/chat.service';
import { StudentAComponent } from '../student-a/student-a.component';
import { StudentBComponent } from '../student-b/student-b.component';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    StudentAComponent,
    StudentBComponent
  ],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  messageInput: string = '';
  messageInputB: string = '';
  isDark: boolean = false;
  private sub!: Subscription;

  constructor(
    private chatService: ChatService,
    private router: Router  // ✅ Inject Router
  ) {}

  ngOnInit() {
    this.sub = this.chatService.messages$.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  toggleMode() {
    this.isDark = !this.isDark;
  }

  // ✅ Back to Home function
  goBack() {
    this.router.navigate(['/']);
  }

  sendAsStudentA() {
    if (this.messageInput.trim()) {
      this.chatService.addMessage('Student A', this.messageInput);
      this.messageInput = '';
    }
  }

  sendAsStudentB() {
    if (this.messageInputB.trim()) {
      this.chatService.addMessage('Student B', this.messageInputB);
      this.messageInputB = '';
    }
  }

  clearChat() {
    this.chatService.clearChat();
  }
}
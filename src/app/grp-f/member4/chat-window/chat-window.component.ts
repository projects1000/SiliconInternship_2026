// member4/chat-window/chat-window.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  isDark: boolean = false;
  private sub!: Subscription;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.sub = this.chatService.messages$.subscribe(() => {
      // Messages updated
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

  goBack() {
    window.history.back();
  }

  clearChat() {
    this.chatService.clearChat();
  }
}
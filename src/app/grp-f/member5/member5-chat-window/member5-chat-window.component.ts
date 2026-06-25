import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Member5ChatService } from '../services/member5-chat.service';
import { Member5GentsComponent } from '../member5-gents/member5-gents.component';
import { Member5MayurComponent } from '../member5-mayur/member5-mayur.component';

@Component({
  selector: 'app-member5-chat-window',
  standalone: true,

  imports: [
    CommonModule,
    Member5GentsComponent,
    Member5MayurComponent
  ],

  templateUrl: './member5-chat-window.component.html',
  styleUrls: ['./member5-chat-window.component.css']
})
export class Member5ChatWindowComponent implements OnInit {

  messages: any[] = [];

  constructor(
    private chatService: Member5ChatService
  ) {}

  ngOnInit() {
    this.chatService.messages$
      .subscribe(message => {
        this.messages.push(message);
      });
  }

  clearChat() {
    this.messages = [];
  }

  get totalMessages() {
    return this.messages.length;
  }

  get lastMessage() {
    if (!this.messages.length) {
      return 'No Messages';
    }

    return this.messages[this.messages.length - 1].text;
  }
}
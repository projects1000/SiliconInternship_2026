import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ChatMessage } from '../models/chat-message.model';
import {ElementRef, ViewChild} from '@angular/core';
@Component({
  selector: 'app-member8-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class Member8ChatWindowComponent implements OnInit {

  messages: ChatMessage[] = [];

  constructor(private chatService: ChatService) {}
    typingUser = '';
  ngOnInit(): void {
    this.chatService.messages$.subscribe(data=>{

 this.messages = data;

 setTimeout(()=>{

  this.chatContainer
  .nativeElement
  .scrollTop =

  this.chatContainer
  .nativeElement
  .scrollHeight;

 });

});
this.chatService.typing$
.subscribe(user => {

  this.typingUser = user;

});
  }

 clearChat() {

  this.chatService.clearMessages();

}

  get lastMessage() {

    if(this.messages.length === 0) {
      return 'No messages';
    }

    return this.messages[this.messages.length - 1].text;
  }
@ViewChild('chatContainer')
chatContainer!: ElementRef;

currentTime = new Date();
}

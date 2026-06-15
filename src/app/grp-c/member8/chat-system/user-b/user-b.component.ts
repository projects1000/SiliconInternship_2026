import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';
@Component({
  selector: 'app-member8-user-b',
  templateUrl: './user-b.component.html',
  styleUrls: ['./user-b.component.css']
})
export class Member8UserBComponent{
  messageText = '';

  constructor(
    private chatService: ChatService
  ) {}

  sendMessage() {

    if(!this.messageText.trim()) return;

    this.chatService.sendMessage({

     sender: 'Sohan',

      text: this.messageText,

      timestamp:
        new Date().toLocaleTimeString([], {
          hour:'2-digit',
          minute:'2-digit'
        })
    });
    
    this.chatService.setTyping('');
    this.messageText = '';
  }
  onTyping(){
 this.chatService.setTyping('sohan');
}
}

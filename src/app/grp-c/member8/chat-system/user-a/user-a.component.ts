import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-member8-user-a',
  templateUrl: './user-a.component.html',
  styleUrls: ['./user-a.component.css']
})
export class Member8UserAComponent{
   messageText = '';

  constructor(
    private chatService: ChatService
  ) {}

  sendMessage() {

    if(!this.messageText.trim()) return;

    this.chatService.sendMessage({

      sender: 'Debashis',
    
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
 this.chatService.setTyping('Debashis');
}
  
}

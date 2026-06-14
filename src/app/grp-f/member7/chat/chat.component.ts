import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  user1Message = '';
  user2Message = '';

  messageCount = 0;

  messages:any[] = [

    {
      sender:'User1',
      text:'Hi 👋',
      time:new Date().toLocaleTimeString()
    },

    {
      sender:'User2',
      text:'Hello 😉',
      time:new Date().toLocaleTimeString()
    }

  ];

  sendUser1(){

    if(this.user1Message.trim()=='') return;

    this.messages.push({
      sender:'User1',
      text:this.user1Message,
      time:new Date().toLocaleTimeString()
    });

    this.messageCount++;

    this.user1Message='';
  }

  sendUser2(){

    if(this.user2Message.trim()=='') return;

    this.messages.push({
      sender:'User2',
      text:this.user2Message,
      time:new Date().toLocaleTimeString()
    });

    this.messageCount++;

    this.user2Message='';
  }

  addEmojiUser1(emoji:string){
    this.user1Message += emoji;
  }

  addEmojiUser2(emoji:string){
    this.user2Message += emoji;
  }

  clearChat(){

    this.messages = [];

    this.messageCount = 0;
  }

}
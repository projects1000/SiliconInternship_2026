import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  messages:any[]=[];

  notification='';

  constructor(private chatService:ChatService){}

  ngOnInit(): void {

    this.chatService.messages$
    .subscribe(msg=>{

      this.messages.push(msg);

      this.notification =
      `📩 Message from ${msg.sender}`;

      setTimeout(()=>{
        this.notification='';
      },3000);

    });

  }

}
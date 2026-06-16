import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-meloni',
  templateUrl: './meloni.component.html',
  styleUrls: ['./meloni.component.css']
})
export class MeloniComponent {

  message='';

  constructor(private chatService:ChatService){}

  send(){

    if(this.message.trim()){

      this.chatService.sendMessage({
        sender:'Meloni',
        text:this.message,
        time:new Date()
      });

      this.message='';
    }

  }

}
import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-modi',
  templateUrl: './modi.component.html',
  styleUrls: ['./modi.component.css']
})
export class ModiComponent {

  message = '';

  constructor(private chatService: ChatService) {}

  send() {

    if(this.message.trim()){

      this.chatService.sendMessage({

        sender:'Modi',

        text:this.message,

        time:new Date().toLocaleTimeString([],{
          hour:'2-digit',
          minute:'2-digit'
        })

      });

      this.message='';

    }

  }

}

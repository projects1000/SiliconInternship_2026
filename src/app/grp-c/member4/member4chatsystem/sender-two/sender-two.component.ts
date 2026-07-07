import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-sender-two',
  templateUrl: './sender-two.component.html',
  styleUrls: ['./sender-two.component.css']
})
export class SenderTwoComponent {

  message = '';

  messages:any[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {

    this.chatService.userOneMessage$.subscribe(data => {

      this.messages.push({
        text: data,
        type: 'received'
      });

    });

  }

  sendMessage() {

    if(this.message.trim() !== '') {

      this.messages.push({
        text: this.message,
        type: 'sent'
      });

      this.chatService.sendFromUserTwo(this.message);

      this.message = '';

    }

  }

}
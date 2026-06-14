import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-sender-one',
  templateUrl: './sender-one.component.html',
  styleUrls: ['./sender-one.component.css']
})
export class SenderOneComponent {

  message = '';

messages:any[] = [];

constructor(private chatService: ChatService) {}

ngOnInit(): void {
  this.chatService.userTwoMessage$.subscribe(data => {
    this.messages.push({
      text: data,
      type: 'received'
    });
  });
}

sendMessage() {
  if (this.message.trim() !== '') {

    this.messages.push({
      text: this.message,
      type: 'sent'
    });

    this.chatService.sendFromUserOne(this.message);

    this.message = '';
  }
}
}
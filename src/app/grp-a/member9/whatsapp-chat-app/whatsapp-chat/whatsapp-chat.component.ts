import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-whatsapp-chat',
  templateUrl: './whatsapp-chat.component.html',
  styleUrls: ['./whatsapp-chat.component.css']
})
export class WhatsappChatComponent implements OnInit {

  toasts: string[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {

    this.chatService.toasts$.subscribe(message => {

      this.toasts.push(message);

      setTimeout(() => {
        this.toasts.shift();
      }, 3000);

    });

  }
}
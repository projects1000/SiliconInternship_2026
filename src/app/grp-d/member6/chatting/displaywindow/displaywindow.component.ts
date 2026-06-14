import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-displaywindow',
  templateUrl: './displaywindow.component.html',
  styleUrls: ['./displaywindow.component.css']
})
export class DisplaywindowComponent implements OnInit {

  messages: any[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {

    this.chatService.messages$.subscribe((msg: any) => {
      this.messages.push(msg);
    });

  }

}

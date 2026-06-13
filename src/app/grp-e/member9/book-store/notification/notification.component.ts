import { Component } from '@angular/core';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  messages: string[] = [];

  constructor(private messageService: MessageService) {
    this.messageService.message$.subscribe(message => {
      this.messages.push(message);

      setTimeout(() => {
        this.messages.shift();
      }, 3000);
    });
  }
}
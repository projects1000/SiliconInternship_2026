import { Component, OnInit } from '@angular/core';
import { NotificationService }
  from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  messages: string[] = [];

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {

  this.notificationService.messages$
    .subscribe(message => {

      this.messages.push(message);

      setTimeout(() => {

        const index =
          this.messages.indexOf(message);

        if (index > -1) {

          this.messages.splice(index, 1);

        }

      }, 3000);

    });

}

}

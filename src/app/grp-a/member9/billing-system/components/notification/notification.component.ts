import { Component, OnInit } from '@angular/core';
import { AppNotification } from '../../models';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  // Array to hold all the messages we receive
  notifications: AppNotification[] = [];

  // Inject the shared service
  constructor(private notificationService: NotificationService) {}

  // ngOnInit runs exactly once when the component loads
  ngOnInit() {
    // Subscribe to the Observable. Whenever a new message is sent, this block runs.
    this.notificationService.currentMessage$.subscribe((msg) => {
      // Add the new message to the top of our array
      this.notifications.unshift(msg);
    });
  }
}

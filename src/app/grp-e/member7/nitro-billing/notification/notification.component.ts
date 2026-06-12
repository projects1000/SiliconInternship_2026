import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BillingNotificationService, NotificationMessage } from '../billing-notification.service';

@Component({
  selector: 'app-m7-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  activeNotifications: NotificationMessage[] = [];
  private subscription!: Subscription;

  constructor(private notificationService: BillingNotificationService) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.getNotifications().subscribe(msg => {
      this.activeNotifications.push(msg);
      // Auto-remove after 4 seconds
      setTimeout(() => {
        this.removeNotification(msg.id);
      }, 4000);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  removeNotification(id: number): void {
    this.activeNotifications = this.activeNotifications.filter(n => n.id !== id);
  }
}

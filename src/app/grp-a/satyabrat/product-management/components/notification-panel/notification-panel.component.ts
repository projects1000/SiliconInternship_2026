import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BillingService, NotificationMessage } from '../../services/billing.service';

@Component({
  selector: 'app-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.css']
})
export class NotificationPanelComponent implements OnInit, OnDestroy {
  notifications: NotificationMessage[] = [];
  private subscription!: Subscription;

  constructor(private billingService: BillingService) {}

  ngOnInit() {
    this.subscription = this.billingService.notifications$.subscribe(msg => {
      // Add the message to the top of the list
      this.notifications.unshift(msg);
      // Keep only the last 10 notifications to prevent cluttering
      if (this.notifications.length > 10) {
        this.notifications.pop();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  clearNotifications() {
    this.notifications = [];
  }
}

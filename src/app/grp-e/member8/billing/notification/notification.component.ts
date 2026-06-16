import { Component, OnInit } from '@angular/core';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  messages: string[] = [];
  private hideTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private billingService: BillingService) {}

  ngOnInit(): void {
    this.billingService.notifications$.subscribe(messages => {
      this.messages = messages;

      if (messages.length > 0) {
        this.startHideTimer();
      }
    });
  }

  private startHideTimer(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }

    this.hideTimer = setTimeout(() => {
      this.billingService.clearNotifications();
      this.hideTimer = null;
    }, 3000);
  }
}

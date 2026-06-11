import { Component, OnInit } from '@angular/core';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  messages: string[] = [];

  constructor(private billingService: BillingService) {}

  ngOnInit(): void {
    this.billingService.notifications$.subscribe(messages => {
      this.messages = messages;
    });
  }
}


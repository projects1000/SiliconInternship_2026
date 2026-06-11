// member1/billing-system/components/notification/notification.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillingJagannathService as BillingSharedService } from '../../services/billing-jagannath.service';
import { NotificationMessage } from '../../models/billing.model';
import { Subscription } from 'rxjs';

interface ToastItem extends NotificationMessage {
  id: number;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  toasts: ToastItem[] = [];
  private subscription!: Subscription;
  private counter = 0;

  constructor(private sharedService: BillingSharedService) {}

  ngOnInit() {
    this.subscription = this.sharedService.notification$.subscribe((msg) => {
      const id = this.counter++;
      const newToast: ToastItem = { ...msg, id };

      // Push new toast to the top or bottom of the stack
      this.toasts.push(newToast);

      // Auto-expire individual toast item after 3500ms
      setTimeout(() => {
        this.removeToast(id);
      }, 3500);
    });
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

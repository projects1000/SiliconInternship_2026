import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { NotificationMessage } from '../models/billing.models';
import { SharedTusharService } from '../services/shared-tushar.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {
  recentNotifications: NotificationMessage[] = [];
  private subscription?: Subscription;

  constructor(
    private sharedService: SharedTusharService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscription = this.sharedService.notifications$.subscribe(notification => {
      this.recentNotifications = [notification, ...this.recentNotifications].slice(0, 4);
      if (notification.showToast !== false) {
        this.showToast(notification);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getIcon(type: NotificationMessage['type']): string {
    switch (type) {
      case 'product':
        return 'check_circle';
      case 'customer':
        return 'person_add';
      case 'bill':
        return 'receipt_long';
      default:
        return 'info';
    }
  }

  getStatusClass(type: NotificationMessage['type']): string {
    return `activity-card--${type}`;
  }

  private showToast(notification: NotificationMessage): void {
    this.snackBar.open(notification.message, 'Close', {
      duration: 3500,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [`billing-snackbar-${notification.type}`]
    });
  }
}

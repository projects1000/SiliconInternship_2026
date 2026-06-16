import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationMessage, NotificationType } from '../models/billing.models';

@Injectable({
  providedIn: 'root'
})
export class SharedTusharService {
  private readonly notificationSubject = new Subject<NotificationMessage>();
  readonly notifications$ = this.notificationSubject.asObservable();
  toastEnabled = true;

  notify(message: string, type: NotificationType): void {
    this.notificationSubject.next({
      message,
      type,
      timestamp: new Date(),
      showToast: this.toastEnabled
    });
  }
}

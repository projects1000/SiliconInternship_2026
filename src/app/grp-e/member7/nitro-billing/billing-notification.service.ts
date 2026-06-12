import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface NotificationMessage {
  id: number;
  text: string;
  type: 'success' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class BillingNotificationService {
  private notificationSubject = new Subject<NotificationMessage>();
  private counter = 0;

  getNotifications(): Observable<NotificationMessage> {
    return this.notificationSubject.asObservable();
  }

  sendMessage(text: string, type: 'success' | 'info' | 'warning' = 'success'): void {
    const id = ++this.counter;
    this.notificationSubject.next({ id, text, type });
  }
}

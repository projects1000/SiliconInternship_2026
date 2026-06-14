
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationMessage } from '../models/billing.model';

@Injectable({
  providedIn: 'root'
})
export class BillingJagannathService {
    constructor() { }
  private notificationSubject = new Subject<NotificationMessage>();
  notification$ = this.notificationSubject.asObservable();

  // Helper helper to dispatch alerts easily from any child component
  sendNotification(text: string, type: 'success' | 'info' | 'warning' = 'success') {
    this.notificationSubject.next({ text, type });
  }
}
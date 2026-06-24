import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface NotificationMessage {
  text: string;
  type: 'product' | 'customer' | 'bill' | 'warn';
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageSubject = new Subject<NotificationMessage>();

  // Observable stream that components subscribe to
  messages$: Observable<NotificationMessage> = this.messageSubject.asObservable();

  sendProductAdded(productName: string): void {
    this.messageSubject.next({
      text: `Product '${productName}' Added Successfully`,
      type: 'product',
      icon: '✓'
    });
  }

  sendCustomerSaved(customerName: string): void {
    this.messageSubject.next({
      text: `Customer '${customerName}' Saved Successfully`,
      type: 'customer',
      icon: '✓'
    });
  }

  sendBillGenerated(total: string): void {
    this.messageSubject.next({
      text: `Bill Generated Successfully. Total: ${total}`,
      type: 'bill',
      icon: '✓'
    });
  }

  sendWarning(message: string): void {
    this.messageSubject.next({
      text: message,
      type: 'warn',
      icon: '⚠'
    });
  }
}

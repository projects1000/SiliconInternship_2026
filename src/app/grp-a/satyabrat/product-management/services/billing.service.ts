import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface NotificationMessage {
  text: string;
  type: 'product' | 'customer' | 'bill';
  timestamp: Date;
}

@Injectable()
export class BillingService {
  private notificationsSubject = new Subject<NotificationMessage>();

  // Shared state variables
  selectedItems: any[] = [];
  customerName: string = '';
  mobileNumber: string = '';
  savedBills: any[] = [];
  isRegistered: boolean = false;
  isReturningCustomer: boolean = false;
  isDarkMode: boolean = false;
  isLoggedIn: boolean = false;
  currentUserRole: string = 'customer';
  registeredUsers: any[] = [];

  constructor(private snackBar: MatSnackBar) {
    const savedUsers = localStorage.getItem('registeredUsers');
    if (savedUsers) {
      this.registeredUsers = JSON.parse(savedUsers);
      // Migration: Ensure default cashiers/admins have role set correctly in localStorage
      let modified = false;
      this.registeredUsers.forEach(user => {
        if (user.mobile === '9876543210' && user.role !== 'admin') {
          user.role = 'admin';
          modified = true;
        }
        if (user.mobile === '9000000000' && user.role !== 'admin') {
          user.role = 'admin';
          modified = true;
        }
      });
      if (modified) {
        localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));
      }
    } else {
      this.registeredUsers = [
        { name: 'Satyabrat Sarangi', mobile: '9876543210', password: 'admin', role: 'admin' },
        { name: 'Demo Cashier', mobile: '9000000000', password: '12345', role: 'admin' }
      ];
      localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));
    }
  }

  get notifications$(): Observable<NotificationMessage> {
    return this.notificationsSubject.asObservable();
  }

  sendNotification(text: string, type: 'product' | 'customer' | 'bill') {
    const notification: NotificationMessage = {
      text,
      type,
      timestamp: new Date()
    };
    this.notificationsSubject.next(notification);

    // Determine panel class for snackbar styling
    let panelClass = 'toast-success';
    if (type === 'product') panelClass = 'toast-product';
    if (type === 'customer') panelClass = 'toast-customer';
    if (type === 'bill') panelClass = 'toast-bill';

    this.snackBar.open(text, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass]
    });
  }
}

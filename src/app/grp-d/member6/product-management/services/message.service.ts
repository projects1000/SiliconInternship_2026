import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

export interface CustomerData {
  customerName: string;
  email: string;
  phone: string;
}

export interface BillData {
  customerName: string;
  email: string;
  phone: string;
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // TOAST
  private toastSubject = new Subject<ToastMessage>();
  toastState$ = this.toastSubject.asObservable();

  // STORAGE
  private customerData: CustomerData | null = null;
  private billData: BillData | null = null;

  // CUSTOMER
  setCustomer(data: CustomerData) {
    this.customerData = data;
  }

  getCustomer(): CustomerData | null {
    return this.customerData;
  }

  // BILL
  setBill(data: BillData) {
    this.billData = data;
  }

  getBill(): BillData | null {
    return this.billData;
  }

  // TOAST
  showToast(type: ToastMessage['type'], message: string) {
    this.toastSubject.next({ type, message });
  }
}

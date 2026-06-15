import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs'; // Import BehaviorSubject

@Injectable({ providedIn: 'root' })
export class ShopStateService {
  // Use BehaviorSubject to hold the current list of products
  private productsSource = new BehaviorSubject<any[]>([]);
  products$ = this.productsSource.asObservable();

  // New: Subject for notifications
  private notificationSource = new Subject<string>();
  notification$ = this.notificationSource.asObservable();

  addProduct(product: any) {
    const current = this.productsSource.getValue();
    this.productsSource.next([...current, product]);
    this.sendMessage(`Product '${product.name}' Added Successfully`);
  }

  sendMessage(msg: string) {
    this.notificationSource.next(msg);
  }

  setCustomer(customer: any) {
    this.sendMessage(`Customer '${customer.name}' Saved Successfully`);
  }
}

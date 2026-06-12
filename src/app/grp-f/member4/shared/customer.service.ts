import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CustomerProfile {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  pincode?: string;
  gender?: string;
  dateOfBirth?: string;
  profileImage?: string;
}

export interface Order {
  id?: number;
  customerId?: number;
  orderDate: Date;
  items: any[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress?: string;
  trackingNumber?: string;
}

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private currentCustomerSubject = new BehaviorSubject<CustomerProfile | null>(null);
  public currentCustomer$ = this.currentCustomerSubject.asObservable();

  private customersSubject = new BehaviorSubject<CustomerProfile[]>([]);
  public customers$ = this.customersSubject.asObservable();

  private ordersSubject = new BehaviorSubject<Order[]>([]);
  public orders$ = this.ordersSubject.asObservable();

  private customers: CustomerProfile[] = [];
  private orders: Order[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const savedCustomers = localStorage.getItem('customers');
    const savedOrders = localStorage.getItem('orders');
    const currentCustomer = localStorage.getItem('currentCustomer');

    if (savedCustomers) {
      this.customers = JSON.parse(savedCustomers);
      this.customersSubject.next(this.customers);
    }

    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
      this.ordersSubject.next(this.orders);
    }

    if (currentCustomer) {
      this.currentCustomerSubject.next(JSON.parse(currentCustomer));
    }
  }

  private saveToStorage(): void {
    localStorage.setItem('customers', JSON.stringify(this.customers));
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  registerCustomer(customer: CustomerProfile): CustomerProfile {
    const newCustomer: CustomerProfile = {
      id: this.customers.length + 1,
      ...customer
    };
    this.customers.push(newCustomer);
    this.saveToStorage();
    this.customersSubject.next(this.customers);
    return newCustomer;
  }

  loginCustomer(email: string, phone: string): CustomerProfile | null {
    const customer = this.customers.find(c => c.email === email || c.phone === phone);
    if (customer) {
      this.currentCustomerSubject.next(customer);
      localStorage.setItem('currentCustomer', JSON.stringify(customer));
      return customer;
    }
    return null;
  }

  logoutCustomer(): void {
    this.currentCustomerSubject.next(null);
    localStorage.removeItem('currentCustomer');
  }

  getCurrentCustomer(): CustomerProfile | null {
    return this.currentCustomerSubject.value;
  }

  updateCustomerProfile(customer: CustomerProfile): void {
    const index = this.customers.findIndex(c => c.id === customer.id);
    if (index !== -1) {
      this.customers[index] = customer;
      this.currentCustomerSubject.next(customer);
      this.saveToStorage();
      localStorage.setItem('currentCustomer', JSON.stringify(customer));
      this.customersSubject.next(this.customers);
    }
  }

  getCustomerById(id: number): CustomerProfile | undefined {
    return this.customers.find(c => c.id === id);
  }

  createOrder(order: Order): Order {
    const newOrder: Order = {
      id: this.orders.length + 1,
      customerId: this.getCurrentCustomer()?.id,
      ...order
    };
    this.orders.push(newOrder);
    this.saveToStorage();
    this.ordersSubject.next(this.orders);
    return newOrder;
  }

  getCustomerOrders(): Order[] {
    const currentCustomer = this.getCurrentCustomer();
    if (currentCustomer) {
      return this.orders.filter(o => o.customerId === currentCustomer.id);
    }
    return [];
  }

  getOrderById(id: number): Order | undefined {
    return this.orders.find(o => o.id === id);
  }

  updateOrderStatus(orderId: number, status: Order['status']): void {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      this.saveToStorage();
      this.ordersSubject.next(this.orders);
    }
  }

  getAllCustomers(): CustomerProfile[] {
    return this.customers;
  }

  getAllOrders(): Order[] {
    return this.orders;
  }
}

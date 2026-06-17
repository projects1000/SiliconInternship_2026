import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private ordersSource = new BehaviorSubject<any[]>([]);
  orders$ = this.ordersSource.asObservable();

  private orders:any[] = [];

  addItem(item:any) {
    const existing = this.orders.find(x => x.name === item.name);

    if (existing) {
      existing.quantity++;
    } else {
      this.orders.push({
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      });
    }

    this.ordersSource.next(this.orders);
  }

  increase(item:any) {
    item.quantity++;
    this.ordersSource.next(this.orders);
  }

  decrease(item:any) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.orders = this.orders.filter(x => x.name !== item.name);
    }

    this.ordersSource.next(this.orders);
  }
  customerdetails:any;
  sendcustomerData(details:any){
    this.customerdetails=details;
  }
  getCustomerDetails()
{
  return this.customerdetails;
}
  getItems() {
    return this.orders;
  }
settings = {

  restaurantName: 'ANUP POS CAFE',

  phoneNumber: '9876543210',

  address: 'Bhubaneswar, Odisha',

  tax: 18,

  discount: 0,

  currency: '₹',

  serviceCharge: 0,

  enableTip: true,

  theme: 'Blue'

};

setSettings(data:any)
{
  this.settings = data;
}

getSettings()
{
  return this.settings;
}
private toastSource = new BehaviorSubject<any[]>([]);
toast$ = this.toastSource.asObservable();

private notificationSource = new BehaviorSubject<any[]>([]);
notifications$ = this.notificationSource.asObservable();

toastNotifications:any[] = [];
notifications:any[] = [];

addNotification(message:string, type:string='success') {

  const note = {
    message: message,
    type: type,
    time: new Date()
  };

  // permanent history
  this.notifications.unshift(note);
  this.notificationSource.next(this.notifications);

  // temporary toast
  this.toastNotifications.unshift(note);
  this.toastSource.next(this.toastNotifications);

  setTimeout(() => {
    this.toastNotifications =
      this.toastNotifications.filter(n => n !== note);

    this.toastSource.next(this.toastNotifications);
  }, 3000);
}

clearNotifications() {
  this.notifications = [];
  this.notificationSource.next(this.notifications);
}
getNotifications() {
  return this.notifications;
}
}
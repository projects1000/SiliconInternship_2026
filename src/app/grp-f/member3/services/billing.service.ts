import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  notificationSource =
    new Subject<string>();

  notification$ =
    this.notificationSource.asObservable();

  sendNotification(message: string) {

    this.notificationSource.next(message);

  }

}
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppNotification } from '../models';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // A Subject acts as both an Observable (to listen to) and an Observer (to emit values).
  private messageSource = new Subject<AppNotification>();

  // Expose it as an Observable so components can subscribe to it (as shown in your diagram)
  currentMessage$ = this.messageSource.asObservable();

  // Components will call this method and pass the message, which triggers next()
  sendMessage(notification: AppNotification) {
    this.messageSource.next(notification);
  }
}

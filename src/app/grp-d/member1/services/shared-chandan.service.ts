import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedChandanService {
  // Observable stream to broadcast notification messages
  private notificationSubject = new Subject<string>();
  notification$ = this.notificationSubject.asObservable();

  sendNotification(message: string) {
    this.notificationSubject.next(message);
  }
}
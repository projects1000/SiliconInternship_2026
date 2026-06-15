import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private messageSubject = new Subject<string>();

  messages$: Observable<string> =
    this.messageSubject.asObservable();

  sendMessage(message: string) {
    this.messageSubject.next(message);
  }

}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private messageSource = new Subject<any>();

  messages$ = this.messageSource.asObservable();

  sendMessage(message: any): void {
    this.messageSource.next(message);
  }

}

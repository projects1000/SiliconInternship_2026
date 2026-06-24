import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Member5ChatService {

  private messageSource = new Subject<any>();

  messages$ = this.messageSource.asObservable();

  sendMessage(message: any) {
    this.messageSource.next(message);
  }
}
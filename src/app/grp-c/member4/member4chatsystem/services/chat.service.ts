import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private userOneMessage = new Subject<string>();
  private userTwoMessage = new Subject<string>();

  userOneMessage$ = this.userOneMessage.asObservable();
  userTwoMessage$ = this.userTwoMessage.asObservable();

  sendFromUserOne(message: string) {
    this.userOneMessage.next(message);
  }

  sendFromUserTwo(message: string) {
    this.userTwoMessage.next(message);
  }

}
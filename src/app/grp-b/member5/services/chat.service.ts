import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private msgSource = new Subject<any>();

  messages$ = this.msgSource.asObservable();

  sendMessage(message:any){
    this.msgSource.next(message);
  }

}
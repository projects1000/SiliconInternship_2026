import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageService} from '../models/message.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messageSource = new Subject<MessageService>();

  messages$ = this.messageSource.asObservable();

  sendMessage(message: MessageService) {
    this.messageSource.next(message);
  }
}
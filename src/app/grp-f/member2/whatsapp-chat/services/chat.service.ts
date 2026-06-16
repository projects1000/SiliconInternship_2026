import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ChatMessage{

  sender:string;

  userType:string;

  type?:
    'text'|
    'image'|
    'video'|
    'document'|
    'audio'|
    'camera'|
    'file';

  text?:string;

  content?:string;

  fileName?:string;

  time:Date;

}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private messageSource =
new Subject<ChatMessage>();

  messages$ = this.messageSource.asObservable();

 sendMessage(message: ChatMessage){

  this.messageSource.next(message);

}
private typingSource =
new Subject<string>();

typing$ =
this.typingSource.asObservable();

sendTyping(user:string){

  this.typingSource.next(user);

}
}
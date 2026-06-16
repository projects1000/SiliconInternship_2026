import {
 Component,
 OnInit,
 ViewChild,
 ElementRef,

} from '@angular/core';

import { ChatService } from '../services/chat.service';


@Component({
 selector:'app-chat-window',
 templateUrl:'./chat-window.component.html',
 styleUrls:['./chat-window.component.css']
})
export class ChatWindowComponent
implements OnInit {
typingUser = '';
 messages:any[]=[];

 @ViewChild('chatBody')
 chatBody!:ElementRef;

 constructor(
   private chatService:ChatService
 ){}

 ngOnInit(){

   this.chatService.messages$
   .subscribe(msg=>{

      this.messages.push(msg);

      setTimeout(()=>{
        this.scrollToBottom();
      },100);

   });

 }

 scrollToBottom(){

   if(this.chatBody){

      this.chatBody.nativeElement.scrollTop =
      this.chatBody.nativeElement.scrollHeight;

   }

 }

 clearChat(){

   this.messages=[];

 }
selectedTheme='green';
isDarkMode = false;

toggleMode(){

  this.isDarkMode =
  !this.isDarkMode;

}

changeTheme(theme:string){

  this.selectedTheme = theme;

}
deleteMessage(index:number){

  this.messages.splice(
    index,
    1
  );

}
editingIndex:number|null =
null;

editedText='';

editMessage(

index:number,

message:string

){

  this.editingIndex =
  index;

  this.editedText =
  message;

}

saveEdit(){

  if(

    this.editingIndex !== null

  ){

    this.messages[

      this.editingIndex

    ].text =

      this.editedText;

    this.editingIndex =
    null;

  }

}
}
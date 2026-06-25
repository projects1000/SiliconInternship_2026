import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector:'app-notification',
  templateUrl:'./notification.component.html',
  styleUrls:['./notification.component.css']
})
export class NotificationComponent {

  messages:string[]=[];

  constructor(private shared:SharedService){

    this.shared.message$.subscribe(res=>{
      this.messages.push(res);
    });

  }

}
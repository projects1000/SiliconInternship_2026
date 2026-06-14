import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-grp-cmember4notification',
  templateUrl: './grp-cmember4notification.component.html',
  styleUrls: ['./grp-cmember4notification.component.css']
})
export class GrpCmember4notificationComponent {

  notifications:any[] = [];

  constructor(private sharedservice: SharedService) {}

  ngOnInit(): void {

    this.sharedservice.notifications$
    .subscribe(data => {

      this.notifications = data;

    });

  }

  clearAll() {

    this.sharedservice.clearNotifications();

  }

}
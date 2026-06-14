import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-grp-cmember4register',
  templateUrl: './grp-cmember4register.component.html',
  styleUrls: ['./grp-cmember4register.component.css']
})
export class GrpCmember4registerComponent {
  data={
      name:'',
      phone:'',
      tip:''
    }
  constructor(private sharedservice:SharedService){}
  submit() {

  this.sharedservice.sendcustomerData(this.data);

  this.sharedservice.addNotification(
    'Customer registered successfully'
  );

}
}

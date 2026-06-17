import { Component } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-billingsystem-member4',
  templateUrl: './billingsystem-member4.component.html',
  styleUrls: ['./billingsystem-member4.component.css']
})
export class BillingsystemMember4Component {

  activepage = 'products';

  orders:any[] = [];

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.orders$.subscribe(data => {
      this.orders = data;
    });
      this.sharedService.orders$.subscribe(data => {
    this.orders = data;
  });

  this.sharedService.toast$.subscribe(data => {
  this.notifications = data;
});

  }

  increase(item:any) {
    this.sharedService.increase(item);
  }

  decrease(item:any) {
    this.sharedService.decrease(item);
  }
  getTotal(): number {

  let total = 0;

  for(let item of this.orders)
  {
    total += item.price * item.quantity;
  }

  return total;
}
notifications:any[] = [];



}
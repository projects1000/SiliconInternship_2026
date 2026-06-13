import { Component, OnInit } from '@angular/core';
import { MessageService, BillData } from '../../product-management/services/message.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {

  bill: BillData | null = null;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    const data = this.messageService.getBill();

    if (data) {
      this.bill = {
        customerName: 'mama',
        email: 'mama@gmail.com',
        phone: '78654567',
        total: data.total
      };
    }
  }
}

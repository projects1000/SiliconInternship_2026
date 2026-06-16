import { Component } from '@angular/core';
import { BillingProduct } from './billing/billing.models';
import { BillingService } from './billing/billing.service';

@Component({
  selector: 'app-member8',
  templateUrl: './member8.component.html',
  styleUrls: ['./member8.component.css']
})
export class Member8Component {

  currentSection = 'home';

  constructor(private billingService: BillingService) {}

  showSection(section: string) {
    this.currentSection = section;
  }

  addProduct(product: BillingProduct): void {
    this.billingService.addProduct(product);
  }

}
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'] // (agar html me style hai toh chalega)
})
export class CustomerDetailsComponent implements OnInit, OnChanges {
  @Input() savedCustomer: any;
  @Output() customerSaved = new EventEmitter<any>();

  localCustomer: any = { name: '', phone: '' };

  ngOnInit() {
    if (this.savedCustomer) {
      this.localCustomer = { ...this.savedCustomer };
    }
  }

  // 👇 YEH NAYA ADD HUA HAI - Jab bhi parent clear karega, input box automatically empty ho jayega
  ngOnChanges(changes: SimpleChanges) {
    if (changes['savedCustomer'] && changes['savedCustomer'].currentValue) {
      this.localCustomer = { ...changes['savedCustomer'].currentValue };
    }
  }

  onSave() {
    if (this.localCustomer.name && this.localCustomer.phone) {
      this.customerSaved.emit(this.localCustomer);
    } else {
      alert("Please fill both details!");
    }
  }
}
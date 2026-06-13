import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-bill',
  templateUrl: './book-bill.component.html',
  styleUrls: ['./book-bill.component.css']
})
export class BookBillComponent {
  @Input() selectedBooks: any[] = [];
  @Input() customer: any;
  @Input() subTotal: number = 0;
  @Input() gstAmount: number = 0;
  @Input() grandTotal: number = 0;

  printBill() {
  window.print();
}
}
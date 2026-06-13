import { Component } from '@angular/core';
import { MessageService } from '../shared/message.service';

@Component({
  selector: 'app-book-dashboard',
  templateUrl: './book-dashboard.component.html',
  styleUrls: ['./book-dashboard.component.css']
})
export class BookDashboardComponent {
  selectedBooks: any[] = [];

  customer = {
    name: '',
    mobile: ''
  };

  constructor(private messageService: MessageService) {}

  addBook(book: any) {
    const existingBook = this.selectedBooks.find(item => item.name === book.name);

    if (existingBook) {
      existingBook.qty++;
      existingBook.total = existingBook.qty * existingBook.price;
    } else {
      this.selectedBooks.push({
        name: book.name,
        price: book.price,
        qty: 1,
        total: book.price
      });
    }

    this.messageService.sendMessage('Book Added Successfully');
  }

  saveCustomer(customerData: any) {
    this.customer = customerData;
    this.messageService.sendMessage('Customer Saved Successfully');
  }

  get subTotal() {
    return this.selectedBooks.reduce((sum, book) => sum + book.total, 0);
  }

  get gstAmount() {
    return Math.round(this.subTotal * 0.18);
  }

  get grandTotal() {
    return this.subTotal + this.gstAmount;
  }

  get totalBooks() {
    return this.selectedBooks.reduce((sum, book) => sum + book.qty, 0);
  }
}
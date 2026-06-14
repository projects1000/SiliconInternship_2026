import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-billingmanagement0001',
  templateUrl: './billingmanagement0001.component.html',
  styleUrls: ['./billingmanagement0001.component.css'],
})
export class Billingmanagement0001Component {
  @ViewChild('invoice', { static: false })
  invoice!: ElementRef;

  constructor(private router: Router) {}

  customerName = '';
  mobileNumber = '';

  categories = [
    {
      name: 'Groceries',
      products: [
        { name: 'Rice', price: 60 },
        { name: 'Sugar', price: 45 },
        { name: 'Wheat Flour', price: 55 },
      ],
    },

    {
      name: 'Dairy',
      products: [
        { name: 'Milk', price: 30 },
        { name: 'Butter', price: 80 },
        { name: 'Cheese', price: 120 },
      ],
    },

    {
      name: 'Beverages',
      products: [
        { name: 'Tea', price: 100 },
        { name: 'Coffee', price: 150 },
        { name: 'Juice', price: 50 },
      ],
    },

    {
      name: 'Snacks',
      products: [
        { name: 'Chips', price: 20 },
        { name: 'Biscuits', price: 30 },
        { name: 'Namkeen', price: 40 },
      ],
    },
  ];

  cart: any[] = [];

  addToBill(product: any) {
    const existingItem = this.cart.find((item) => item.name === product.name);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({
        ...product,
        quantity: 1,
      });
    }
  }

  removeItem(index: number) {
    this.cart.splice(index, 1);
  }

  increaseQuantity(item: any) {
    item.quantity++;
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      const index = this.cart.indexOf(item);

      this.cart.splice(index, 1);
    }
  }

  get subtotal() {
    return this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,

      0,
    );
  }

  get gst() {
    return this.subtotal * 0.18;
  }

  get grandTotal() {
    return this.subtotal + this.gst;
  }

  goBack() {
    this.router.navigate(['grp-e/member2']);
  }

  downloadInvoice() {
    html2canvas(this.invoice.nativeElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 190;

      const pageHeight = 295;

      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;

      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);

      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;

        pdf.addPage();

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);

        heightLeft -= pageHeight;
      }

      pdf.save('Invoice.pdf');
    });
  }
}

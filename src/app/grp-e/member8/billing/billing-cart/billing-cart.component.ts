import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BillingCartItem, BillingCustomer, BillingTotals } from '../billing.models';
import { BillingService } from '../billing.service';

@Component({
  selector: 'app-billing-cart',
  templateUrl: './billing-cart.component.html',
  styleUrls: ['./billing-cart.component.css']
})
export class BillingCartComponent implements OnInit {

  @Output() backToBilling = new EventEmitter<void>();

  customer: BillingCustomer | null = null;
  cart: BillingCartItem[] = [];
  totals: BillingTotals = this.billingService.calculateTotals([]);
  orderConfirmed = false;

  constructor(private billingService: BillingService) {}

  ngOnInit(): void {
    this.billingService.customer$.subscribe(customer => {
      this.customer = customer;
    });

    this.billingService.cart$.subscribe(cart => {
      this.cart = cart;
      this.totals = this.billingService.calculateTotals(cart);
    });
  }

  removeItem(productId: number): void {
    this.billingService.removeProduct(productId);
  }

  cancelOrder(): void {
    this.billingService.clearCart();
    this.orderConfirmed = false;
  }

  purchase(): void {
    if (this.cart.length === 0 || !this.customer) {
      alert('Please add customer and products.');
      return;
    }

    this.orderConfirmed = true;
    this.billingService.confirmPurchase();
  }

  // This matches your HTML
  printBill(): void {
    this.generateBill();
  }

  // Generate printable bill
  generateBill(): void {

    if (!this.customer || this.cart.length === 0) {
      alert('No bill to print.');
      return;
    }

    const printWindow = window.open('', '', 'width=900,height=700');

    if (!printWindow) {
      return;
    }

    printWindow.document.write(`
      <html>
      <head>
        <title>Billing Receipt</title>
        <style>
          body{
            font-family: Arial, sans-serif;
            padding:20px;
          }
          table{
            width:100%;
            border-collapse:collapse;
            margin-top:15px;
          }
          table,th,td{
            border:1px solid #000;
          }
          th,td{
            padding:8px;
            text-align:center;
          }
          h2,h3{
            text-align:center;
          }
        </style>
      </head>

      <body>

      <h2>Billing Receipt</h2>

      <p><strong>Customer:</strong> ${this.customer.name}</p>
      <p><strong>Mobile:</strong> ${this.customer.mobile}</p>
      <p><strong>Address:</strong> ${this.customer.address}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>

      <table>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Total</th>
        </tr>

        ${this.cart.map(item => `
          <tr>
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price * item.quantity}</td>
          </tr>
        `).join('')}

      </table>

      <br>

      <h3>Subtotal : ₹${this.totals.subTotal}</h3>
      <h3>GST (18%) : ₹${this.totals.gst}</h3>
      <h2>Grand Total : ₹${this.totals.grandTotal}</h2>

      <script>
        window.onload = function(){
          window.print();
        }
      </script>

      </body>
      </html>
    `);

    printWindow.document.close();
  }
}
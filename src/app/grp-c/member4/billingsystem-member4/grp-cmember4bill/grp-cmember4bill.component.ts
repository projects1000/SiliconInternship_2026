import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-grp-cmember4bill',
  templateUrl: './grp-cmember4bill.component.html',
  styleUrls: ['./grp-cmember4bill.component.css']
})
export class GrpCmember4billComponent {

  orders:any[] = [];
  customerData:any = {};

  constructor(private sharedservice: SharedService) {}

  ngOnInit(): void {

    this.orders =
      this.sharedservice.getItems();

    this.customerData =
      this.sharedservice.getCustomerDetails();
  }

  getTotal(): number {

    let total = 0;

    for(let item of this.orders)
    {
      total += item.price * item.quantity;
    }

    return total;
  }
  today = new Date();

getGrandTotal(): number {
  let tipAmount = 0;

  if (this.customerData.tip === '$5') tipAmount = 5;
  else if (this.customerData.tip === '$10') tipAmount = 10;
  else if (this.customerData.tip === '$20') tipAmount = 20;

  return this.getTotal() + tipAmount;
}

printBill() {
  this.sharedservice.addNotification(
  'Bill printed successfully'
);
  let itemsHtml = '';

  for (let item of this.orders) {
    itemsHtml += `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `;
  }

  const billHtml = `
    <html>
      <head>
        <title>Print Bill</title>
        <style>
          body {
            font-family: 'Courier New', monospace;
            padding: 25px;
          }

          h2, .footer {
            text-align: center;
          }

          hr {
            border: none;
            border-top: 1px dashed #999;
            margin: 14px 0;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th, td {
            padding: 8px 0;
            text-align: left;
          }

          th:nth-child(2),
          td:nth-child(2),
          th:nth-child(3),
          td:nth-child(3),
          th:nth-child(4),
          td:nth-child(4) {
            text-align: right;
          }

          .row {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
          }
        </style>
      </head>

      <body>
        <h2>ANUP CAFE</h2>
        <p>Bhubaneswar, Odisha</p>
        <p>Phone: 016786294925</p>

        <hr>

        <p><b>Customer:</b> ${this.customerData.name || 'Walk-in Customer'}</p>
        <p><b>Phone:</b> ${this.customerData.phone || 'N/A'}</p>
        <p><b>Date:</b> ${new Date().toLocaleString()}</p>

        <hr>

        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amt</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <hr>

        <div class="row">
          <span>Subtotal</span>
          <span>$${this.getTotal().toFixed(2)}</span>
        </div>

        <div class="row">
          <span>Tip</span>
          <span>${this.customerData.tip || 'No Tip'}</span>
        </div>

        <div class="row">
          <b>Grand Total</b>
          <b>$${this.getGrandTotal().toFixed(2)}</b>
        </div>

        <hr>

        <div class="footer">
          <p><b>Thank you for your order!</b></p>
        </div>
      </body>
    </html>
  `;

  const printWindow = window.open('', '', 'width=400,height=600');
  printWindow?.document.write(billHtml);
  printWindow?.document.close();
  printWindow?.print();
}
}
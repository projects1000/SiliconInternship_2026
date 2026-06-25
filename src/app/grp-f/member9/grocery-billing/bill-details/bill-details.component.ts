import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {

  @Input() products: any[] = [];
  @Input() customer: any = {};
  @Input() total: number = 0;

  @Output() increase = new EventEmitter<any>();
  @Output() decrease = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  @Output() clear = new EventEmitter<void>();

  today: Date = new Date();
  invoiceId: string = '';
  discount: number = 0;
  gstRate: number = 5;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.generateInvoiceId();
  }

  generateInvoiceId() {
    const year = new Date().getFullYear();
    const randomNo = Math.floor(100 + Math.random() * 900);
    this.invoiceId = `INV-${year}-${randomNo}`;
  }

  getTotalQuantity(): number {
    return this.products.reduce((sum, item) => sum + item.quantity, 0);
  }

  getGSTAmount(): number {
    return (this.total * this.gstRate) / 100;
  }

  getFinalAmount(): number {
    return this.total + this.getGSTAmount() - this.discount;
  }

  increaseQty(product: any) {
    this.increase.emit(product);
  }

  decreaseQty(product: any) {
    this.decrease.emit(product);
  }

  removeItem(product: any) {
    this.remove.emit(product);
  }

  clearBill() {
    this.clear.emit();
    this.discount = 0;
    this.generateInvoiceId();
  }

  generateBill() {
    if (this.products.length === 0) {
      this.messageService.sendMessage('Please add products before generating bill');
      return;
    }

    if (!this.customer || !this.customer.name) {
      this.messageService.sendMessage('Please save customer details before generating bill');
      return;
    }

    this.messageService.sendMessage(
      `Bill generated successfully. Final Amount: ₹${this.getFinalAmount()}`
    );

    const printContents = document.getElementById('print-section')?.innerHTML;

    if (!printContents) {
      this.messageService.sendMessage('Unable to print bill');
      return;
    }

    const printWindow = window.open('', '_blank', 'width=900,height=700');

    if (!printWindow) {
      this.messageService.sendMessage('Popup blocked. Please allow popups to print the bill.');
      return;
    }

    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Grocery Store Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #111;
            }

            h1, h2, h3 {
              margin: 0 0 10px;
            }

            .invoice-header {
              text-align: center;
              margin-bottom: 20px;
            }

            .invoice-header p {
              margin: 4px 0;
            }

            .store-info {
              margin-top: 10px;
              font-size: 14px;
            }

            .customer-info,
            .products-section,
            .total-section {
              margin-top: 20px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }

            th, td {
              border: 1px solid #999;
              padding: 10px;
              text-align: left;
            }

            thead {
              background: #f3f4f6;
            }

            .no-print {
              display: none !important;
            }

            .bill-buttons,
            .action-buttons,
            .qty-btn,
            .remove-btn,
            .clear-btn,
            .generate-btn,
            .discount-box {
              display: none !important;
            }

            .summary-info h3 {
              margin-top: 12px;
            }

            .thank-you {
              margin-top: 30px;
              text-align: center;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    printWindow.document.close();

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }, 500);
  }
}
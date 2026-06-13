import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent {

  @Input() products: any[] = [];

  @Input() customer: any;

  @Input() subtotal = 0;

  @Input() gst = 0;

  @Input() grandTotal = 0;

  @Input() invoiceNumber = '';

  @Output()
  removeClicked = new EventEmitter<any>();

  @Output()
  increaseClicked = new EventEmitter<any>();

  @Output()
  decreaseClicked = new EventEmitter<any>();

  @Output() invoiceGenerated = new EventEmitter<any>();

  increaseQuantity(product: any) {
    this.increaseClicked.emit(product);
  }

  decreaseQuantity(product: any) {
    this.decreaseClicked.emit(product);
  }

  removeProduct(product: any) {
    this.removeClicked.emit(product);
  }

  invoiceDate: Date | null = null;
  generatedInvoiceNumber: string = '';
  generateInvoice() {

    this.generatedInvoiceNumber = 'INV-' + Date.now();
    this.invoiceDate = new Date();

    const invoice = {
      invoiceNumber: this.generatedInvoiceNumber,
      date: this.invoiceDate,
      customer: this.customer,
      products: this.products,
      subtotal: this.subtotal,
      gst: this.gst,
      grandTotal: this.grandTotal
    };

    this.invoiceGenerated.emit(invoice);
  }
  printInvoice() {

    const invoiceContent =
      document.getElementById('invoice-section');

    if (!invoiceContent) {
      alert('Generate invoice first');
      return;
    }

    const printWindow =
      window.open('', '_blank', 'width=900,height=700');

    if (!printWindow) {
      return;
    }

    printWindow.document.write(`
    <html>
      <head>
        <title>Invoice</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }

          .invoice-box {
            border: 2px solid #000;
            padding: 20px;
          }

          h3 {
            margin-bottom: 15px;
          }
        </style>
      </head>
      <body>
        ${invoiceContent.innerHTML}
      </body>
    </html>
  `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }
}
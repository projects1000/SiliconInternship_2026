// member1/billing-system/components/bill-details/bill-details.component.ts
import { Component, Input } from '@angular/core';
import { CartItem, Customer } from '../../models/billing.model';
import { BillingJagannathService as BillingSharedService } from '../../services/billing-jagannath.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css'],
})
export class BillDetailsComponent {
  @Input() cartItems: CartItem[] = [];
  @Input() subTotal: number = 0;
  @Input() gstAmount: number = 0;
  @Input() grandTotal: number = 0;
  @Input() customer!: Customer;

  constructor(private sharedService: BillingSharedService) {}

  downloadBillPdf() {
    if (this.cartItems.length === 0) {
      this.sharedService.sendNotification(
        'Your basket is empty. Cannot extract empty invoice.',
        'warning',
      );
      return;
    }

    const doc = new jsPDF();

    // PDF Styling & Branding
    doc.setFontSize(20);
    doc.text('BILLING MANAGEMENT SYSTEM', 14, 20);
    doc.setFontSize(10);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 28);

    // Customer Section Row
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 32, 196, 32);
    doc.setFontSize(12);
    doc.text('Customer Particulars:', 14, 40);
    doc.setFontSize(10);
    doc.text(`Name: ${this.customer?.name || 'Walk-in Customer'}`, 14, 46);
    doc.text(`Mobile: ${this.customer?.mobile || 'N/A'}`, 14, 52);

    // Dynamic Tabular Invoice Creation
    const tableRows: any[] = [];
    this.cartItems.forEach((item, index) => {
      const rowData = [
        index + 1,
        item.product.name,
        item.quantity,
        `INR ${item.product.price.toFixed(2)}`,
        `INR ${item.total.toFixed(2)}`,
      ];
      tableRows.push(rowData);
    });

    autoTable(doc, {
      startY: 58,
      head: [['Sr.', 'Product Name', 'Qty', 'Unit Price', 'Item Total']],
      body: tableRows,
      theme: 'striped',
    });

    // Summary calculation footer attachment blocks
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.text(`Sub Total: INR ${this.subTotal.toFixed(2)}`, 140, finalY);
    doc.text(`GST (18%): INR ${this.gstAmount.toFixed(2)}`, 140, finalY + 6);
    doc.setFontSize(12);
    doc.text(
      `Grand Total: INR ${this.grandTotal.toFixed(2)}`,
      140,
      finalY + 14,
    );

    // Document Generation Target Trigger
    doc.save(`Invoice_${this.customer?.name || 'Guest'}_${Date.now()}.pdf`);
    this.sharedService.sendNotification(
      'Digital Invoice Document PDF archived and sent to local downloads!',
      'success',
    );
  }
}

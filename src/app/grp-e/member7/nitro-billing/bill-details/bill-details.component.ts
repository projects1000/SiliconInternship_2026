import { Component, Input } from '@angular/core';
import { BillingNotificationService } from '../billing-notification.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-m7-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent {
  @Input() selectedProducts: any[] = [];
  @Input() customer: any = { name: '', phone: '', saved: false };
  @Input() totals: any = { subTotal: 0, gst: 0, grandTotal: 0 };

  constructor(private notificationService: BillingNotificationService) {}

  generateBill(): void {
    if (this.selectedProducts.length === 0) {
      this.notificationService.sendMessage('Cart is empty. Please add products.', 'warning');
      return;
    }

    if (!this.customer.saved) {
      this.notificationService.sendMessage('Please save customer details first.', 'warning');
      return;
    }

    // PDF generation
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a6' // A6 is perfect for a compact cash receipt
    });

    // Design styles
    doc.setFillColor(18, 18, 18);
    doc.rect(0, 0, 105, 148, 'F'); // Dark background color matching brand

    // Title / Header
    doc.setTextColor(255, 255, 255);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('NITRO COLD DRINKS', 52.5, 15, { align: 'center' });
    
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('Your Cool Drink Haven', 52.5, 20, { align: 'center' });

    doc.setDrawColor(255, 255, 255, 0.1);
    doc.line(10, 24, 95, 24);

    // Customer info
    doc.setTextColor(200, 200, 200);
    doc.setFontSize(9);
    doc.text(`Customer: ${this.customer.name}`, 10, 31);
    doc.text(`Mobile: +91 ${this.customer.phone}`, 10, 36);

    doc.line(10, 40, 95, 40);

    // Items table header
    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('Product', 10, 46);
    doc.text('Qty', 55, 46, { align: 'center' });
    doc.text('Price', 75, 46, { align: 'center' });
    doc.text('Total', 95, 46, { align: 'right' });

    doc.line(10, 49, 95, 49);
    doc.setFont('Helvetica', 'normal');
    doc.setTextColor(180, 180, 180);

    let y = 55;
    this.selectedProducts.forEach(item => {
      // Prevent running off bottom of page
      if (y < 110) {
        doc.text(item.name, 10, y);
        doc.text(item.qty.toString(), 55, y, { align: 'center' });
        doc.text(`Rs. ${item.price}`, 75, y, { align: 'center' });
        doc.text(`Rs. ${item.total}`, 95, y, { align: 'right' });
        y += 7;
      }
    });

    doc.line(10, y, 95, y);
    y += 6;

    // Totals
    doc.setTextColor(200, 200, 200);
    doc.text('Sub Total:', 65, y, { align: 'right' });
    doc.text(`Rs. ${this.totals.subTotal.toFixed(2)}`, 95, y, { align: 'right' });
    y += 5;

    doc.text('GST (18%):', 65, y, { align: 'right' });
    doc.text(`Rs. ${this.totals.gst.toFixed(2)}`, 95, y, { align: 'right' });
    y += 6;

    doc.line(50, y - 2, 95, y - 2);

    doc.setFont('Helvetica', 'bold');
    doc.setTextColor(243, 179, 35); // Golden color
    doc.text('Grand Total:', 65, y, { align: 'right' });
    doc.text(`Rs. ${this.totals.grandTotal.toFixed(2)}`, 95, y, { align: 'right' });
    y += 10;

    // Footer
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for shopping with Nitro!', 52.5, y, { align: 'center' });

    // Save/Download file
    doc.save(`Nitro_Bill_${this.customer.name.replace(/\s+/g, '_')}.pdf`);

    // Notify
    this.notificationService.sendMessage('Bill Generated Successfully', 'warning');
  }
}

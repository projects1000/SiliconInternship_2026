import { Component, EventEmitter, Output } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-shopping-dashboard',
  templateUrl: './shopping-dashboard.component.html',
  styleUrls: ['./shopping-dashboard.component.css']
})
export class ShoppingDashboardComponent {

  constructor(private notificationService: NotificationService) { }
  selectedProducts: any[] = [];
  customer: any;

  subtotal = 0;
  gst = 0;
  grandTotal = 0;

  invoiceNumber = '';
  generatedInvoice: any;

  @Output()
  backClicked = new EventEmitter<void>();

  goBack() {
    this.backClicked.emit();
  }

  addProduct(product: any) {

    const existingProduct =
      this.selectedProducts.find(
        p => p.id === product.id
      );

    if (existingProduct) {

      existingProduct.quantity++;

    } else {

      this.selectedProducts.push({
        ...product,
        quantity: 1
      });

    }

    this.calculateBill();

  }

  removeProduct(product: any) {

    this.selectedProducts =
      this.selectedProducts.filter(
        p => p.id !== product.id
      );

    this.calculateBill();

  }

  increaseQuantity(product: any) {

    product.quantity++;

    this.calculateBill();

  }

  decreaseQuantity(product: any) {

    if (product.quantity > 1) {

      product.quantity--;

    }

    this.calculateBill();

  }

  saveCustomer(customer: any) {

    this.customer = customer;

    console.log('Customer Saved:', customer);

  }

  get cartCount(): number {

    return this.selectedProducts.reduce(
      (sum, product) =>
        sum + product.quantity,
      0
    );

  }

  handleInvoice(invoice: any) {
    console.log('Invoice received:', invoice);

    this.invoiceNumber = invoice.invoiceNumber;
    this.generatedInvoice = invoice;

    this.notificationService.sendMessage('Invoice Generated Successfully');
  }

  calculateBill() {

    this.subtotal = this.selectedProducts.reduce(
      (sum, product) =>
        sum + (product.price * product.quantity),
      0
    );

    this.gst = this.subtotal * 0.18;

    this.grandTotal = this.subtotal + this.gst;;

  }

}
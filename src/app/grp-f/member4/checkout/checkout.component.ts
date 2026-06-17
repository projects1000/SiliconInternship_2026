import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../shared/cart.service';
import { CustomerService, CustomerProfile } from '../shared/customer.service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  step: number = 1;
  
  // Billing Details
  billingForm = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: ''
  };

  // Shipping Details
  shippingForm = {
    sameAsBilling: true,
    name: '',
    address: '',
    city: '',
    pincode: '',
    state: ''
  };

  // Payment
  paymentMethod: string = 'card';
  cardDetails = {
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  };

  currentCustomer: CustomerProfile | null = null;
  cartTotal: number = 0;
  tax: number = 0;
  deliveryCharge: number = 50;
  showOrderConfirmation: boolean = false;
  orderNumber: string = '';

  constructor(
    private customerService: CustomerService,
    private cartService: CartService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerService.currentCustomer$.subscribe(customer => {
      this.currentCustomer = customer;
      if (customer) {
        this.billingForm = {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: customer.address || '',
          city: customer.city || '',
          pincode: customer.pincode || '',
          state: ''
        };
      }
    });

    const cart = this.cartService.getCart();
    this.cartTotal = cart.totalPrice;
    this.tax = Math.round(this.cartTotal * 0.18);
  }

  nextStep(): void {
    if (this.step === 1 && this.validateBilling()) {
      this.step = 2;
    } else if (this.step === 2 && this.validateShipping()) {
      this.step = 3;
    } else if (this.step === 3) {
      this.processPayment();
    }
  }

  prevStep(): void {
    if (this.step > 1) {
      this.step--;
    }
  }

  validateBilling(): boolean {
    if (!this.billingForm.name || !this.billingForm.email || !this.billingForm.phone ||
        !this.billingForm.address || !this.billingForm.city || !this.billingForm.pincode) {
      this.toastService.show('Please fill all billing details', 'error');
      return false;
    }
    return true;
  }

  validateShipping(): boolean {
    if (!this.shippingForm.sameAsBilling) {
      if (!this.shippingForm.name || !this.shippingForm.address || !this.shippingForm.city ||
          !this.shippingForm.pincode) {
        this.toastService.show('Please fill all shipping details', 'error');
        return false;
      }
    }
    return true;
  }

  updateShippingFromBilling(): void {
    if (this.shippingForm.sameAsBilling) {
      this.shippingForm = {
        sameAsBilling: true,
        name: this.billingForm.name,
        address: this.billingForm.address,
        city: this.billingForm.city,
        pincode: this.billingForm.pincode,
        state: this.billingForm.state
      };
    }
  }

  validatePayment(): boolean {
    if (this.paymentMethod === 'card') {
      if (!this.cardDetails.cardNumber || !this.cardDetails.cardHolder ||
          !this.cardDetails.expiryDate || !this.cardDetails.cvv) {
        this.toastService.show('Please fill all card details', 'error');
        return false;
      }
    }
    return true;
  }

  processPayment(): void {
    if (!this.validatePayment()) {
      return;
    }

    this.orderNumber = 'ORD-' + Date.now();
    
    // Create customer if not logged in
    if (!this.currentCustomer) {
      const newCustomer: CustomerProfile = {
        name: this.billingForm.name,
        email: this.billingForm.email,
        phone: this.billingForm.phone,
        address: this.billingForm.address,
        city: this.billingForm.city,
        pincode: this.billingForm.pincode
      };
      this.currentCustomer = this.customerService.registerCustomer(newCustomer);
    }

    // Create order
    const order = {
      id: undefined,
      customerId: this.currentCustomer?.id,
      orderDate: new Date(),
      items: this.cartService.getCart().items,
      totalAmount: this.getTotal(),
      status: 'confirmed' as const,
      deliveryAddress: this.shippingForm.address,
      trackingNumber: 'TRACK-' + Date.now()
    };

    this.customerService.createOrder(order);
    this.cartService.clearCart();
    this.showOrderConfirmation = true;
    this.toastService.show('Order placed successfully!', 'success');
  }

  getSubtotal(): number {
    return this.cartTotal;
  }

  getTotal(): number {
    return this.cartTotal + this.tax + this.deliveryCharge;
  }

  goHome(): void {
    this.router.navigate(['/grp-f/member4/product-list']);
  }

  downloadInvoice(): void {
    this.toastService.show('Invoice download feature coming soon!', 'info');
  }
}

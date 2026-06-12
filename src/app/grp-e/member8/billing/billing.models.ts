export interface BillingCustomer {
  name: string;
  mobile: string;
  address: string;
}

export interface BillingProduct {
  id: number;
  name: string;
  price: number;
}

export interface BillingCartItem extends BillingProduct {
  quantity: number;
}

export interface BillingTotals {
  subTotal: number;
  gst: number;
  grandTotal: number;
  totalItems: number;
}


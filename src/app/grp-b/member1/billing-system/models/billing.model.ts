// member1/billing-system/models/billing.model.ts

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  total: number;
}

export interface Customer {
  name: string;
  mobile: string;
}

export interface NotificationMessage {
  text: string;
  type: 'success' | 'info' | 'warning';
}

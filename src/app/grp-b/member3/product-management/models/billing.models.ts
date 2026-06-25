export type ProductCategory =
  | 'Mobiles'
  | 'Laptops'
  | 'Headphones'
  | 'Smartwatches'
  | 'Tablets'
  | 'Accessories';

export type ProductBadge = 'New' | 'Hot' | 'Popular';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
  icon: string;
  image: string;
  badge?: ProductBadge;
  accent: string;
}

export interface CategoryReport {
  category: ProductCategory;
  count: number;
  totalValue: number;
}

export interface DashboardSettings {
  shopName: string;
  gstRate: number;
  toastEnabled: boolean;
  invoicePrefix: string;
  showGstOnBill: boolean;
}

export interface BillLineItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  mobile: string;
}

export interface BillSummary {
  subtotal: number;
  gst: number;
  grandTotal: number;
}

export type NotificationType = 'product' | 'customer' | 'bill';

export interface NotificationMessage {
  message: string;
  type: NotificationType;
  timestamp: Date;
  showToast?: boolean;
}

export type CategoryFilter = 'All' | ProductCategory;

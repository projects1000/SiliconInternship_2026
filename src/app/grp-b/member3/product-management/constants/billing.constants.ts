import { CategoryFilter, Product } from '../models/billing.models';

export const GST_RATE = 0.18;

export const DEFAULT_SETTINGS = {
  shopName: 'Silicon Tech Store',
  gstRate: GST_RATE,
  toastEnabled: true,
  invoicePrefix: 'SIL-2026',
  showGstOnBill: true
};

export const CATEGORY_FILTERS: CategoryFilter[] = [
  'All',
  'Mobiles',
  'Laptops',
  'Headphones',
  'Smartwatches',
  'Tablets',
  'Accessories'
];

export const CATEGORY_ICONS: Record<CategoryFilter, string> = {
  All: 'apps',
  Mobiles: 'smartphone',
  Laptops: 'laptop_mac',
  Headphones: 'headphones',
  Smartwatches: 'watch',
  Tablets: 'tablet_mac',
  Accessories: 'electrical_services'
};

export const TECH_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Samsung Galaxy S24',
    price: 74999,
    category: 'Mobiles',
    icon: 'smartphone',
    image: 'assets/member3/products/samsung-galaxy-s24.svg',
    badge: 'New',
    accent: '#4f46e5'
  },
  {
    id: 2,
    name: 'iPhone 15',
    price: 79900,
    category: 'Mobiles',
    icon: 'phone_iphone',
    image: 'assets/member3/products/iphone-15.svg',
    badge: 'Hot',
    accent: '#0f172a'
  },
  {
    id: 3,
    name: 'Dell Inspiron',
    price: 58999,
    category: 'Laptops',
    icon: 'laptop_mac',
    image: 'assets/member3/products/dell-inspiron.svg',
    accent: '#0284c7'
  },
  {
    id: 4,
    name: 'HP Pavilion',
    price: 54999,
    category: 'Laptops',
    icon: 'laptop_chromebook',
    image: 'assets/member3/products/hp-pavilion.svg',
    accent: '#2563eb'
  },
  {
    id: 5,
    name: 'Sony WH-CH520',
    price: 3990,
    category: 'Headphones',
    icon: 'headphones',
    image: 'assets/member3/products/sony-wh-ch520.svg',
    accent: '#7c3aed'
  },
  {
    id: 6,
    name: 'boAt Rockerz',
    price: 2499,
    category: 'Headphones',
    icon: 'headset_mic',
    image: 'assets/member3/products/boat-rockerz.svg',
    badge: 'Popular',
    accent: '#dc2626'
  },
  {
    id: 7,
    name: 'Noise Smartwatch',
    price: 4999,
    category: 'Smartwatches',
    icon: 'watch',
    image: 'assets/member3/products/noise-smartwatch.svg',
    accent: '#059669'
  },
  {
    id: 8,
    name: 'Lenovo Tablet',
    price: 18999,
    category: 'Tablets',
    icon: 'tablet_mac',
    image: 'assets/member3/products/lenovo-tablet.svg',
    accent: '#ea580c'
  },
  {
    id: 9,
    name: 'Fast Charger',
    price: 1299,
    category: 'Accessories',
    icon: 'bolt',
    image: 'assets/member3/products/fast-charger.svg',
    accent: '#ca8a04'
  },
  {
    id: 10,
    name: 'Wireless Mouse',
    price: 899,
    category: 'Accessories',
    icon: 'mouse',
    image: 'assets/member3/products/wireless-mouse.svg',
    accent: '#64748b'
  }
];

export const BADGE_CLASS: Record<string, string> = {
  New: 'badge-new',
  Hot: 'badge-hot',
  Popular: 'badge-popular'
};

export function filterProductsByCategory(
  products: Product[],
  category: CategoryFilter
): Product[] {
  if (category === 'All') {
    return products;
  }

  return products.filter(product => product.category === category);
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

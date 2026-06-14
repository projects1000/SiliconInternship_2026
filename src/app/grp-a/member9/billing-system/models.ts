export interface Product {
    name: string;
    price: number;
}

export interface CartItem {
    product: Product;
    qty: number;
    total: number;
}

export interface CustomerDetails {
    name: string;
    mobile: string;
}

export interface AppNotification {
    type: 'success' | 'primary' | 'warning';
    message: string;
}

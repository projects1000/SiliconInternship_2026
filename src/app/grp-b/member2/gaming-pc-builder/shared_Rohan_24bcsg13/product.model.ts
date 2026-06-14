// ============================================================
// product.model.ts
// Shared data model for Gaming PC products
// Used across parent & child components (Parent → Child via @Input)
// ============================================================

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;          // Path to image in assets/computer_parts/
  brand: string;
  specs?: string;         // Optional short spec description
}

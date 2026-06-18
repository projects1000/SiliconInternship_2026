
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Productservice } from '../shared/product.service';
import { CartService } from '../shared/cart.service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Productservice | null = null;
  relatedProducts: Productservice[] = [];

  quantity: number = 1;
  selectedSize: string = '';
  selectedColor: string = '';
  mainImage: string = '';

  constructor(
    public productService: ProductService,
    public cartService: CartService,
    public toastService: ToastService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      const productId = Number(params['id']);

      this.product = this.productService.getProductById(productId) || null;

      if (this.product) {
        this.mainImage = this.product.image;
        this.selectedColor = this.product.colors?.[0] || '';
        this.selectedSize = this.product.sizes?.[0] || '';
        this.loadRelatedProducts();
      }

    });

    this.route.queryParams.subscribe(params => {
      if (params['addToCart'] === 'true') {
        this.addToCart();
      }
    });
  }

  loadRelatedProducts(): void {
    if (!this.product) return;

    this.relatedProducts = this.productService
      .getProductsByCategory(this.product.category)
      .filter(p => p.id !== this.product!.id)
      .slice(0, 4);
  }

  selectImage(image: string): void {
    this.mainImage = image;
  }

  addToCart(): void {
    if (!this.product) return;

    if (this.product.sizes?.length && !this.selectedSize) {
      this.toastService.show('Please select a size', 'error');
      return;
    }

    if (this.product.colors?.length && !this.selectedColor) {
      this.toastService.show('Please select a color', 'error');
      return;
    }

    this.cartService.addToCart(
      this.product,
      this.quantity,
      this.selectedSize,
      this.selectedColor
    );

    this.toastService.show(`${this.product.name} added to cart!`, 'success');
  }

  buyNow(): void {
    this.addToCart();
  this.router.navigate(['/grp-f/member4/cart', this.product?.id]);
  }

  increaseQuantity(): void {
    if (this.quantity < (this.product?.stock || 100)) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  getDiscountPercentage(): number {
    if (!this.product?.originalPrice) return 0;

    return Math.round(
      ((this.product.originalPrice - this.product.price) /
        this.product.originalPrice) * 100
    );
  }

  viewRelatedProduct(product: Productservice): void {
    this.router.navigate(['/grp-f/member4/product-detail', product.id]);
  }
}
import { Component, EventEmitter, Output } from '@angular/core';
import { NotificationService }
  from '../services/notification.service';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  selector: 'app-anime-collection',
  templateUrl: './anime-collection.component.html',
  styleUrls: ['./anime-collection.component.css']
})
export class AnimeCollectionComponent {

  @Output()
  productAdded = new EventEmitter<Product>();

  constructor(
    private notificationService: NotificationService
  ) { }

  products = [
    {
      id: 1,
      category: 'Naruto',
      name: 'Naruto Hokage Figure',
      price: 2499,
      image: 'assets/anime/naruto.webp'
    },
    {
      id: 2,
      category: 'One Piece',
      name: 'Gear 5 Luffy Statue',
      price: 3299,
      image: 'assets/anime/luffy.webp'
    },
    {
      id: 3,
      category: 'JJK',
      name: 'Gojo Satoru Figure',
      price: 2799,
      image: 'assets/anime/gojo.webp'
    },
    {
      id: 4,
      category: 'AOT',
      name: 'Levi Ackerman Figure',
      price: 2999,
      image: 'assets/anime/levi.webp'
    },
    {
      id: 5,
      category: 'Demon Slayer',
      name: 'Tanjiro Katana',
      price: 3999,
      image: 'assets/anime/tanjiro.webp'
    }
  ];

  addProduct(product: Product) {

    this.productAdded.emit(product);

    this.notificationService.sendMessage(
      `${product.name} added successfully`
    );

  }

  selectedCategory = 'All';

  categories = [
    'All',
    'Naruto',
    'One Piece',
    'JJK',
    'AOT',
    'Demon Slayer'
  ];

  searchText = '';

  get filteredProducts() {

    return this.products.filter(product => {

      const categoryMatch =
        this.selectedCategory === 'All'
        || product.category === this.selectedCategory;

      const searchMatch =
        product.name.toLowerCase()
          .includes(this.searchText.toLowerCase());

      return categoryMatch && searchMatch;

    });

  }

}

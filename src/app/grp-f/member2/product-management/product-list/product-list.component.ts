import { Component, Input } from '@angular/core';
import {
  Output,
  EventEmitter
} from '@angular/core';

import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Output()

productAdded =

new EventEmitter<any>();

constructor(

  private snackBar:
  MatSnackBar

){}
increaseQty(product:any){

  product.quantity++;

}

decreaseQty(product:any){

  if(product.quantity > 1){

    product.quantity--;

  }

}
addToCart(product:any){

  const selectedProduct = {

    ...product,

    totalPrice:

      product.price *

      product.quantity

  };

  this.productAdded.emit(
    selectedProduct
  );

  this.snackBar.open(

    'Product Added Successfully',

    'Close',

    {
      duration:3000
    }

  );

}

  @Input()
  selectedCategory = '';

  products:any = {

    'Skincare':[

      {
        name:'Vitamin C Face Serum',
        brand:'Minimalist',
        price:699,
        quantity:1,
        image:'assets/Member-2(group-f)/products/serum.jpg'
      },

      {
        name:'SPF 50 Sunscreen',
        brand:'Aqualogica',
        price:499,
        quantity:1,
        image:'assets/Member-2(group-f)/products/sunscreen.jpg'
      },

      {
        name:'Hydrating Face Wash',
        brand:'Cetaphil',
        price:399,
        quantity:1,
        image:'assets/Member-2(group-f)/products/facewash.jpg'
      },

      {
        name:'Night Repair Cream',
        brand:'Dot & Key',
        price:799,
        quantity:1,
        image:'assets/Member-2(group-f)/products/nightcream.jpg'
      }

    ],

    'Haircare':[

      {
        name:'Rice Water Shampoo',
        brand:'Mamaearth',
        price:399,
        quantity:1,
        image:'assets/Member-2(group-f)/products/shampoo.jpg'
      },

      {
        name:'Hair Growth Serum',
        brand:'Pilgrim',
        price:599,
        quantity:1,
        image:'assets/Member-2(group-f)/products/hairserum.jpg'
      },

      {
        name:'Argan Hair Oil',
        brand:'Streax',
        price:299,
        quantity:1,
        image:'assets/Member-2(group-f)/products/hairoil.jpg'
      },

      {
        name:'Keratin Hair Mask',
        brand:'LOreal',
        price:699,
        quantity:1,
        image:'assets/Member-2(group-f)/products/hairmask.jpg'
  
      }

    ],

    'Perfumes':[

      {
        name:'Rose Mist Perfume',
        brand:'Bella Vita',
        price:799,
        quantity:1,
        image:'assets/Member-2(group-f)/products/perfume1.jpg'
      },

      {
        name:'Luxury Oud Perfume',
        brand:'Ajmal',
        price:1499,
        quantity:1,
        image:'assets/Member-2(group-f)/products/perfume2.jpg'
      },

      {
        name:'Vanilla Body Mist',
        brand:'Plum',
        price:599,
        quantity:1,
        image:'assets/Member-2(group-f)/products/mist.jpg'
      }

    ],

    'Lip Care':[

      {
        name:'Berry Lip Balm',
        brand:'Nivea',
        price:199,
        quantity:1,
        image:'assets/Member-2(group-f)/products/lipbalm.jpg'
      },

      {
        name:'Hydrating Lip Oil',
        brand:'Dot & Key',
        price:299,
        quantity:1,
        image:'assets/Member-2(group-f)/products/lipoil.jpg'
      },

      {
        name:'Lip Scrub',
        brand:'MCaffeine',
        price:249,
        quantity:1,
        image:'assets/Member-2(group-f)/products/lipscrub.jpg'
      }

    ],

    'Foot Care':[

      {
        name:'Foot Repair Cream',
        brand:'Himalaya',
        price:249,
        quantity:1,
        image:'assets/Member-2(group-f)/products/footcream.jpg'
      },

      {
        name:'Heel Repair Balm',
        brand:'Dr Foot',
        price:299,
        quantity:1,
        image:'assets/Member-2(group-f)/products/heelcream.jpg'
      }

    ],

    'Body Care':[

      {
        name:'Cocoa Body Lotion',
        brand:'Nivea',
        price:349,
        quantity:1,
        image:'assets/Member-2(group-f)/products/bodylotion.jpg'
      },

      {
        name:'Body Butter',
        brand:'Plum',
        price:499,
        quantity:1,
        image:'assets/Member-2(group-f)/products/bodybutter.jpg'
      },

      {
        name:'Body Wash',
        brand:'Dove',
        price:299,
        quantity:1,
        image:'assets/Member-2(group-f)/products/bodywash.jpg'
      },

      {
        name:'Body Oil',
        brand:'Johnson',
        price:399,
        quantity:1,
        image:'assets/Member-2(group-f)/products/bodyoil.jpg'
      }

    ]

  };

}
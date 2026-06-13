import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  @Output() bookAdded = new EventEmitter<any>();

  books = [
    {
      name: 'Atomic Habits',
      author: 'James Clear',
      price: 350,
      image: 'https://m.media-amazon.com/images/I/81F90H7hnML._AC_UF1000,1000_QL80_.jpg'
    },
    {
      name: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      price: 299,
      image: 'https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UF1000,1000_QL80_.jpg'
    },
    {
      name: 'Ikigai',
      author: 'Hector Garcia',
      price: 260,
      image: 'https://m.media-amazon.com/images/I/81l3rZK4lnL._AC_UF1000,1000_QL80_.jpg'
    },
    {
      name: 'Wings of Fire',
      author: 'A. P. J. Abdul Kalam',
      price: 180,
      image: 'https://m.media-amazon.com/images/I/71KKZlVjbwL._AC_UF1000,1000_QL80_.jpg'
    },
    {
      name: 'The Psychology of Money',
      author: 'Morgan Housel',
      price: 420,
      image: 'https://m.media-amazon.com/images/I/71g2ednj0JL._AC_UF1000,1000_QL80_.jpg'
    },
    {
      name: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      price: 220,
      image: 'https://m.media-amazon.com/images/I/61y04z8SKEL._AC_UF1000,1000_QL80_.jpg'
    },
    {
      name: 'The Alchemist',
      author: 'Paulo Coelho',
      price: 240,
      image: 'https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg'
    },
    {
    name: 'Harry Potter',
    author: 'J. K. Rowling',
    price: 450,
    image: 'https://m.media-amazon.com/images/I/81YOuOGFCJL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    name: 'The Power of Your Subconscious Mind',
    author: 'Joseph Murphy',
    price: 199,
    image: 'https://m.media-amazon.com/images/I/71sBtM3Yi5L._AC_UF1000,1000_QL80_.jpg'
  },
  {
    name: 'The 5 AM Club',
    author: 'Robin Sharma',
    price: 310,
    image: 'https://m.media-amazon.com/images/I/71zytzrg6lL._AC_UF1000,1000_QL80_.jpg'
  }
  ];

  addBook(book: any) {
    this.bookAdded.emit(book);
  }
}
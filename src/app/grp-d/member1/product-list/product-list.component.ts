import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input() productsList: any[] = [];
  @Input() activeProduct: any = null;
  @Output() onFocusFeature = new EventEmitter<any>();

  @ViewChild('shelfScroller') shelfScroller!: ElementRef;

  focusSneaker(product: any) {
    this.onFocusFeature.emit(product);
  }

  scrollCarousel(offset: number) {
    if (this.shelfScroller) {
      this.shelfScroller.nativeElement.scrollLeft += offset;
    }
  }
}
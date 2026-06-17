import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent {
  @Input() items: any[] = [];
  @Input() subTotal: number = 0;
  @Input() gst: number = 0;
  @Input() grandTotal: number = 0;
  
  @Output() onItemRemove = new EventEmitter<string>();

  emitRemoval(cartUid: string) {
    this.onItemRemove.emit(cartUid);
  }
}
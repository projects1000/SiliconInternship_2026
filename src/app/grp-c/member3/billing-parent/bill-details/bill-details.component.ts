import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent {
  // Parent se aane wala data yahan catch hoga
  @Input() selectedProducts: any[] = [];
  @Input() subTotal: number = 0;
  @Input() gst: number = 0;
  @Input() grandTotal: number = 0;
}

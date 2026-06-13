import { Component } from '@angular/core';
import { MessageService, ToastMessage } from './services/message.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent {

  view: string = 'product';
  toast: ToastMessage | null = null;

  constructor(private messageService: MessageService) {

    this.messageService.toastState$.subscribe(data => {
      this.toast = data;

      setTimeout(() => {
        this.toast = null;
      }, 2000);
    });

  }

  setView(v: string) {
    this.view = v;
  }
}

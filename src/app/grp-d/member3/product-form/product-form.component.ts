import { Component } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent {
  // 1. Declare the variable here so the HTML template can find it
  successMessage: string | null = null; 

  // Example function to trigger the message
  onSubmit() {
    this.successMessage = "Product added successfully!";
    
    // Optional: Hide the message after 3 seconds
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }
}
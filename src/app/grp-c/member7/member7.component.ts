import { Component } from '@angular/core';

@Component({
  selector: 'app-member7',
  templateUrl: './member7.component.html',
  styleUrls: ['./member7.component.css']
})
export class Member7Component {
  // Variable to store the uploaded image string preview
  imageUrl: string | ArrayBuffer | null = null;

  constructor() { }

  // Handles when you choose a photo from your computer
  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      // Convert the image file to a data URL data string
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      
      reader.readAsDataURL(file);
    }
  }

  connectMessage() {
    alert('Thank you for connecting!');
  }

  viewProjects() {
    alert('Projects section coming soon!');
  }

  // 👇 ADD THIS MISSING FUNCTION SO ANGULAR STOPS COMPLAINING 👇
  goBackToGroup() {
    // This allows the back navigation button in your template to work smoothly
    window.history.back();
  }
}
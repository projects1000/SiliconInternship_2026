import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-member9',
  templateUrl: './member9.component.html',
  styleUrls: ['./member9.component.css']
})
export class Member9Component {

  name = 'Nirmit Nayak';

  constructor(private location: Location) {}

  showMessage() {
    alert('Thank you for visiting my profile!');
  }

  goBack() {
    this.location.back();
  }

}
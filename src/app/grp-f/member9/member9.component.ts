import { Component } from '@angular/core';

@Component({
  selector: 'app-member9',
  templateUrl: './member9.component.html',
  styleUrls: ['./member9.component.css']
})
export class Member9Component {

  name = 'Nirmit Nayak';

  showMessage() {

    alert(
      'Thank you for visiting my profile!'
    );

  }

}
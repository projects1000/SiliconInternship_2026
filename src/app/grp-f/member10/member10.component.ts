import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member10',
  templateUrl: './member10.component.html',
  styleUrls: ['./member10.component.css']
})
export class Member10Component {
 constructor(private router: Router) {}

  goBackToGroup() {
    this.router.navigate(['grp-f']);

  }

  name = 'Padmalaya Meher';

  role = 'Angular Developer';

  college = 'Silicon University';

  email = 'meherpadmalaya@gmail.com';

  phone = '9876543210';

  address = 'balangir, Odisha';

  about = 'I am passionate about web development and Angular projects.';

  contact() {
    alert('Contact Successful');
  }

}

  


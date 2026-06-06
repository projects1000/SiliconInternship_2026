import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member6',
  templateUrl: './member6.component.html',
  styleUrls: ['./member6.component.css']
})
export class Member6Component {
<<<<<<< HEAD

  constructor(private router: Router) {}
=======
 constructor(private router: Router) {}
>>>>>>> 808ff84df3ea16ae08e772c705efb9331eebe50a

  goBackToGroup() {
    this.router.navigate(['grp-b']);
  }
<<<<<<< HEAD

}
=======
}
>>>>>>> 808ff84df3ea16ae08e772c705efb9331eebe50a

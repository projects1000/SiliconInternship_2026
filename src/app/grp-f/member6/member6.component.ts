import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member6',
  templateUrl: './member6.component.html',
  styleUrls: ['./member6.component.css']
})
export class Member6Component {

  constructor(private router: Router) {}

  goBackToGroup() {
    this.router.navigate(['grp-f']);
  }
}
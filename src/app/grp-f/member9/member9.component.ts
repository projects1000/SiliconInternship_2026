import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member9',
  templateUrl: './member9.component.html',
  styleUrls: ['./member9.component.css']
})
export class Member9Component {

  name = 'Nirmit Nayak';

  constructor(
    private location: Location,
    private router: Router
  ) {}

  openDashboard() {

    this.router.navigate(
      ['/grp-f/member9/dashboard']
    );

  }

  goBack() {

    this.location.back();

  }

}
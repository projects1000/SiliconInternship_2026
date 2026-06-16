// src/app/grp-f/member10/member10-chatapp/member10-chatapp.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member10-chatapp',
  templateUrl: './member10-chatapp.component.html',
  styleUrls: ['./member10-chatapp.component.css']
})
export class Member10ChatAppComponent {
  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate(['/grp-f/member10']);
  }
}
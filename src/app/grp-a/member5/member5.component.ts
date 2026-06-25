import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member5',
  templateUrl: './member5.component.html',
  styleUrls: ['./member5.component.css']
})
export class Member5Component {
  activeTab: string = 'about';

  constructor(private router: Router) {}

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  goBackToGroup() {
    this.router.navigate(['grp-a']);
  }
}

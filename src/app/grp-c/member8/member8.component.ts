import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member8',
  templateUrl: './member8.component.html',
  styleUrls: ['./member8.component.css']
})
export class Member8Component {
 constructor(private router: Router) {}

  goBackToGroup() {
    this.router.navigate(['grp-c']);
  }
  isDarkMode = false;

toggleTheme() {
  this.isDarkMode = !this.isDarkMode;
}

openGithub() {
  window.open('https://github.com/safaq11', '_blank');
}
}

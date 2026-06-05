import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
constructor(private router: Router) {}
goToGrpA() {
  this.router.navigate(['grp-a']);
}

goToGrpB() {
  this.router.navigate(['grp-b']);
}

goToGrpC() {
  this.router.navigate(['grp-c']);
}

goToGrpD() {
  this.router.navigate(['grp-d']);
}

goToGrpE() {
  this.router.navigate(['grp-e']);
}

goToGrpF() {
  this.router.navigate(['grp-f']);
}

goToGrpG() {
  this.router.navigate(['grp-g']);
}
}

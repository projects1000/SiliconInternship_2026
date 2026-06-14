import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output()
  navigate = new EventEmitter<string>();

  goTo(section: string) {
    this.navigate.emit(section);
  }

}
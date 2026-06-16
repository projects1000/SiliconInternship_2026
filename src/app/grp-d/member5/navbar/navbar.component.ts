import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output() pageChange = new EventEmitter<string>();

  selectedPage = 'home';

  changePage(page: string) {

    this.selectedPage = page;

    this.pageChange.emit(page);

  }

}
import { Component } from '@angular/core';

@Component({
  selector: 'app-member8',
  templateUrl: './member8.component.html',
  styleUrls: ['./member8.component.css']
})
export class Member8Component {

  currentSection = 'home';

  showSection(section: string) {
    this.currentSection = section;
  }

}
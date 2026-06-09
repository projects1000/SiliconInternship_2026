import { Component} from '@angular/core';

@Component({
  selector: 'app-attendance-container',
  templateUrl: './attendance-container.component.html',
  styleUrls: ['./attendance-container.component.css']
})
export class AttendanceContainerComponent {
  isDarkMode = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }
}
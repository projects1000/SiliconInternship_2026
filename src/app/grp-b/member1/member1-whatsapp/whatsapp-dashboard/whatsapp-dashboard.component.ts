// grp-b/member1/member1-whatsapp/whatsapp-dashboard/whatsapp-dashboard.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-dashboard',
  templateUrl: './whatsapp-dashboard.component.html',
  styleUrls: ['./whatsapp-dashboard.component.css'],
})
export class WhatsappDashboardComponent {
  isDarkMode: boolean = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }
}
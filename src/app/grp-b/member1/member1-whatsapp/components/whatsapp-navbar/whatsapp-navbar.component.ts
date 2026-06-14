// grp-b/member1/member1-whatsapp/components/whatsapp-navbar/whatsapp-navbar.component.ts
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-whatsapp-navbar',
  templateUrl: './whatsapp-navbar.component.html',
  styleUrls: ['./whatsapp-navbar.component.css'],
})
export class WhatsappNavbarComponent {
  @Input() isDark: boolean = false;
  @Output() themeToggled = new EventEmitter<void>();

  toggle() {
    this.themeToggled.emit();
  }
}
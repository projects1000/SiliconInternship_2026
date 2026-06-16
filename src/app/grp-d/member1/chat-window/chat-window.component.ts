import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-window',
  template: `
    <div class="simulation-canvas">
      
      <button class="leave-canvas-link" (click)="exitStudio()">
        ← EXIT WORKSPACE
      </button>

      <div class="studio-header">
        <h1>REACTIVE SIMULATOR : DUAL-DEVICE WORKSPACE</h1>
        <p>Designed by Chandan From Group D</p>
      </div>

      <div class="isometric-stage">
        <app-user-a></app-user-a>
        <app-user-b></app-user-b>
      </div>

    </div>
  `,
  styleUrls: ['./chat-window.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatWindowComponent {
  constructor(private router: Router) {}
  
  exitStudio() { 
    this.router.navigate(['/grp-d/member1']); 
  }
}
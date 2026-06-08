import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member1',
  templateUrl: './member1.component.html',
  styleUrls: ['./member1.component.css'],
})
export class Member1Component implements OnInit {
  constructor(private router: Router) {}

  roles: string[] = [
    'Full Stack Developer',
    'Angular Developer',
    'Frontend Engineer',
    'UI/UX Enthusiast',
    'Problem Solver',
  ];

  displayText = '';
  private roleIndex = 0;
  private charIndex = 0;

  ngOnInit(): void {
    this.typeEffect();
  }

  typeEffect() {
    const currentRole = this.roles[this.roleIndex];

    if (this.charIndex < currentRole.length) {
      this.displayText += currentRole.charAt(this.charIndex);
      this.charIndex++;
      setTimeout(() => this.typeEffect(), 120);
    } else {
      setTimeout(() => {
        this.displayText = '';
        this.charIndex = 0;
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
        this.typeEffect();
      }, 1500);
    }
  }

  // New Routing Action to navigate directly into your attendance deployment view
  navigateToAttendance() {
    // Navigates to your group B attendance sub-route path context setup
    this.router.navigate(['grp-b/member1/attendance']);
  }

  goBackToGroup() {
    this.router.navigate(['grp-b']);
  }
}

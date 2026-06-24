import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member4',
  templateUrl: './member4.component.html',
  styleUrls: ['./member4.component.css']
})
export class Member4Component implements OnInit {

  userName: string = 'Lipsa Panda';

  role: string = 'Frontend Developer | Angular Specialist';

  projects: number = 12;

  experience: string = '1.5 Years';

  skills: string[] = [
    'Angular',
    'TypeScript',
    'JavaScript',
    'HTML5',
    'CSS3',
    'RxJS',
    'NgRx',
    'Bootstrap',
    'Tailwind CSS',
    'Git & GitHub',
    'Responsive Design',
    'UI/UX'
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('Member4 Portfolio Loaded');
  }

  goBackToGroup(): void {
    this.router.navigate(['/grp-f']);
  }

  scrollTo(sectionId: string): void {

    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

  }

}
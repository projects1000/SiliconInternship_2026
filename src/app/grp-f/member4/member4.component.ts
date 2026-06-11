import { Component } from '@angular/core';

@Component({
  selector: 'app-member4',
  templateUrl: './member4.component.html',
  styleUrls: ['./member4.component.css']
})
export class Member4Component {

  userName = 'Lipsa Panda';

  role = 'Frontend Developer';

  projects = 15;

  experience = '6+ Months';

  skills: string[] = [
    'Angular',
    'TypeScript',
    'JavaScript',
    'HTML5',
    'CSS3',
    'Bootstrap',
    'Git',
    'GitHub',
    'Responsive Design'
  ];

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
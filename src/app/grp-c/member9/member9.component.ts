import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member9',
  templateUrl: './member9.component.html',
  styleUrls: ['./member9.component.css']
})
export class Member9Component {

  constructor(private router: Router) {}

  name = 'Sohan Mohanty';
  role = 'Frontend Angular Developer';
  college = 'Silicon University';
  email = 'sohan@gmail.com';
  phone = '+91 6789032112';

  projectsCompleted = 5;
  componentsCreated = 15;
  internshipMonths = 3;
  learningProgress = 100;

  skills = [
    'Angular',
    'TypeScript',
    'JavaScript',
    'HTML5',
    'CSS3',
    'Bootstrap',
    'Git',
    'GitHub',
    'REST API',
    'Responsive Design'
  ];

  education = [
    {
      degree: 'B.Tech',
      institute: 'Silicon University',
      year: '2022 - Present'
    }
  ];

  certifications = [
    'Angular Fundamentals',
    'Frontend Web Development',
    'Git & GitHub',
    'TypeScript Basics',
    'Responsive Web Design'
  ];

  achievements = [
    'Developed Attendance Management System',
    'Created Billing Management System',
    'Implemented Angular Routing',
    'Worked with Angular Forms',
    'Built Responsive User Interfaces'
  ];

  internshipTasks = [
    'Attendance Management',
    'Profile Dashboard',
    'Billing Management',
    'Angular Material Integration',
    'Git Branch Management',
    'WhatsApp Chat Application'
  ];

  openProject() {
    this.router.navigate(['/grp-c/product-management']);
  }

  openChatbot() {
    this.router.navigate(['/grp-c/chatbot']);
  }

  contactMe() {
    alert(
      'Thank You For Visiting My Portfolio!\n\nEmail: ' +
      this.email +
      '\nPhone: ' +
      this.phone
    );
  }
}
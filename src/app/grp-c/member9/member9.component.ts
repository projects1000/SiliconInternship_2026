import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member9',
  templateUrl: './member9.component.html',
  styleUrls: ['./member9.component.css']
})
export class Member9Component {

  constructor(private router: Router) {}

  // Profile Details
  name = 'Sohan Mohanty';
  role = 'Frontend Angular Developer';
  college = 'Silicon University';
  email = 'sohan@gmail.com';
  phone = '+91 6789032112';

  constructor(private router: Router) {}

 openAttendance() {
  this.router.navigate(['/grp-c/attendance']);
}
  // Portfolio Stats
  projectsCompleted = 5;
  componentsCreated = 15;
  internshipMonths = 3;
  learningProgress = 100;

  // Skills
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

  // Education
  education = [
    {
      degree: 'B.Tech',
      institute: 'Silicon University',
      year: '2022 - Present'
    }
  ];

  // Certifications
  certifications = [
    'Angular Fundamentals',
    'Frontend Web Development',
    'Git & GitHub',
    'TypeScript Basics',
    'Responsive Web Design'
  ];

  // Achievements
  achievements = [
    'Developed Attendance Management System',
    'Created Billing Management System',
    'Implemented Angular Routing',
    'Worked with Angular Forms',
    'Built Responsive User Interfaces'
  ];

  // Internship Tasks
  internshipTasks = [
    'Attendance Management',
    'Profile Dashboard',
    'Billing Management',
    'Angular Material Integration',
    'Git Branch Management'
  ];

  openProject() {
    this.router.navigate(['/grp-c/product-management']);
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
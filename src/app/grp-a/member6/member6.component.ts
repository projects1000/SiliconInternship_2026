import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member6',
  templateUrl: './member6.component.html',
  styleUrls: ['./member6.component.css']
})
export class Member6Component {
  
  constructor(private router: Router) {}

  // Identity Data
  fullName: string = 'Satyabrat Sarangi';
  role: string = 'Software Engineering Intern';
  academicStatus: string = 'B.Tech CSE — Sem IV';
  location: string = 'Bhubaneswar, IND';
  
  // The Small Round Avatar
  avatarUrl: string = 'assets/satyabrat_sarangi.jpg';

  // Current Engagement
  internshipDetails: string = 'Currently undertaking a Summer Internship focusing on full-stack development. Engineering robust backends with Java Spring Boot and integrating them with dynamic Angular frontends.';

  // Engineering Philosophy
  philosophy: string = 'Committed to clean, modular architecture. I prioritize strict separation of concerns—keeping UI technologies distinct from backend business logic—to build scalable and maintainable systems.';

  // Technical Arsenal
  competencies: { category: string; skills: string[] }[] = [
    {
      category: 'Enterprise Backend Ecosystem',
      skills: ['Core Java', 'Advance Java', 'Spring Boot', 'Spring Security', 'JPA / Hibernate', 'JDBC', 'Python']
    },
    {
      category: 'Database & Data Management',
      skills: ['PostgreSQL', 'MySQL', 'Oracle SQL']
    },
    {
      category: 'Frontend Architecture',
      skills: ['Angular (Basic)', 'HTML', 'CSS', 'JS']
    },
    {
      category: 'Lifecycle & Versioning',
      skills: ['Git', 'GitHub', 'Jira']
    }
  ];

  // Routing Method
  goBackToGroup() {
    this.router.navigate(['grp-a']);
  }
}
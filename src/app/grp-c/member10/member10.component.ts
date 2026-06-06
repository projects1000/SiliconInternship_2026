import { Component } from '@angular/core';

@Component({
  selector: 'app-member10',
  templateUrl: './member10.component.html',
  styleUrls: ['./member10.component.css']
})
export class Member10Component {

  profile = {
    name: 'Hrushikesh Pattanaik',
    role: 'Full Stack Developer',
    internship: 'Silicon Internship 2026 | Group C | Member 10',
    location: 'Bhubaneswar, Odisha',
    email: 'hrushikeshpattanaik06@gmail.com',
    github: 'https://github.com/hpattanaik12',
    linkedin: 'https://linkedin.com',
    image: 'assets/images/hrushikesh.jpg'
  };

  skills = [
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'Angular',
    'Java',
    'Python',
    'C',
    'MySQL',
    'Git',
    'GitHub'
  ];

  learning = [
    'Angular Routing',
    'Generative AI',
    'DSA',
    'Spring Boot'
  ];

  projects = [
    {
      title: 'GoKart E-Commerce System',
      description:
        'Developed a full-stack e-commerce platform with product management, cart functionality, authentication, and responsive UI.',
      tech: 'Angular • TypeScript • CSS'
    },
    {
      title: 'Portfolio Website',
      description:
        'Designed and developed a personal portfolio showcasing projects, skills, and achievements.',
      tech: 'HTML • CSS • JavaScript'
    },
    {
      title: 'Student Management System',
      description:
        'Built a student information management application for maintaining academic records efficiently.',
      tech: 'Java • MySQL'
    },
    {
      title: 'Decathlon Clone',
      description:
        'Created a responsive clone of Decathlon’s e-commerce platform with modern UI and navigation.',
      tech: 'Angular • CSS • TypeScript'
    }
  ];

  achievements = [
    'Participated in Hackathons',
    'Cricket Tournaments',
    'NSS Activities',
    'Technical Workshops',
    'Coding Competitions'
  ];

  about =
    'A 3rd-year B.Tech Computer Science undergraduate at Silicon University with a strong interest in full-stack development. I enjoy building end-to-end web applications, from creating intuitive and responsive user interfaces to developing scalable backend solutions. Passionate about problem-solving, clean architecture, and continuous learning, I strive to write code that is efficient, maintainable, and impactful.';
}
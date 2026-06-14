import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member7',
  templateUrl: './member7.component.html',
  styleUrls: ['./member7.component.css']
})
export class Member7Component {
  profile = {
    name: 'Priyanshu Sekhar Badhei',
    title: 'Software Engineer',
    location: 'Bhubaneswar, Odisha',
    avatar: 'assets/images/priyanshu_profile.jpg',
    bio: 'Aspiring student at Silicon University focused on building clean, high-performance web applications. I specialize in modern software engineering principles, combining back-end robustness with responsive front-end designs.',
    email: 'priyanshusekhar2050@gmail.com',
    github: 'https://github.com/priyanshusekhar',
    linkedin: 'https://www.linkedin.com/in/priyanshu-sekhar-badhei-34459b377/'
  };

  skills = [
    { name: 'Angular', icon: 'code' },
    { name: 'SpringBoot', icon: 'settings' },
    { name: 'Java', icon: 'coffee' },
    { name: 'Python', icon: 'terminal' },
    { name: 'C', icon: 'integration_instructions' },
    { name: 'Cloud (AWS)', icon: 'cloud' },
    { name: 'MySQL', icon: 'storage' }
  ];

  constructor(private router: Router) {}

  goBackToGroup() {
    this.router.navigate(['grp-a']);
  }

  goToAttendance() {
    this.router.navigate(['/grp-a/member7/attendance']);
  }
}



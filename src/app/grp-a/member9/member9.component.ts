import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member9',
  templateUrl: './member9.component.html',
  styleUrls: ['./member9.component.css']
})
export class Member9Component {
 constructor(private router: Router) {}

  
  fullName = 'RONIT KUMAR SWAIN';
  introduction = 'Learning Full Stack Development';
  avatarUrl = 'https://erp.silicon.ac.in/uploads/student_photo/SITBBS_B.TECH_2024-2028/CSE/24BCSH03/24BCSH03_64X64.jpg';
  avatarFallback = '';

  displayText = 'AI/ML Enthusiast';

  profileInfo = [
    { label: 'Email', value: 'kumarswainronit@gmail.com', icon: '✉' },
    { label: 'Phone', value: '+91 9876543210', icon: '📱' },
    { label: 'Location', value: 'Bhubaneswar, India', icon: '📍' }
  ];

  aboutText =
    'Passionate developer interested in AI/ML, Java, Development.';

  skillCategories = [
    {
      category: 'Frontend',
      icon: '🖥',
      skills: [
        { name: 'Angular', icon: '🅰' },
        { name: 'HTML', icon: '🌐' },
        { name: 'CSS', icon: '🎨' }
      ]
    },
    {
      category: 'Backend',
      icon: '⚙',
      skills: [
        { name: 'Java', icon: '☕' },
        // { name: 'Spring Boot', icon: '🍃' }
      ]
    }
  ];

  experiences = [
    {
      role: 'Intern',
      company: 'Python Programming Machine Learning and Deep Learning for Industry',
      duration: 'June 2026 - July 2026',
      description: 'Python Programming and Different Machine Learning Concepts',
      current: false,
      certificate: 'assets/Ronit/RONIT KUMAR SWAIN S1.pdf'
    },

    {
      role: 'Intern',
      company: 'Full Stack Development',
      duration: 'May 2026 - Present',
      description: 'Learning Full Stack Development',
      current: true
    }
  ];

  projects = [
    {
      title: 'Hospital Management System',
      description: 'Angular CRUD Application',
      stack: ['Angular', 'TypeScript'],
      gradient: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
      icon: '🏥',
      github: 'https://github.com',
      demo: 'https://github.com'
    }
  ];

  achievements = [
    {
      label: 'Projects',
      value: 10,
      suffix: '+',
      icon: '🚀'
    }
  ];

  animatedValues = [10];

  socialLinks = [
    {
      label: 'GitHub',
      icon: '🐙',
      url: 'https://github.com/Ronit-kumar-swain-07',

      color: '#6366f1'
    },
    {
      label: 'LinkedIn',
      icon: '💼',
      url: 'https://www.linkedin.com/in/ronit-kumar-swain-3b94a3303/',
      color: '#0a66c2'
    },
    {
      label: 'LeetCode',
      icon: '👨‍💻',
      url: 'https://leetcode.com/u/RONIT_KUMAR_SWAIN/',
      color: '#0a66c2'
    },
    {
      label: 'GeeksforGeeks',
      icon: '🧑🏻‍💻',
      url: 'https://www.geeksforgeeks.org/profile/kumarswainronit?tab=activity',
      color: '#0a66c2'
    }
  ];

  contactName = '';
  contactEmail = '';
  contactMessage = '';

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  }

  onSendMessage() {

  if (
    !this.contactName ||
    !this.contactEmail ||
    !this.contactMessage
  ) {
    alert('Please fill all fields');
    return;
  }

  const data = {
    name: this.contactName,
    email: this.contactEmail,
    message: this.contactMessage
  };

  fetch(
    'https://script.google.com/macros/s/AKfycbxR4CPDl6EYZ8kf0ipFI3niUFFdesEm8L7XbSSfZ4ZkColP_A3I7YdpwalOEovdTr_Beg/exec',
    {
      method: 'POST',
      body: JSON.stringify(data)
    }
  )
    .then(() => {

      alert('Message Sent Successfully ✅');

      this.contactName = '';
      this.contactEmail = '';
      this.contactMessage = '';

    })
    .catch(() => {

      alert('Error Sending Message ❌');

    });
}

goBackToGroup() {
    this.router.navigate(['grp-a']);
  }
}

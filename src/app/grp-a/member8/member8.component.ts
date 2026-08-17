import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

interface Project {
  title: string;
  category: 'Full-Stack' | 'AI & Web3' | 'Systems';
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-member8',
  templateUrl: './member8.component.html',
  styleUrls: ['./member8.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger('100ms', [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', 
            style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class Member8Component {
  isDarkMode = true;
  selectedFilter = 'All';

  categories = ['All', 'Full-Stack', 'AI & Web3', 'Systems'];

  projects: Project[] = [
    {
      title: 'proveSkill',
      category: 'Systems',
      description: 'A robust DBMS-backed platform optimizing skill tracking and verification with advanced query performance.',
      tags: ['Angular', 'Node.js', 'PostgreSQL', 'DBMS']
    },
    {
      title: 'Real-Time RAG Pipeline',
      category: 'AI & Web3',
      description: 'Built during a high-stakes hackathon. Processes live data streams seamlessly using a reactive data pipeline.',
      tags: ['Pathway', 'Python', 'AI', 'Vector DB']
    },
    {
      title: 'E-Commerce Flower Shop',
      category: 'Full-Stack',
      description: 'A premium, highly visual store featuring custom state management and seamless user checkout flows.',
      tags: ['MongoDB', 'Express', 'React', 'Node.js']
    }
  ];

  get filteredProjects() {
    if (this.selectedFilter === 'All') return this.projects;
    return this.projects.filter(p => p.category === this.selectedFilter);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  setFilter(category: string) {
    this.selectedFilter = category;
  }
}
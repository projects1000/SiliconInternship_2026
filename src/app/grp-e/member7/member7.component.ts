import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member7',
  templateUrl: './member7.component.html',
  styleUrls: ['./member7.component.css']
})
export class Member7Component {
  tiltX = 0;
  tiltY = 0;

  // Custom cursor variables
  cursorX = -100;
  cursorY = -100;
  cursorRingX = -100;
  cursorRingY = -100;
  isHovering = false;
  cursorVisible = false;

  // Theme customizer
  activeThemeColor = '#F3B323'; // Sun Gold (default)
  themes = [
    { name: 'gold', color: '#F3B323' },
    { name: 'emerald', color: '#10B981' },
    { name: 'sakura', color: '#EC4899' },
    { name: 'amethyst', color: '#8B5CF6' }
  ];

  // Enriched Works / Projects Data
  works = [
    {
      name: 'Angular Lab',
      type: 'Frontend',
      text: 'Reusable sections, routing, responsive layouts and polished page states.',
      tags: ['Angular', 'TypeScript', 'RxJS'],
      demoLink: 'https://github.com',
      codeLink: 'https://github.com'
    },
    {
      name: 'Game UI Kit',
      type: 'Game Design',
      text: 'HUD panels, score cards, level screens and playful interactive visual systems.',
      tags: ['Figma', 'CSS Grid', 'UX/UI'],
      demoLink: 'https://github.com',
      codeLink: 'https://github.com'
    },
    {
      name: 'Creative Portfolio',
      type: 'Design',
      text: 'Editorial pages with motion, typography, 3D depth and detail-rich storytelling.',
      tags: ['HTML5', 'GSAP', 'Flexbox'],
      demoLink: 'https://github.com',
      codeLink: 'https://github.com'
    }
  ];

  // Skills Section Data
  skills = [
    { name: 'Angular Framework', level: 'Advanced', icon: '⚡' },
    { name: 'TypeScript & ES6+', level: 'Expert', icon: '🛡️' },
    { name: 'Reactive RxJS', level: 'Intermediate', icon: '🔄' },
    { name: 'UI/UX & Figma', level: 'Creative', icon: '🎨' },
    { name: 'CSS Grid & SCSS Layouts', level: 'Fluid', icon: '📐' },
    { name: 'Game HUD & Menu Design', level: 'Playful', icon: '🎮' }
  ];

  // Milestone Timeline Data
  milestones = [
    { year: '2024', title: 'Creative Beginnings', desc: 'Discovered the art of combining animation, layouts, and typography.' },
    { year: '2025', title: 'Deep Dive JS/TS & Figma', desc: 'Crafted detailed UI mockups and mastered asynchronous programming.' },
    { year: '2026', title: 'Angular Framework & Game UI', desc: 'Building complex single-page apps and responsive HUD dashboards.' }
  ];

  setTheme(color: string): void {
    this.activeThemeColor = color;
  }

  @HostListener('mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    // 3D Tilt calculation
    this.tiltY = (event.clientX / window.innerWidth - 0.5) * 10;
    this.tiltX = (0.5 - event.clientY / window.innerHeight) * 8;

    // Custom cursor updates
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;
    this.cursorRingX = event.clientX;
    this.cursorRingY = event.clientY;

    const target = event.target as HTMLElement;
    this.isHovering = !!target.closest('a, button, article, .interactive-item, .theme-dot, .asterisk, .timeline-item');
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.cursorVisible = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.cursorVisible = false;
  }

  scrollTo(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

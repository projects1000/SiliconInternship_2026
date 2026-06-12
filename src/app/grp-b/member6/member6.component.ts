import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member6',

  templateUrl: './member6.component.html',

  styleUrls: ['./member6.component.css']
})

export class Member6Component
implements OnInit {

  greetingMessage = '';

  currentTheme = '';

  developerText =
  'Java Full Stack Developer';

  displayedText = '';

  currentIndex = 0;

  typingSpeed = 120;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    this.setGreeting();

    this.startTypingAnimation();
  }

  setGreeting() {

    const hour =
    new Date().getHours();

    if (hour >= 5 && hour < 12) {

      this.greetingMessage =
      '🌞 Good Morning';

      this.currentTheme =
      'Morning Mode';
    }

    else if (
      hour >= 12 &&
      hour < 17
    ) {

      this.greetingMessage =
      '☀️ Good Afternoon';

      this.currentTheme =
      'Day Mode';
    }

    else if (
      hour >= 17 &&
      hour < 21
    ) {

      this.greetingMessage =
      '🌆 Good Evening';

      this.currentTheme =
      'Evening Mode';
    }

    else {

      this.greetingMessage =
      '🌙 Good Night';

      this.currentTheme =
      'Dark Mode';
    }
  }

  startTypingAnimation() {

    setInterval(() => {

      if (
        this.currentIndex <
        this.developerText.length
      ) {

        this.displayedText +=

        this.developerText.charAt(
          this.currentIndex
        );

        this.currentIndex++;
      }

      else {

        this.displayedText = '';

        this.currentIndex = 0;
      }

    }, this.typingSpeed);
  }

  goBackToGroup() {

    this.router.navigate([
      '/grp-b'
    ]);
  }

  openAttendance() {

    this.router.navigate([
      '/grp-b/member6/attendance'
    ]);
  }

}
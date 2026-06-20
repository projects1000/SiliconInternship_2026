import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ChatComponent } from './chat.component';
import { ChatService } from './services/chat.service';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatComponent],
      imports: [FormsModule],
      providers: [
        ChatService,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

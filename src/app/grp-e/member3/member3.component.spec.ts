import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { Member3Component } from './member3.component';

describe('Member3Component', () => {
  let component: Member3Component;
  let fixture: ComponentFixture<Member3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Member3Component],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

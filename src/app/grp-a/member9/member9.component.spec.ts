import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member9Component } from './member9.component';

describe('Member9Component', () => {
  let component: Member9Component;
  let fixture: ComponentFixture<Member9Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member9Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member6Component } from './member6.component';

describe('Member6Component', () => {
  let component: Member6Component;
  let fixture: ComponentFixture<Member6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member6Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

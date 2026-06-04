import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member7Component } from './member7.component';

describe('Member7Component', () => {
  let component: Member7Component;
  let fixture: ComponentFixture<Member7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

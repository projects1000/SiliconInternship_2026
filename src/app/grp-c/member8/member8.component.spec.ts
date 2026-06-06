import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member8Component } from './member8.component';

describe('Member8Component', () => {
  let component: Member8Component;
  let fixture: ComponentFixture<Member8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member8Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

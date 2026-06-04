import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member4Component } from './member4.component';

describe('Member4Component', () => {
  let component: Member4Component;
  let fixture: ComponentFixture<Member4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

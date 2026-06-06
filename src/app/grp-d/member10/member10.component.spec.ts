import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member10Component } from './member10.component';

describe('Member10Component', () => {
  let component: Member10Component;
  let fixture: ComponentFixture<Member10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member10Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

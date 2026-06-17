import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Attendence0001Component } from './attendence0001.component';

describe('Attendence0001Component', () => {
  let component: Attendence0001Component;
  let fixture: ComponentFixture<Attendence0001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Attendence0001Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Attendence0001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

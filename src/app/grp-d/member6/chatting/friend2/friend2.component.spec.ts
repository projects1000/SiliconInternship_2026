import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Friend2Component } from './friend2.component';

describe('Friend2Component', () => {
  let component: Friend2Component;
  let fixture: ComponentFixture<Friend2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Friend2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Friend2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

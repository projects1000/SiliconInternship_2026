import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Friend1Component } from './friend1.component';

describe('Friend1Component', () => {
  let component: Friend1Component;
  let fixture: ComponentFixture<Friend1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Friend1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Friend1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnshumanComponent } from './user-anshuman.component';

describe('UserAnshumanComponent', () => {
  let component: UserAnshumanComponent;
  let fixture: ComponentFixture<UserAnshumanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAnshumanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAnshumanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

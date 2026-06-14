import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBComponent } from './user-b.component';

describe('UserBComponent', () => {
  let component: UserBComponent;
  let fixture: ComponentFixture<UserBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

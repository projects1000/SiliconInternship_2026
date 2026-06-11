import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAComponent } from './user-a.component';

describe('UserAComponent', () => {
  let component: UserAComponent;
  let fixture: ComponentFixture<UserAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

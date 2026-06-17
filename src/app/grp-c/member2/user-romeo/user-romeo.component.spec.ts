import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRomeoComponent } from './user-romeo.component';

describe('UserRomeoComponent', () => {
  let component: UserRomeoComponent;
  let fixture: ComponentFixture<UserRomeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRomeoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRomeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

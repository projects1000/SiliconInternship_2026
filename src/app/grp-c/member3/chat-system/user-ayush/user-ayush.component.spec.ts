import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAyushComponent } from './user-ayush.component';

describe('UserAyushComponent', () => {
  let component: UserAyushComponent;
  let fixture: ComponentFixture<UserAyushComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAyushComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAyushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

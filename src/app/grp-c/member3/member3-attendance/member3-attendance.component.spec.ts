import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member3AttendanceComponent } from './member3-attendance.component';

describe('Member3AttendanceComponent', () => {
  let component: Member3AttendanceComponent;
  let fixture: ComponentFixture<Member3AttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member3AttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member3AttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

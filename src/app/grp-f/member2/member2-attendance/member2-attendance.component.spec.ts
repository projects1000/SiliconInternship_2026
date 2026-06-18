import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member2AttendanceComponent } from './member2-attendance.component';

describe('Member2AttendanceComponent', () => {
  let component: Member2AttendanceComponent;
  let fixture: ComponentFixture<Member2AttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member2AttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member2AttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

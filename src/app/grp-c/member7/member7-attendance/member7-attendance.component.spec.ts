import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member7AttendanceComponent } from './member7-attendance.component';

describe('Member7AttendanceComponent', () => {
  let component: Member7AttendanceComponent;
  let fixture: ComponentFixture<Member7AttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member7AttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member7AttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

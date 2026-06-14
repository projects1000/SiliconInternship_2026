import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member6AttendanceComponent } from './member6-attendance.component';

describe('Member6AttendanceComponent', () => {
  let component: Member6AttendanceComponent;
  let fixture: ComponentFixture<Member6AttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member6AttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member6AttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

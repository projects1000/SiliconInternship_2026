import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubhalaxmiAttendanceComponent } from './subhalaxmi-attendance.component';

describe('SubhalaxmiAttendanceComponent', () => {
  let component: SubhalaxmiAttendanceComponent;
  let fixture: ComponentFixture<SubhalaxmiAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubhalaxmiAttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubhalaxmiAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member5AttendanceComponent } from './attendance.component';

describe('Member5AttendanceComponent', () => {
  let component: Member5AttendanceComponent;
  let fixture: ComponentFixture<Member5AttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member5AttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member5AttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

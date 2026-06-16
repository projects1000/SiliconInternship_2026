import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member8AttendanceComponent } from './member8-attendance.component';

describe('Member8AttendanceComponent', () => {
  let component: Member8AttendanceComponent;
  let fixture: ComponentFixture<Member8AttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member8AttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member8AttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

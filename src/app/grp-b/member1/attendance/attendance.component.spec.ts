import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member1AttendanceComponent } from './attendance.component';

describe('Member1AttendanceComponent', () => {
  let component: Member1AttendanceComponent;
  let fixture: ComponentFixture<Member1AttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member1AttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member1AttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

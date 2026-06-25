import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Memb6AttendanceComponent } from './memb6-attendance.component';

describe('Memb6AttendanceComponent', () => {
  let component: Memb6AttendanceComponent;
  let fixture: ComponentFixture<Memb6AttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Memb6AttendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Memb6AttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

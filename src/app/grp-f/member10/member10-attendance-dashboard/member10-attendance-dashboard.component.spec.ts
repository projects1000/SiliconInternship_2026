import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member10AttendanceDashboardComponent } from './member10-attendance-dashboard.component';

describe('Member10AttendanceDashboardComponent', () => {
  let component: Member10AttendanceDashboardComponent;
  let fixture: ComponentFixture<Member10AttendanceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member10AttendanceDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member10AttendanceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

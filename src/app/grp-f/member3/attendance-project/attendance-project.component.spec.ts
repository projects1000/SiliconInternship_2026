import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceProjectComponent } from './attendance-project.component';

describe('AttendanceProjectComponent', () => {
  let component: AttendanceProjectComponent;
  let fixture: ComponentFixture<AttendanceProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

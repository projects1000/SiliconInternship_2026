import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceMatrixComponent } from './attendance-matrix.component';

describe('AttendanceMatrixComponent', () => {
  let component: AttendanceMatrixComponent;
  let fixture: ComponentFixture<AttendanceMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceMatrixComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

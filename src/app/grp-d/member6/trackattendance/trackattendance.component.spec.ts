import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackattendanceComponent } from './trackattendance.component';

describe('TrackattendanceComponent', () => {
  let component: TrackattendanceComponent;
  let fixture: ComponentFixture<TrackattendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackattendanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

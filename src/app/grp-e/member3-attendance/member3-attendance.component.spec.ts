import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { Member3AttendanceComponent } from './member3-attendance.component';

describe('Member3AttendanceComponent', () => {
  let component: Member3AttendanceComponent;
  let fixture: ComponentFixture<Member3AttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Member3AttendanceComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member3AttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

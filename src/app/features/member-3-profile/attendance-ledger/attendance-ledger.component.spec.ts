import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceLedgerComponent } from './attendance-ledger.component';

describe('AttendanceLedgerComponent', () => {
  let component: AttendanceLedgerComponent;
  let fixture: ComponentFixture<AttendanceLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceLedgerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendanceLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

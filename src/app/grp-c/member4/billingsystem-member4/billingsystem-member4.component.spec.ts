import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingsystemMember4Component } from './billingsystem-member4.component';

describe('BillingsystemMember4Component', () => {
  let component: BillingsystemMember4Component;
  let fixture: ComponentFixture<BillingsystemMember4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingsystemMember4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingsystemMember4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

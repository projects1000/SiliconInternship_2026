import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingParentComponent } from './billing-parent.component';

describe('BillingParentComponent', () => {
  let component: BillingParentComponent;
  let fixture: ComponentFixture<BillingParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

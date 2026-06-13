import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingSystemComponent } from './billing-system.component';

describe('BillingSystemComponent', () => {
  let component: BillingSystemComponent;
  let fixture: ComponentFixture<BillingSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingSystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryBillingComponent } from './grocery-billing.component';

describe('GroceryBillingComponent', () => {
  let component: GroceryBillingComponent;
  let fixture: ComponentFixture<GroceryBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceryBillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroceryBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

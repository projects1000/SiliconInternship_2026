import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M6ShopCustomerCaptureComponent } from './m6-shop-customer-capture.component';

describe('M6ShopCustomerCaptureComponent', () => {
  let component: M6ShopCustomerCaptureComponent;
  let fixture: ComponentFixture<M6ShopCustomerCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ M6ShopCustomerCaptureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(M6ShopCustomerCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductList1Component } from './product-list1.component';

describe('ProductList1Component', () => {
  let component: ProductList1Component;
  let fixture: ComponentFixture<ProductList1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductList1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductList1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

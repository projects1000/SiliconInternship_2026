import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M6ShopBillDeskComponent } from './m6-shop-bill-desk.component';

describe('M6ShopBillDeskComponent', () => {
  let component: M6ShopBillDeskComponent;
  let fixture: ComponentFixture<M6ShopBillDeskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ M6ShopBillDeskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(M6ShopBillDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

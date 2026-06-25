/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M6ShopProductFeedComponent } from './m6-shop-product-feed.component';

describe('M6ShopProductFeedComponent', () => {
  let component: M6ShopProductFeedComponent;
  let fixture: ComponentFixture<M6ShopProductFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ M6ShopProductFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(M6ShopProductFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

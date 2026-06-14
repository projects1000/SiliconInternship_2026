import { ComponentFixture, TestBed } from '@angular/core/testing';

import { M6ShopShellComponent } from './m6-shop-shell.component';

describe('M6ShopShellComponent', () => {
  let component: M6ShopShellComponent;
  let fixture: ComponentFixture<M6ShopShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ M6ShopShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(M6ShopShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

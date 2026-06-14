import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpCmember4productsComponent } from './grp-cmember4products.component';

describe('GrpCmember4productsComponent', () => {
  let component: GrpCmember4productsComponent;
  let fixture: ComponentFixture<GrpCmember4productsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrpCmember4productsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrpCmember4productsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

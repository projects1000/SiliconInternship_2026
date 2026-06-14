import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Billingmanagement0001Component } from './billingmanagement0001.component';

describe('Billingmanagement0001Component', () => {
  let component: Billingmanagement0001Component;
  let fixture: ComponentFixture<Billingmanagement0001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Billingmanagement0001Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Billingmanagement0001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

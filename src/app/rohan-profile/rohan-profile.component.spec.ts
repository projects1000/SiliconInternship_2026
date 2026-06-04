import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RohanProfileComponent } from './rohan-profile.component';

describe('RohanProfileComponent', () => {
  let component: RohanProfileComponent;
  let fixture: ComponentFixture<RohanProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RohanProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RohanProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

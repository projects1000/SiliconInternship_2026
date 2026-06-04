import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwayamProfileComponent } from './swayam-profile.component';

describe('SwayamProfileComponent', () => {
  let component: SwayamProfileComponent;
  let fixture: ComponentFixture<SwayamProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwayamProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwayamProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

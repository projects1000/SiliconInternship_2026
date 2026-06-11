import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeloniComponent } from './meloni.component';

describe('MeloniComponent', () => {
  let component: MeloniComponent;
  let fixture: ComponentFixture<MeloniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeloniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeloniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpEComponent } from './grp-e.component';

describe('GrpEComponent', () => {
  let component: GrpEComponent;
  let fixture: ComponentFixture<GrpEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrpEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrpEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

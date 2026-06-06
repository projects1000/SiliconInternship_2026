import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpFComponent } from './grp-f.component';

describe('GrpFComponent', () => {
  let component: GrpFComponent;
  let fixture: ComponentFixture<GrpFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrpFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrpFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

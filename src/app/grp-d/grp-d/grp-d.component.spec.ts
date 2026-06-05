import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpDComponent } from './grp-d.component';

describe('GrpDComponent', () => {
  let component: GrpDComponent;
  let fixture: ComponentFixture<GrpDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrpDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrpDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

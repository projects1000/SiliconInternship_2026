import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpGComponent } from './grp-g.component';

describe('GrpGComponent', () => {
  let component: GrpGComponent;
  let fixture: ComponentFixture<GrpGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrpGComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrpGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

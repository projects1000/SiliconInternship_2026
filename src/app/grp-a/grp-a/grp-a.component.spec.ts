import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpAComponent } from './grp-a.component';

describe('GrpAComponent', () => {
  let component: GrpAComponent;
  let fixture: ComponentFixture<GrpAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrpAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrpAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

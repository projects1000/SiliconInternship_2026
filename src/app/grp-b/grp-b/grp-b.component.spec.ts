import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpBComponent } from './grp-b.component';

describe('GrpBComponent', () => {
  let component: GrpBComponent;
  let fixture: ComponentFixture<GrpBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrpBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrpBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

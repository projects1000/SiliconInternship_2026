import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpCComponent } from './grp-c.component';

describe('GrpCComponent', () => {
  let component: GrpCComponent;
  let fixture: ComponentFixture<GrpCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrpCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrpCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

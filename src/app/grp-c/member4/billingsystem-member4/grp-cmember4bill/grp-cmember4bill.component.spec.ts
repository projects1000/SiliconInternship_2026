import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpCmember4billComponent } from './grp-cmember4bill.component';

describe('GrpCmember4billComponent', () => {
  let component: GrpCmember4billComponent;
  let fixture: ComponentFixture<GrpCmember4billComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrpCmember4billComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrpCmember4billComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

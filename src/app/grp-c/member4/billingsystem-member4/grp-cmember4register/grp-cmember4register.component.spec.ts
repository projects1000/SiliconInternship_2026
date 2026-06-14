import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpCmember4registerComponent } from './grp-cmember4register.component';

describe('GrpCmember4registerComponent', () => {
  let component: GrpCmember4registerComponent;
  let fixture: ComponentFixture<GrpCmember4registerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrpCmember4registerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrpCmember4registerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

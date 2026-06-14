import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpCmember4settingsComponent } from './grp-cmember4settings.component';

describe('GrpCmember4settingsComponent', () => {
  let component: GrpCmember4settingsComponent;
  let fixture: ComponentFixture<GrpCmember4settingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrpCmember4settingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrpCmember4settingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

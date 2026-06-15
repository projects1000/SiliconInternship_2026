import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrpCmember4notificationComponent } from './grp-cmember4notification.component';

describe('GrpCmember4notificationComponent', () => {
  let component: GrpCmember4notificationComponent;
  let fixture: ComponentFixture<GrpCmember4notificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrpCmember4notificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrpCmember4notificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

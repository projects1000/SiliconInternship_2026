import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberTreeComponent } from './member-tree.component';

describe('MemberTreeComponent', () => {
  let component: MemberTreeComponent;
  let fixture: ComponentFixture<MemberTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

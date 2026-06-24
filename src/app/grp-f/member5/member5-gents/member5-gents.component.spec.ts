import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member5GentsComponent } from './member5-gents.component';

describe('Member5GentsComponent', () => {
  let component: Member5GentsComponent;
  let fixture: ComponentFixture<Member5GentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member5GentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member5GentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

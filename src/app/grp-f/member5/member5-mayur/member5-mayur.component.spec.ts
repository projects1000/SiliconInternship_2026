import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member5MayurComponent } from './member5-mayur.component';

describe('Member5MayurComponent', () => {
  let component: Member5MayurComponent;
  let fixture: ComponentFixture<Member5MayurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member5MayurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member5MayurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

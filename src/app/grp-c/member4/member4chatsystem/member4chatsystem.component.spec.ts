import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member4chatsystemComponent } from './member4chatsystem.component';

describe('Member4chatsystemComponent', () => {
  let component: Member4chatsystemComponent;
  let fixture: ComponentFixture<Member4chatsystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member4chatsystemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member4chatsystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

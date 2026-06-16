import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member6ChatComponent } from './member6-chat.component';

describe('Member6ChatComponent', () => {
  let component: Member6ChatComponent;
  let fixture: ComponentFixture<Member6ChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member6ChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member6ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

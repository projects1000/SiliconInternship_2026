import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member5ChatWindowComponent } from './member5-chat-window.component';

describe('Member5ChatWindowComponent', () => {
  let component: Member5ChatWindowComponent;
  let fixture: ComponentFixture<Member5ChatWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member5ChatWindowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member5ChatWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

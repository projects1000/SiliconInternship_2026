import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Member5Component } from './member5.component';

describe('Member5Component', () => {
  let component: Member5Component;
  let fixture: ComponentFixture<Member5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Member5Component],
      imports: [RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

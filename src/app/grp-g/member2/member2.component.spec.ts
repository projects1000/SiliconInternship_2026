import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Member2Component } from './member2.component';

describe('Member2Component', () => {
  let component: Member2Component;
  let fixture: ComponentFixture<Member2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Member2Component],
      imports: [RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

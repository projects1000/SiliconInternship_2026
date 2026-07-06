import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Member11Component } from './member11.component';

describe('Member11Component', () => {
  let component: Member11Component;
  let fixture: ComponentFixture<Member11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Member11Component],
      imports: [RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

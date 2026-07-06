import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Member1Component } from './member1.component';

describe('Member1Component', () => {
  let component: Member1Component;
  let fixture: ComponentFixture<Member1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Member1Component],
      imports: [RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

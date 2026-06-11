import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member4attmngComponent } from './member4attmng.component';

describe('Member4attmngComponent', () => {
  let component: Member4attmngComponent;
  let fixture: ComponentFixture<Member4attmngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member4attmngComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member4attmngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

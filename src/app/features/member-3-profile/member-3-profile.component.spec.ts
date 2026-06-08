import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member3ProfileComponent } from './member-3-profile.component';

describe('Member3ProfileComponent', () => {
  let component: Member3ProfileComponent;
  let fixture: ComponentFixture<Member3ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Member3ProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Member3ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

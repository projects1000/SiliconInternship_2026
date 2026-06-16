import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Member10ChatappComponent } from './member10-chatapp.component';

describe('Member10ChatappComponent', () => {
  let component: Member10ChatappComponent;
  let fixture: ComponentFixture<Member10ChatappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Member10ChatappComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Member10ChatappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

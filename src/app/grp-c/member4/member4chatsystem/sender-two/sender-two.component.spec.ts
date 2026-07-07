import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderTwoComponent } from './sender-two.component';

describe('SenderTwoComponent', () => {
  let component: SenderTwoComponent;
  let fixture: ComponentFixture<SenderTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenderTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenderTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

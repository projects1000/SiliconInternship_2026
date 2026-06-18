import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenderOneComponent } from './sender-one.component';

describe('SenderOneComponent', () => {
  let component: SenderOneComponent;
  let fixture: ComponentFixture<SenderOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SenderOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SenderOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

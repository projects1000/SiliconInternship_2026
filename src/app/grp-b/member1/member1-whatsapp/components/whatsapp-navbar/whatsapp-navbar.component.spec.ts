import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappNavbarComponent } from './whatsapp-navbar.component';

describe('WhatsappNavbarComponent', () => {
  let component: WhatsappNavbarComponent;
  let fixture: ComponentFixture<WhatsappNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

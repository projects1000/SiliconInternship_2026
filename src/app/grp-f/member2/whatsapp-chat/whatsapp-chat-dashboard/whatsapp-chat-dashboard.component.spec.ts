import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappChatDashboardComponent } from './whatsapp-chat-dashboard.component';

describe('WhatsappChatDashboardComponent', () => {
  let component: WhatsappChatDashboardComponent;
  let fixture: ComponentFixture<WhatsappChatDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappChatDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappChatDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

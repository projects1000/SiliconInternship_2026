import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappDashboardComponent } from './whatsapp-dashboard.component';

describe('WhatsappDashboardComponent', () => {
  let component: WhatsappDashboardComponent;
  let fixture: ComponentFixture<WhatsappDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsappDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsappDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

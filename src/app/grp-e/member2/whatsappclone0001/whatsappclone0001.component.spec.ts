import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Whatsappclone0001Component } from './whatsappclone0001.component';

describe('Whatsappclone0001Component', () => {
  let component: Whatsappclone0001Component;
  let fixture: ComponentFixture<Whatsappclone0001Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Whatsappclone0001Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Whatsappclone0001Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

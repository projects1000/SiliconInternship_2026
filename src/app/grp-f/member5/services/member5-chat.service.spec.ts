import { TestBed } from '@angular/core/testing';

import { Member5ChatService } from './member5-chat.service';

describe('Member5ChatService', () => {
  let service: Member5ChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Member5ChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

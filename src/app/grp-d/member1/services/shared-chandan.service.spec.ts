import { TestBed } from '@angular/core/testing';

import { SharedChandanService } from './shared-chandan.service';

describe('SharedChandanService', () => {
  let service: SharedChandanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedChandanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

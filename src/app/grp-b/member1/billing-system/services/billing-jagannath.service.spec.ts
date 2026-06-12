import { TestBed } from '@angular/core/testing';

import { BillingJagannathService } from './billing-jagannath.service';

describe('BillingJagannathService', () => {
  let service: BillingJagannathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingJagannathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

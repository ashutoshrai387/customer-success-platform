import { TestBed } from '@angular/core/testing';

import { CustomerSuccessService } from './customer-success.service';

describe('CustomerSuccessService', () => {
  let service: CustomerSuccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerSuccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

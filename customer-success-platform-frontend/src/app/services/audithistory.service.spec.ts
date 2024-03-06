import { TestBed } from '@angular/core/testing';

import { AudithistoryService } from './audithistory.service';

describe('AudithistoryService', () => {
  let service: AudithistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudithistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

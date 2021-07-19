import { TestBed } from '@angular/core/testing';

import { HardcodedAuthServiceService } from './hardcoded-auth-service.service';

describe('HardcodedAuthServiceService', () => {
  let service: HardcodedAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardcodedAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { HttpIntercepterBearerAuthService } from './http-intercepter-bearer-auth.service';

describe('HttpIntercepterBearerAuthService', () => {
  let service: HttpIntercepterBearerAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpIntercepterBearerAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

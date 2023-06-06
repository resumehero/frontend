import { TestBed } from '@angular/core/testing';

import { CertificationApiService } from './certification-api.service';

describe('CertificationApiService', () => {
  let service: CertificationApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificationApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

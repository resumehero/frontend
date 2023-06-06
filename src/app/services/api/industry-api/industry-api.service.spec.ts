import { TestBed } from '@angular/core/testing';

import { IndustryApiService } from './industry-api.service';

describe('IndustryApiService', () => {
  let service: IndustryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndustryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

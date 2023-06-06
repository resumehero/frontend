import { TestBed } from '@angular/core/testing';

import { AccomplishmentApiService } from './accomplishment-api.service';

describe('AccomplishmentApiService', () => {
  let service: AccomplishmentApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccomplishmentApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

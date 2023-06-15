import { TestBed } from '@angular/core/testing';

import { AbstractCacheService } from './abstract-cache.service';

describe('CacheService', () => {
  let service: AbstractCacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractCacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

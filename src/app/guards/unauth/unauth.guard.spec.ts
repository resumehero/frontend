import { TestBed, inject } from '@angular/core/testing';

import { UnauthGuard } from './unauth.guard';

describe('UnauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnauthGuard]
    });
  });

  it('should ...', inject([UnauthGuard], (guard: UnauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});

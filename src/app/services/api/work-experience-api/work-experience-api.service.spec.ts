import { TestBed } from '@angular/core/testing';

import { WorkExperienceApiService } from './work-experience-api.service';

describe('WorkExperienceApiService', () => {
  let service: WorkExperienceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkExperienceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

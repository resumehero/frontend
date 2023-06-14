import { TestBed } from '@angular/core/testing';

import { ResumeTemplateApiService } from './resume-template-api.service';

describe('ResumeTemplateApiService', () => {
  let service: ResumeTemplateApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumeTemplateApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

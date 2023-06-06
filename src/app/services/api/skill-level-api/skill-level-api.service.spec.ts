import { TestBed } from '@angular/core/testing';

import { SkillLevelApiService } from './skill-level-api.service';

describe('SkillLevelApiService', () => {
  let service: SkillLevelApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillLevelApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

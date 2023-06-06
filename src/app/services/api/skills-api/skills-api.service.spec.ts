import { TestBed } from '@angular/core/testing';

import { SkillsApiService } from './skills-api.service';

describe('SkillsApiService', () => {
  let service: SkillsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { Injectable } from '@angular/core';
import { AbstractApiService } from '@misc/abstracts/services/abstract-api.service';
import { ClassConstructor } from 'class-transformer';
import { SkillLevel } from '@models/classes/skill-level.model';

@Injectable({
  providedIn: 'root'
})
export class SkillLevelApiService extends AbstractApiService<SkillLevel> {
  protected readonly _URL_PATH: string = '/user_profile/skill_levels';
  protected readonly _MODEL: ClassConstructor<SkillLevel> = SkillLevel;
}

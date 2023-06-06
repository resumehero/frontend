import { Injectable } from '@angular/core';
import { AbstractApiService } from '@misc/abstracts/services/abstract-api.service';
import { ClassConstructor } from 'class-transformer';
import { Skill } from '@models/classes/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsApiService extends AbstractApiService<Skill> {
  protected readonly _URL_PATH: string = '/user_profile/skills';
  protected readonly _MODEL: ClassConstructor<Skill> = Skill;
}

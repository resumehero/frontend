import { Exclude, Expose } from 'class-transformer';
import { AbstractModel } from '@models/classes/_base.model';

export enum SkillLevel {
  Novice = 'novice',
  Beginner = 'beginner',
  Competent = 'competent',
  Proficient = 'proficient',
  Expert = 'expert'
}

@Exclude()
export class Skill extends AbstractModel {
  @Expose()
  name: string;
  @Expose()
  level: SkillLevel;
}

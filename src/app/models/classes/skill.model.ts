import { Exclude, Expose, Transform } from 'class-transformer';
import { AbstractModel } from '@models/classes/_base.model';
import { SkillLevel } from '@models/classes/skill-level.model';
import { transformToModel } from '@misc/helpers/model-conversion/transform-helpers/transform-to-model.function';

@Exclude()
export class Skill extends AbstractModel {
  @Expose()
  name: string;
  @Expose()
  @Transform(transformToModel(SkillLevel))
  level: SkillLevel;
}

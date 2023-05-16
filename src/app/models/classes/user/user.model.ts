import { Exclude, Expose, Transform } from 'class-transformer';
import { UserBase } from '@models/classes/user/_user-base.model';
import { Industry } from '@models/classes/industry.model';
import { transformToModel } from '@misc/helpers/model-conversion/transform-helpers/transform-to-model.function';
import { WorkExperience } from '@models/classes/work-experience.model';
import { transformToModelsArray } from '@misc/helpers/model-conversion/transform-helpers/transform-to-models-array.function';
import { Accomplishment } from '@models/classes/accomplishment.model';
import { Education } from '@models/classes/education.model';
import { Certification } from '@models/classes/certification.model';
import { Skill } from '@models/classes/skill.model';

@Exclude()
export class User extends UserBase {
  @Expose()
  @Transform(transformToModel(Industry))
  industry: Industry;

  @Expose()
  @Transform(transformToModelsArray(WorkExperience))
  workExperience: WorkExperience[];

  @Expose()
  @Transform(transformToModelsArray(Accomplishment))
  accomplishments: Accomplishment[];

  @Expose()
  @Transform(transformToModelsArray(Education))
  education: Education[];

  @Expose()
  @Transform(transformToModelsArray(Certification))
  certifications: Certification[];

  @Expose()
  @Transform(transformToModelsArray(Skill))
  skills: Skill[];
}

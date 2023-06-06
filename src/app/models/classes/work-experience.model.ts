import { Exclude, Expose, Transform } from 'class-transformer';
import { AbstractModel } from '@models/classes/_base.model';
import { transformToDateString } from '@misc/helpers/model-conversion/transform-helpers/transform-to-date.function';

@Exclude()
export class WorkExperience extends AbstractModel {
  @Expose()
  job_title: string;
  @Expose()
  employer: string;
  @Expose()
  @Transform(transformToDateString('YYYY-MM-dd'))
  start_date: string;
  @Expose()
  @Transform(transformToDateString('YYYY-MM-dd'))
  end_date: string;
  @Expose()
  description: string;
}

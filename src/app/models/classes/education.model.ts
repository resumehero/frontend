import { Exclude, Expose, Transform } from 'class-transformer';
import { AbstractModel } from '@models/classes/_base.model';
import { transformToDateString } from '@misc/helpers/model-conversion/transform-helpers/transform-to-date.function';

@Exclude()
export class Education extends AbstractModel {
  @Expose()
  degree: string;
  @Expose()
  institution_name: string;
  @Expose()
  @Transform(transformToDateString('YYYY-MM-dd'))
  start_date: string;
  @Expose()
  @Transform(transformToDateString('YYYY-MM-dd'))
  end_date: string;
  @Expose()
  description: string;
}

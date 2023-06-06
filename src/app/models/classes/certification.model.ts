import { Exclude, Expose, Transform } from 'class-transformer';
import { AbstractModel } from '@models/classes/_base.model';
import { transformToDateString } from '@misc/helpers/model-conversion/transform-helpers/transform-to-date.function';

@Exclude()
export class Certification extends AbstractModel {
  @Expose()
  name: string;
  @Expose()
  @Transform(transformToDateString('YYYY-MM-dd'))
  date: string;
}

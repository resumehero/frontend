import { Exclude, Expose } from 'class-transformer';
import { AbstractModel } from '@models/classes/_base.model';

@Exclude()
export class Certification extends AbstractModel {
  @Expose()
  certification: string;
  @Expose()
  date: string;
}

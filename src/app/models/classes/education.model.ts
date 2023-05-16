import { Exclude, Expose } from 'class-transformer';
import { AbstractModel } from '@models/classes/_base.model';

@Exclude()
export class Education extends AbstractModel {
  @Expose()
  degree: string;
  @Expose()
  school: string;
  @Expose()
  startDate: string;
  @Expose()
  endDate: string;
  @Expose()
  description: string;
}

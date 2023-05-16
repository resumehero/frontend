import { Exclude, Expose } from 'class-transformer';
import { AbstractModel } from '@models/classes/_base.model';

@Exclude()
export class WorkExperience extends AbstractModel {
  @Expose()
  jobTitle: string;
  @Expose()
  employer: string;
  @Expose()
  startDate: string;
  @Expose()
  endDate: string;
  @Expose()
  description: string;
}

import { Exclude, Expose } from 'class-transformer';
import { AbstractModel } from '@models/classes/_base.model';

@Exclude()
export class Accomplishment extends AbstractModel {
  @Expose()
  accomplishments: string;
}

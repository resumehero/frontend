import { Exclude, Expose } from 'class-transformer';
import { AbstractModel } from '@models/classes/_base.model';

@Exclude()
export class Industry extends AbstractModel {
  @Expose()
  name: string;
}

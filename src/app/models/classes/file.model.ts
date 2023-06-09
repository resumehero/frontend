import { Exclude, Expose } from 'class-transformer';
import { AbstractModel } from '@models/classes/_base.model';

@Exclude()
export class ApiFile extends AbstractModel {
  @Expose() name?: string;
  @Expose() size?: number;
  @Expose() photo: string;
}

import { Exclude, Expose } from 'class-transformer';
import { AbstractModel } from '@models/classes/_base.model';

@Exclude()
export class Photo extends AbstractModel {
  @Expose() full_size?: string;
  @Expose() medium_square_crop?: number;
  @Expose() small_square_crop: string;
  @Expose() thumbnail?: string;
  @Expose() photo?: string;
}

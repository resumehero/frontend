import { Exclude, Expose, Transform } from 'class-transformer';
import { transformToDate } from '@misc/helpers/model-conversion/transform-helpers/transform-to-date.function';

@Exclude()
export abstract class AbstractModel {
  @Expose()
  id: string;
  @Expose()
  @Transform(transformToDate)
  createdAt: string;
  @Expose()
  @Transform(transformToDate)
  updatedAt?: string;

  [Symbol.toPrimitive]?(hint: 'number' | 'string' | 'default'): string | number | void {
    switch (hint) {
      case 'default':
      case 'string':
        return this.id;
      case 'number':
      default:
        return;
    }
  }
}

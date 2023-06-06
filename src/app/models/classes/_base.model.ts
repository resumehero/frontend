import { Exclude, Expose } from 'class-transformer';

@Exclude()
export abstract class AbstractModel {
  @Expose()
  id: string;

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

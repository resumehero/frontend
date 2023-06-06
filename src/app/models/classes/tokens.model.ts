import { Exclude, Expose, Transform, TransformFnParams } from 'class-transformer';

@Exclude()
export class Token {
  @Expose()
  access: string;
  @Expose()
  refresh: string;
  @Expose({ name: 'expires_in' })
  @Transform(({ value }: TransformFnParams): number => Date.now() + value * 1000)
  expirationTimestamp: number;
  @Expose()
  @Transform(({ value }: TransformFnParams): boolean => Boolean(value))
  isRevoked: boolean;
}

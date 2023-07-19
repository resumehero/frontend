import { Exclude, Expose, Transform, TransformFnParams } from 'class-transformer';
import { UserRole } from '@models/enums/user-role.enum';
import { AbstractModel } from '@models/classes/_base.model';
import { Photo } from '@models/classes/photo.model';

@Exclude()
export class UserBase extends AbstractModel {
  @Expose()
  @Transform(({ value }: TransformFnParams): string => value ?? UserRole.client)
  role: UserRole;
  @Expose()
  email: string;
  @Expose()
  first_name: string;
  @Expose()
  last_name: string;
  @Expose()
  phone_number: string;
  @Expose()
  about: string;
  @Expose()
  city: string;
  @Expose()
  photo?: Photo;
  @Expose({ name: 'emailVerified' })
  isEmailVerified: boolean;
  @Expose()
  @Transform(({ value, obj }: TransformFnParams): string => value ?? `${obj.firstName ?? ''} ${obj.lastName ?? ''}`.trim())
  fullName: string;
}

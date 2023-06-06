import { TransformFnParams } from 'class-transformer';
import { dateFormatter } from '@misc/helpers/date-formatter.function';

export function transformToDate({ value }: TransformFnParams): Date | null {
  return value ? new Date(value) : null;
}

export function transformToDateString(format: string) {
  return ({ value }: TransformFnParams): string => {
    return dateFormatter(value, format);
  };
}

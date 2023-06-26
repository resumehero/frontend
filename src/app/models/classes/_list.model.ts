import { ClassConstructor } from 'class-transformer';
import { convertToModelsArray } from '@misc/helpers/model-conversion/convert-to-models-array.function';

export interface IListEntry<T = any> {
  results?: T[];
  total_items?: number;
  entities?: T[];
  total?: number;
}

export class List<T = any> {
  entities: T[];
  total: number;

  constructor(listEntry: IListEntry<T>, entityClass: ClassConstructor<T>) {
    let items: T[];
    let count: number;

    switch (true) {
      case Array.isArray(listEntry):
        items = listEntry as T[];
        count = (listEntry as T[])?.length;
        break;
      case Boolean(listEntry?.results) && Boolean(listEntry?.total_items):
        items = listEntry.results as T[];
        count = listEntry.total_items as number;
        break;
      default:
        items = [];
        count = 0;
    }

    this.entities = convertToModelsArray(items, entityClass);
    this.total = count;
  }
}

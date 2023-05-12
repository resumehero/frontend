import { TemplateRef } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { ThemePalette } from '@angular/material/core';

export interface IAction<T = string> {
  name: string;
  value: T;
  icon?: string;
  color?: ThemePalette;
  disabled?: boolean;
}

export interface IDataTableColumn {
  columnName: string;
  title?: string;
  template?: TemplateRef<any>;
  headerTemplate?: TemplateRef<any>;
  sort?: {
    name?: string;
    defaultDirection?: SortDirection;
  };
}

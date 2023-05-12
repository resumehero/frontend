import { ChangeDetectorRef, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PaginatePipeArgs } from 'ngx-pagination';
import { getRandomIdentifier } from '@misc/helpers/get-random-identifier.function';
import { PER_PAGE_DEFAULT } from '@misc/constants/_base.constant';
import { List } from '@models/classes/_list.model';
import { IPaginatePipeArgs } from '@models/interfaces/paginate-pipe-args.interface';

@Component({
  template: ''
})
export abstract class AbstractPaginationComponent implements OnChanges {
  @Input() isLoading: boolean;
  @Input() list: List;
  @Input() itemsPerPage: number = PER_PAGE_DEFAULT;
  currentPage: number = 1;
  entities: any[] = [];
  totalItems: number = 0;
  private readonly _PAGINATOR_ID: string = getRandomIdentifier();
  protected _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  get paginatePipeArgs(): PaginatePipeArgs & IPaginatePipeArgs {
    return {
      id: this._PAGINATOR_ID,
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    };
  }

  set paginatePipeArgs({ currentPage, totalItems }: PaginatePipeArgs) {
    this.currentPage = Number(currentPage);
    this.totalItems = Number(totalItems);
    this._cdr.detectChanges();
  }

  ngOnChanges({ list, itemsPerPage }: SimpleChanges): void {
    if (list?.currentValue) {
      if (list?.previousValue && list.currentValue?.total !== this.totalItems) {
        this.currentPage = 1;
      }

      this.totalItems = list?.currentValue?.total ?? 0;
      this.entities = list?.currentValue?.entities ?? [];
    }

    if (itemsPerPage?.currentValue) {
      this.currentPage = 1;
      this.itemsPerPage = Number(itemsPerPage?.currentValue);
    }
  }
}

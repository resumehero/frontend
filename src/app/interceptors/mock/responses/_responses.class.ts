import { HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IListEntry } from '@models/classes/_list.model';
import { getRandomIdentifier } from '@misc/helpers/get-random-identifier.function';
import { Params } from '@angular/router';
import { QueryParamsService } from '@services/query-params/query-params.service';

export abstract class AbstractResponses<T extends { id: string }> {
  readonly ENTITIES: T[] = [];

  get list(): (params: string[], body: HttpParams, headers: HttpHeaders, entities?: T[]) => Observable<HttpResponse<IListEntry<T>>> {
    return this._list.bind(this);
  }

  get oneById(): (params: string[], body: Params, headers: HttpHeaders) => Observable<HttpResponse<T>> {
    return this._oneById.bind(this);
  }

  get create(): (params: string[], body: any, headers: HttpHeaders) => Observable<HttpResponse<T>> {
    return this._create.bind(this);
  }

  get update(): (params: string[], body: T, headers: HttpHeaders) => Observable<HttpResponse<T>> {
    return this._update.bind(this);
  }

  get delete(): (params: string[], body: void, headers: HttpHeaders) => Observable<HttpResponse<void>> {
    return this._delete.bind(this);
  }

  init(initialCount: number = 20): void {
    for (let i: number = 0; i < initialCount; i++) {
      this.ENTITIES.push(this._entitiesFn.call(this, i));
    }
  }

  protected _list(params: string[], body: HttpParams, headers: HttpHeaders, entities?: T[]): Observable<HttpResponse<IListEntry<T>>> {
    let resEntities: T[] = entities ?? this.ENTITIES;
    const total = resEntities?.length;

    if (body.has(QueryParamsService.BASE_KEYS.PAGE)) {
      const page: number = Number(body.get(QueryParamsService.BASE_KEYS.PAGE));
      const perPage: number = Number(body.get(QueryParamsService.BASE_KEYS.PER_PAGE)) || 20;
      resEntities = resEntities.slice((page - 1) * perPage, page * perPage);
    }

    return of(
      new HttpResponse({
        status: 200,
        body: { 'hydra:member': resEntities, 'hydra:totalItems': total }
      })
    );
  }

  protected _oneById([id]: string[], body: Params, headers: HttpHeaders): Observable<HttpResponse<T>> {
    const entity: T | undefined = this.ENTITIES.find((entity: T): boolean => entity.id === id);

    if (entity) {
      return of(
        new HttpResponse({
          status: 200,
          body: entity
        })
      );
    } else {
      throw new HttpErrorResponse({ status: 404, error: { message: 'Not Found' } });
    }
  }

  protected _create(routeParams: string[], body: T): Observable<HttpResponse<T>> {
    body.id = getRandomIdentifier();
    this.ENTITIES.push(body);

    return of(
      new HttpResponse({
        status: 200,
        body
      })
    );
  }

  protected _update([id]: string[], body: T): Observable<HttpResponse<T>> {
    const entityIndex: number = this.ENTITIES.findIndex((entity: T): boolean => entity?.id === id);

    this.ENTITIES.splice(entityIndex, 1, { ...this.ENTITIES[entityIndex], ...body });

    return of(
      new HttpResponse({
        status: 200,
        body: this.ENTITIES[entityIndex]
      })
    );
  }

  protected _delete([id]: string[]): Observable<HttpResponse<void>> {
    const entityIndex: number = this.ENTITIES.findIndex((user: T): boolean => user?.id === id);
    if (entityIndex > -1) {
      this.ENTITIES.splice(entityIndex, 1);
    }

    return of(
      new HttpResponse({
        status: 200,
        body: null
      })
    );
  }

  protected abstract _entitiesFn(index: number): T;
}

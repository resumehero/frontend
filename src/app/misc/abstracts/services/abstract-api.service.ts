import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { HttpService, IServicesConfig } from '@services/http/http.service';
import { ClassConstructor } from 'class-transformer';
import { toModelsList } from '@misc/rxjs-operators/to-models-list.operator';
import { toModel } from '@misc/rxjs-operators/to-model.operator';
import { CustomHTTPParamsEncoder } from '@misc/custom-http-params-encoder';
import { HttpParams } from '@angular/common/http';
import { List } from '@models/classes/_list.model';
import { APP_CONFIG, IAppConfig } from '@misc/constants/app-config.constant';
import { AbstractModel } from '@models/classes/_base.model';

export type transition = 'cancel' | 'reject' | 'accept';

export interface ITransitData {
  transition: transition;
  context?: {
    [key: string]: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractApiService<T extends AbstractModel> {
  protected _config: IAppConfig = inject<IAppConfig>(APP_CONFIG);
  protected _http: HttpService = inject(HttpService);
  protected _URLParams: string[] = [];
  protected abstract readonly _MODEL: ClassConstructor<T>;
  protected abstract readonly _URL_PATH: string;

  get baseUrl(): string {
    return this._config.apiUrl;
  }

  get url(): string {
    return this.baseUrl + this._composeUrlPath();
  }

  getItems(params?: Params, servicesConfig?: IServicesConfig): Observable<List<T>> {
    const httpParams: HttpParams = new HttpParams({ fromObject: params, encoder: new CustomHTTPParamsEncoder() });
    return this._http.get(this.url, { params: httpParams }, servicesConfig).pipe(toModelsList(this._MODEL));
  }

  getItem(id?: string, params?: Params, servicesConfig?: IServicesConfig): Observable<T> {
    return this._http.get(id ? `${this.url}/${id}` : this.url, { params }, servicesConfig).pipe(toModel(this._MODEL));
  }

  createItem(data: Params, params?: Params, servicesConfig?: IServicesConfig): Observable<T> {
    const body: Params = { ...data };
    delete body.id;
    return this._http.post(this.url, body, { params }, servicesConfig).pipe(toModel(this._MODEL));
  }

  updateItem(data: Partial<T>, params?: Params, servicesConfig?: IServicesConfig): Observable<T> {
    const body: Partial<T> = { ...data };
    delete body.id;
    return this._http.patch(`${this.url}/${data.id}`, body, { params }, servicesConfig).pipe(toModel(this._MODEL));
  }

  cascadeUpdateItem(data: Partial<T>, params?: Params, servicesConfig?: IServicesConfig): Observable<T> {
    const body: Partial<T> = { ...data };
    delete body.id;
    return this._http.put(`${this.url}/${data.id}`, body, { params }, servicesConfig).pipe(toModel(this._MODEL));
  }

  deleteItem(id: string, servicesConfig?: IServicesConfig): Observable<void> {
    return this._http.delete(`${this.url}/${id}`, {}, servicesConfig);
  }

  transit(id: string, data: ITransitData, servicesConfig?: IServicesConfig): Observable<T> {
    return this._http.patch(`${this.url}/${id}/transit`, data, {}, servicesConfig);
  }

  getTransition(id?: string, params?: Params, servicesConfig?: IServicesConfig): Observable<string[]> {
    return this._http.get(`${this.url}/${id}/transit`, { params }, servicesConfig);
  }

  private _composeUrlPath(): string {
    let URLPath: string = this._URL_PATH;

    if (this._URLParams?.length) {
      const params: string[] | null = URLPath.match(/:[a-z]+(?=\/)?/gi);
      params?.forEach((param: string, i: number): void => {
        URLPath = URLPath.replace(param, this._URLParams[i]);
      });
    }

    return URLPath;
  }
}

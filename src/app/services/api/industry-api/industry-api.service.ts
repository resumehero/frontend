import { Injectable } from '@angular/core';
import { AbstractApiService } from '@misc/abstracts/services/abstract-api.service';
import { ClassConstructor } from 'class-transformer';
import { Industry } from '@models/classes/industry.model';
import { Params } from '@angular/router';
import { IServicesConfig } from '@services/http/http.service';
import { Observable } from 'rxjs';
import { toModel } from '@misc/rxjs-operators/to-model.operator';

@Injectable({
  providedIn: 'root'
})
export class IndustryApiService extends AbstractApiService<Industry> {
  protected readonly _URL_PATH: string = '/user_profile/industries';
  protected readonly _MODEL: ClassConstructor<Industry> = Industry;

  override createItem(data: Params, params?: Params, servicesConfig?: IServicesConfig): Observable<Industry> {
    return this._http.post('/user_profile/industry', data, { params }, servicesConfig).pipe(toModel(this._MODEL));
  }
}

import { Injectable } from '@angular/core';
import { AbstractApiService } from '@misc/abstracts/services/abstract-api.service';
import { ClassConstructor } from 'class-transformer';
import { ApiFile } from '@models/classes/file.model';
import { Params } from '@angular/router';
import { IServicesConfig } from '@services/http/http.service';
import { Observable } from 'rxjs';
import { toModel } from '@misc/rxjs-operators/to-model.operator';

@Injectable({
  providedIn: 'root'
})
export class PhotoApiService extends AbstractApiService<ApiFile> {
  protected readonly _URL_PATH: string = '/user_profile/photo';
  protected readonly _MODEL: ClassConstructor<ApiFile> = ApiFile;

  override createItem(data: Params, params?: Params, servicesConfig?: IServicesConfig): Observable<ApiFile> {
    return this._http.post(this.url, data, { params }, servicesConfig).pipe(toModel(this._MODEL));
  }
}

import { Injectable } from '@angular/core';
import { AbstractApiService } from '@misc/abstracts/services/abstract-api.service';
import { User } from '@models/classes/user/user.model';
import { IServicesConfig } from '@services/http/http.service';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { ClassConstructor } from 'class-transformer';
import { UserTokenAction } from '@models/enums/user-token-action.enum';

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends AbstractApiService<User> {
  protected readonly _URL_PATH: string = '/auth/users';
  protected readonly _MODEL: ClassConstructor<User> = User;

  getMe(services?: IServicesConfig): Observable<User> {
    return this.getItem('me', {}, services);
  }

  availableEmail(email: string, services?: IServicesConfig): Observable<any> {
    return this._http.get(`${this.url}/available/email/${email}`, {}, services);
  }

  sendToken(email: string, type: UserTokenAction, payload?: { [key: string]: string }, services?: IServicesConfig): Observable<any> {
    return this._http.post(`${this.url}/send/token`, { email, type, payload }, {}, services);
  }

  updatePassword(token: string, params: Params, services?: IServicesConfig): Observable<any> {
    return this._http.patch(`${this.url}/${token}/password`, { user: params }, {}, services);
  }

  confirmAccount(uid: string, token: string, services?: IServicesConfig): Observable<any> {
    return this._http.post(`${this.url}/activation`, { uid, token }, {}, services);
  }

  setPassword(current_password: string, new_password: string, services?: IServicesConfig): Observable<any> {
    return this._http.post(`${this.url}/set_password`, { current_password, new_password }, {}, services);
  }
}

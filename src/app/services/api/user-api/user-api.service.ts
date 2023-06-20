import { Injectable } from '@angular/core';
import { AbstractApiService } from '@misc/abstracts/services/abstract-api.service';
import { User } from '@models/classes/user/user.model';
import { IServicesConfig } from '@services/http/http.service';
import { Observable } from 'rxjs';
import { ClassConstructor } from 'class-transformer';
import { IPasswordConfirm } from '@modules/auth/forgot-password/set-new-password-form/set-new-password-form.component';

@Injectable({
  providedIn: 'root'
})
export class UserApiService extends AbstractApiService<User> {
  protected readonly _URL_PATH: string = '/auth/users';
  protected readonly _MODEL: ClassConstructor<User> = User;

  getMe(services?: IServicesConfig): Observable<User> {
    return this.getItem('me', {}, services);
  }

  updateMe(body: Partial<User>, services?: IServicesConfig): Observable<User> {
    body.id = 'me';
    return this.updateItem(body, {}, services);
  }

  confirmAccount(uid: string, token: string, services?: IServicesConfig): Observable<any> {
    return this._http.post(`${this.url}/activation`, { uid, token }, {}, services);
  }

  setPassword(current_password: string, new_password: string, services?: IServicesConfig): Observable<void> {
    return this._http.post(`${this.url}/set_password`, { current_password, new_password }, {}, services);
  }

  resetPassword(email: string, services?: IServicesConfig): Observable<void> {
    return this._http.post(`${this.url}/reset_password`, { email }, {}, services);
  }

  resetPasswordConfirm(body: IPasswordConfirm, services?: IServicesConfig): Observable<void> {
    return this._http.post(`${this.url}/reset_password_confirm`, body, {}, services);
  }
}

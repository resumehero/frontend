import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserApiService } from '@services/api/user-api/user-api.service';
import { ACTIVATION_TOKEN_KEY, ACTIVATION_UID_KEY } from '@misc/constants/_base.constant';
import { HttpServiceError } from '@services/http/http-service-error.class';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationTokenResolver implements Resolve<Observable<string> | void> {
  private _userApi: UserApiService = inject(UserApiService);

  resolve({ paramMap }: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | void {
    return this._userApi
      .confirmAccount(paramMap.get(ACTIVATION_UID_KEY), paramMap.get(ACTIVATION_TOKEN_KEY))
      .pipe(catchError(({ descriptions }: HttpServiceError): Observable<string> => of(descriptions[0]?.message)));
  }
}

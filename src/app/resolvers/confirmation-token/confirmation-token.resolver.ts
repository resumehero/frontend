import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, first, switchMap } from 'rxjs/operators';
import { AuthService } from '@services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserApiService } from '@services/api/user-api/user-api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationTokenResolver implements Resolve<Observable<string> | void> {
  private _auth: AuthService = inject(AuthService);
  private _userApi: UserApiService = inject(UserApiService);

  resolve({ queryParamMap }: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> | void {
    return this._auth.getTemporaryToken().pipe(
      first(),
      switchMap(
        (): Observable<string> =>
          this._userApi
            .confirmAccount(queryParamMap.get('token') as string)
            .pipe(catchError(({ error }: HttpErrorResponse): Observable<string> => of(error.message)))
      )
    );
  }
}

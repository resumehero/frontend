import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanMatch, Route, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { UserRole } from '@models/enums/user-role.enum';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

export interface IRoleGuardParams {
  roles: UserRole[];
  redirectTo: string[];
  shouldSkipErrorNotification?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanMatch, CanActivate, CanActivateChild {
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _notification: ToastrService,
    private _translate: TranslateService
  ) {}

  canMatch(route: Route): Promise<boolean> | boolean {
    return this._isRoleAllowed(route?.data?.roleGuardParams ?? {});
  }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> | boolean {
    return this._isRoleAllowed(route?.data?.roleGuardParams ?? {});
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot): Promise<boolean> | boolean {
    return this._isRoleAllowed(childRoute?.data?.roleGuardParams ?? {});
  }

  private _isRoleAllowed({ redirectTo, roles, shouldSkipErrorNotification }: IRoleGuardParams): Promise<boolean> | boolean {
    const isRoleAllowed: boolean = Boolean((roles ?? [])?.find((role: UserRole): boolean => this._auth.myRole === role));

    if (!isRoleAllowed) {
      if (this._auth.myRole && !shouldSkipErrorNotification) {
        this._notification.error(this._translate.instant('BACKEND_ERRORS.ACCESS_DENIED'));
      }
      return redirectTo?.length ? this._router.navigate(redirectTo) : false;
    }

    return isRoleAllowed;
  }
}

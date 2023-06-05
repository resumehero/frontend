import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ACTIVATION_TOKEN_KEY } from '@misc/constants/_base.constant';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationEmailGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const hasToken: boolean = next.paramMap.has(ACTIVATION_TOKEN_KEY);
    if (!hasToken) {
      this._router.navigate(['', 'auth', 'log-in']);
      return false;
    }

    return true;
  }
}

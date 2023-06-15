import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@services/auth/auth.service';
import { ActivatedRoute, Params } from '@angular/router';
import { PASSWORD_CONFIRM_TOKEN_KEY, PASSWORD_CONFIRM_UID_KEY } from '@misc/constants/_base.constant';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  token: string;
  uid: string;

  constructor(private _auth: AuthService, private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params.subscribe((params: Params): void => {
      if (params[PASSWORD_CONFIRM_TOKEN_KEY]) {
        this.token = params[PASSWORD_CONFIRM_TOKEN_KEY];
        this.uid = params[PASSWORD_CONFIRM_UID_KEY];
      }
    });
  }

  ngOnInit(): void {
    this._auth.clearTokens();
  }

  ngOnDestroy(): void {
    this._auth.clearTokens();
  }
}

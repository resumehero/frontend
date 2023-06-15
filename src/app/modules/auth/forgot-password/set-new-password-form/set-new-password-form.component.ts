import { Component, inject, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { VALIDATORS_SET } from '@misc/constants/validators-set.constant';
import { Router } from '@angular/router';
import { CustomValidators } from '@misc/custom-validators';
import { UserApiService } from '@services/api/user-api/user-api.service';
import { AbstractFormComponent } from '@misc/abstracts/components/abstract-form.component';

export interface IPasswordConfirm {
  uid: string;
  token: string;
  new_password: string;
  re_new_password: string;
}

@Component({
  selector: 'set-new-password-form',
  templateUrl: './set-new-password-form.component.html',
  styleUrls: ['./set-new-password-form.component.scss']
})
export class SetNewPasswordFormComponent extends AbstractFormComponent<IPasswordConfirm> implements OnInit {
  @Input() uid: string;
  @Input() token: string;
  private _userApi: UserApiService = inject(UserApiService);
  private _router: Router = inject(Router);

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const body: IPasswordConfirm = this.formGroup.value;

    this._userApi.resetPasswordConfirm(body).subscribe(this.onSubscribeNext.bind(this));
  }

  onSubscribeNext(): void {
    this._router.navigate(['', 'auth', 'log-in']);
  }

  protected override _initForm(): void {
    this.formGroup = this._fb.group(
      {
        uid: [this.uid],
        token: [this.token],
        new_password: ['', [Validators.required, VALIDATORS_SET.PASSWORD]],
        re_new_password: ['', [Validators.required, VALIDATORS_SET.PASSWORD]]
      },
      { validators: [CustomValidators.mustMatch('new_password', 're_new_password')] }
    );
  }
}

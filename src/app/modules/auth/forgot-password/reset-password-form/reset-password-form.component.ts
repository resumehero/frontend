import { Component, inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { VALIDATORS_SET } from '@misc/constants/validators-set.constant';
import { UserApiService } from '@services/api/user-api/user-api.service';
import { Router } from '@angular/router';
import { AbstractFormComponent } from '@misc/abstracts/components/abstract-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent extends AbstractFormComponent implements OnInit {
  private _userApi: UserApiService = inject(UserApiService);
  private _router: Router = inject(Router);
  private _notification: ToastrService = inject(ToastrService);

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this._userApi.resetPassword(this.form?.email.value).subscribe(this.onSubscribeNext.bind(this));
  }

  onSubscribeNext(): void {
    this._notification.success('If the user with this email is registered in the system, we will send a link to reset the password.');
    this._router.navigate(['', 'auth', 'log-in']);
  }

  protected override _initForm(): void {
    this.formGroup = this._fb.group({
      email: ['', [Validators.required, VALIDATORS_SET.EMAIL]]
    });
  }
}

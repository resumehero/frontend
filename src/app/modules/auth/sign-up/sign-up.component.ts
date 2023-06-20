import { Component, inject } from '@angular/core';
import { AbstractFormComponent } from '@misc/abstracts/components/abstract-form.component';
import { Router } from '@angular/router';
import { UserApiService } from '@services/api/user-api/user-api.service';
import { FormControl, Validators } from '@angular/forms';
import { VALIDATORS_SET } from '@misc/constants/validators-set.constant';
import { CustomValidators } from '@misc/custom-validators';
import { BooleanFieldType } from '@base/common/modules/forms/base-boolean-field/base-boolean-field.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends AbstractFormComponent {
  readonly BooleanFieldType: typeof BooleanFieldType = BooleanFieldType;
  private _userApi: UserApiService = inject(UserApiService);
  private _router: Router = inject(Router);
  private _notification: ToastrService = inject(ToastrService);

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const { email, password } = this.formGroup.getRawValue();

    this._userApi.createItem({ email, password }).subscribe((): void => {
      this._router.navigate(['']);
      this._notification.success(
        `Your account has been successfully created.
        Please check your inbox and follow the instructions in the email to verify your account.`
      );
    });
  }

  protected override _initForm(): void {
    this.formGroup = this._fb.group(
      {
        email: new FormControl('', [Validators.required, VALIDATORS_SET.EMAIL]),
        password: new FormControl('', [Validators.required, VALIDATORS_SET.PASSWORD]),
        repeatPassword: new FormControl('', [Validators.required, VALIDATORS_SET.PASSWORD]),
        agreement: new FormControl(false, [Validators.requiredTrue])
      },
      { validators: [CustomValidators.mustMatch('password', 'repeatPassword')] }
    );
  }
}

import { Component, inject } from '@angular/core';
import { AbstractFormComponent } from '@misc/abstracts/components/abstract-form.component';
import { Router } from '@angular/router';
import { UserApiService } from '@services/api/user-api/user-api.service';
import { FormControl, Validators } from '@angular/forms';
import { VALIDATORS_SET } from '@misc/constants/validators-set.constant';
import { CustomValidators } from '@misc/custom-validators';
import { BooleanFieldType } from '@base/common/modules/forms/base-boolean-field/base-boolean-field.component';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends AbstractFormComponent {
  readonly BooleanFieldType: typeof BooleanFieldType = BooleanFieldType;
  private _userApi: UserApiService = inject(UserApiService);
  private _router: Router = inject(Router);

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this._userApi.createItem(this.formGroup.getRawValue()).subscribe((): Promise<boolean> => this._router.navigate(['']));
  }

  protected override _initForm(): void {
    this.formGroup = this._fb.group(
      {
        username: new FormControl('', [Validators.required, VALIDATORS_SET.EMAIL]),
        password: new FormControl('', [Validators.required, VALIDATORS_SET.PASSWORD]),
        repeatPassword: new FormControl('', [Validators.required, VALIDATORS_SET.PASSWORD])
      },
      { validators: [CustomValidators.mustMatch('password', 'repeatPassword')] }
    );
  }
}

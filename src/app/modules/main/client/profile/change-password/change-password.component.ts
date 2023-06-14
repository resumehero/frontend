import { AfterViewInit, Component, inject } from '@angular/core';
import { ToolbarHelperService } from '@services/toolbar-helper/toolbar-helper.service';
import { profileTabLinks } from '@modules/main/client/profile/profile-tab-links';
import { AbstractFormComponent } from '@misc/abstracts/components/abstract-form.component';
import { NgForm, Validators } from '@angular/forms';
import { VALIDATORS_SET } from '@misc/constants/validators-set.constant';
import { CustomValidators } from '@misc/custom-validators';
import { UserApiService } from '@services/api/user-api/user-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends AbstractFormComponent implements AfterViewInit {
  private _toolbar: ToolbarHelperService = inject(ToolbarHelperService);
  private _userApi: UserApiService = inject(UserApiService);
  private _notification: ToastrService = inject(ToastrService);

  ngAfterViewInit(): void {
    this._toolbar.data = {
      pageName: 'My profile',
      navLinks: profileTabLinks
    };
  }

  submit(formRef: NgForm): void {
    if (this.formGroup.invalid) {
      return;
    }

    const { current_password, new_password } = this.formGroup.value;

    this._userApi.setPassword(current_password, new_password).subscribe(() => {
      this.formGroup.reset();
      formRef.resetForm();
      this._notification.success('Password has been successfully changed.');
    });
  }

  protected override _initForm(): void {
    this.formGroup = this._fb.group(
      {
        current_password: ['', [Validators.required]],
        new_password: ['', [Validators.required, VALIDATORS_SET.PASSWORD]],
        repeatPassword: ['', [Validators.required, VALIDATORS_SET.PASSWORD]]
      },
      { validators: [CustomValidators.mustMatch('new_password', 'repeatPassword')] }
    );
  }
}

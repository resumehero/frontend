import { AfterViewInit, Component, inject } from '@angular/core';
import { ToolbarHelperService } from '@services/toolbar-helper/toolbar-helper.service';
import { profileTabLinks } from '@modules/main/client/profile/profile-tab-links';
import { AbstractFormComponent } from '@misc/abstracts/components/abstract-form.component';
import { Validators } from '@angular/forms';
import { VALIDATORS_SET } from '@misc/constants/validators-set.constant';
import { CustomValidators } from '@misc/custom-validators';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends AbstractFormComponent implements AfterViewInit {
  private _toolbar: ToolbarHelperService = inject(ToolbarHelperService);

  ngAfterViewInit(): void {
    this._toolbar.data = {
      pageName: 'My profile',
      navLinks: profileTabLinks
    };
  }

  submit(): void {
    if (this.formGroup.invalid) {
      return;
    }
  }

  protected override _initForm(): void {
    this.formGroup = this._fb.group(
      {
        currentPassword: ['', [Validators.required]],
        password: ['', [Validators.required, VALIDATORS_SET.PASSWORD]],
        repeatPassword: ['', [Validators.required, VALIDATORS_SET.PASSWORD]]
      },
      { validators: [CustomValidators.mustMatch('password', 'repeatPassword')] }
    );
  }
}

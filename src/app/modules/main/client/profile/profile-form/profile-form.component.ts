import { AfterViewInit, Component, inject } from '@angular/core';
import { ToolbarHelperService } from '@services/toolbar-helper/toolbar-helper.service';
import { profileTabLinks } from '@modules/main/client/profile/profile-tab-links';

@Component({
  selector: 'profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements AfterViewInit {
  private _toolbar: ToolbarHelperService = inject(ToolbarHelperService);

  ngAfterViewInit(): void {
    this._toolbar.data = {
      pageName: 'My profile',
      navLinks: profileTabLinks
    };
  }
}

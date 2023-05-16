import { Component, TemplateRef } from '@angular/core';
import { ToolbarHelperService } from '@services/toolbar-helper/toolbar-helper.service';
import { INavLink } from '@models/interfaces/nav-link.interface';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  get pageName(): string {
    return this._toolbarHelper.pageName;
  }

  get navLinks(): INavLink[] {
    return this._toolbarHelper.navLinks;
  }

  get template(): TemplateRef<any> | null {
    return this._toolbarHelper.template;
  }

  get templateData(): any {
    return this._toolbarHelper.templateData;
  }

  get isHidden(): any {
    return this._toolbarHelper.isHidden;
  }

  constructor(private _toolbarHelper: ToolbarHelperService) {}
}

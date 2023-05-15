import { AfterViewInit, Component, inject } from '@angular/core';
import { AbstractListingApiComponent } from '@misc/abstracts/components/abstract-listing-api.component';
import { List } from '@models/classes/_list.model';
import { Resume, ResumeFileIconMap } from '@models/classes/resume.model';
import { Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { resumeList } from '@modules/main/client/resumes/resume-list/resumes.mock';
import { ToolbarHelperService } from '@services/toolbar-helper/toolbar-helper.service';

@Component({
  selector: 'resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.scss']
})
export class ResumeListComponent extends AbstractListingApiComponent<Resume> implements AfterViewInit {
  list: List<Resume>;
  private _toolbar: ToolbarHelperService = inject(ToolbarHelperService);

  getIconName(item: Resume): string {
    return ResumeFileIconMap.get(item.type);
  }

  downloadItem(item: Resume): void {
    // implement
  }

  deleteItem(item: Resume): void {
    // implement
  }

  ngAfterViewInit(): void {
    this._toolbar.data = {
      pageName: 'My resumes'
    };
  }

  protected override _getItems(params: Params): Observable<List<Resume>> {
    return of({ entities: resumeList, total: resumeList.length });
  }
}

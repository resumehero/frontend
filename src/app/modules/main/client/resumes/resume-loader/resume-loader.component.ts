import { Component, Inject, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { IModalComponentContext, IModalFormComponent } from '@shared/modal/modal.component';
import { FormGroup } from '@angular/forms';
import { Resume } from '@models/classes/resume.model';
import { ResumeApiService } from '@services/api/resume-api/resume-api.service';
import { interval, Subject, switchMap, take } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { ResumeStatus } from '@models/enums/resume-status.enum';
import { ToastrService } from 'ngx-toastr';
import { downloadFile } from '@misc/helpers/file-download';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'resume-loader',
  templateUrl: './resume-loader.component.html',
  styleUrls: ['./resume-loader.component.scss']
})
export class ResumeLoaderComponent implements IModalFormComponent, OnInit, OnDestroy {
  @Input() context: IModalComponentContext<Resume>;
  formGroup: FormGroup;
  private readonly _DESTROYED$: Subject<void> = new Subject();
  private _resumeApi: ResumeApiService = inject(ResumeApiService);
  private readonly _POLL_PERIOD: number = 3000;
  private readonly _POLL_COUNT: number = 60;
  private _notification: ToastrService = inject(ToastrService);

  constructor(@Inject(DOCUMENT) private _document: Document) {}

  ngOnInit(): void {
    this._pollResumeStatus();
  }

  onSubmit(): void {}

  ngOnDestroy(): void {
    this._DESTROYED$.next();
    this._DESTROYED$.complete();
  }

  private _pollResumeStatus(): void {
    interval(this._POLL_PERIOD)
      .pipe(
        take(this._POLL_COUNT),
        takeUntil(this._DESTROYED$),
        switchMap(() => this._resumeApi.getItem(this.context.entity.id, {}, { skipLoaderStart: true })),
        filter((res: Resume) => [ResumeStatus.Done, ResumeStatus.Error].includes(res.resume_status)),
        tap((res: Resume) => this._showResultNotification(res.resume_status)),
        tap((res: Resume) => downloadFile(this._document, res.resume_file.file)),
        tap(() => this.context.dialog.close())
      )
      .subscribe();
  }

  private _showResultNotification(status: ResumeStatus): void {
    if (status === ResumeStatus.Done) {
      this._notification.success('Your resume has been successfully generated and will be downloaded in a few seconds.');
    } else {
      this._notification.error('Your resume could not be generated. Please try again later.');
    }
  }
}

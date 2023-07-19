import { Component, inject, Input, OnInit } from '@angular/core';
import { IModalComponentContext, IModalFormComponent } from '@shared/modal/modal.component';
import { Resume, ResumeCreate, ResumeFileType } from '@models/classes/resume.model';
import { AbstractFormComponent, FormControlRecord } from '@misc/abstracts/components/abstract-form.component';
import { ResumeType } from '@models/enums/resume-type.enum';
import { FormControl, Validators } from '@angular/forms';
import { fadeInOut } from '@base/animations/appearance.animations';
import { ResumeApiService } from '@services/api/resume-api/resume-api.service';
import { ResumeTemplateApiService } from '@services/api/resume-template-api/resume-template-api.service';
import { IOption } from '@models/interfaces/forms/option.interface';
import { switchMap, tap } from 'rxjs/operators';
import { ResumeService } from '@services/resume/resume.service';
import { Observable } from 'rxjs';
import { ModalService } from '@shared/modal/modal.service';
import { ResumeLoaderComponent } from '@modules/main/client/resumes/resume-loader/resume-loader.component';

@Component({
  selector: 'create-resume',
  templateUrl: './create-resume.component.html',
  styleUrls: ['./create-resume.component.scss'],
  animations: [fadeInOut()]
})
export class CreateResumeComponent extends AbstractFormComponent<ResumeCreate> implements IModalFormComponent<Resume>, OnInit {
  @Input() context: IModalComponentContext<Resume>;
  ResumeType: typeof ResumeType = ResumeType;
  ResumeFileType: typeof ResumeFileType = ResumeFileType;
  templatesOptions: IOption[] = [];
  private _resumeService: ResumeService = inject(ResumeService);
  private _resumeApi: ResumeApiService = inject(ResumeApiService);
  private _resumeTemplateApi: ResumeTemplateApiService = inject(ResumeTemplateApiService);
  private _modalService: ModalService = inject(ModalService);
  readonly MIN_VACANCY_LENGTH: number = 32;
  readonly MAX_VACANCY_LENGTH: number = 2048;

  get typeControl(): FormControl {
    return this.form?.resume_type as FormControl;
  }

  get fileTypeControl(): FormControl {
    return this.form?.resume_file_type as FormControl;
  }

  _initForm(): void {
    this.formGroup = this._fb.group<FormControlRecord<ResumeCreate, unknown>>({
      resume_type: [ResumeType.Default],
      resume_file_type: [ResumeFileType.DOC],
      vacancy_text: [
        {
          value: '',
          disabled: true
        },
        [Validators.required, Validators.minLength(this.MIN_VACANCY_LENGTH), Validators.maxLength(this.MAX_VACANCY_LENGTH)]
      ],
      resume_template_id: ['', Validators.required]
    });
    this._handleResumeTypeChange();
    this._getTemplateOptions();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return this.formGroup.markAsTouched();
    }
    const body: ResumeCreate = this.formGroup.value;

    this._resumeApi
      .generateResume(body)
      .pipe(
        tap(() => this._resumeApi.clearEntireCache()),
        tap(() => this.context.dialog.close(body)),
        switchMap((res: Resume) => this._openResumeLoader(res))
      )
      .subscribe();
  }

  private _openResumeLoader(entity: Resume): Observable<unknown> {
    return this._modalService
      .open(
        {
          component: ResumeLoaderComponent,
          context: { entity }
        },
        { width: '50rem', autoFocus: 'dialog', shouldHandleFalse: true }
      )
      .pipe(tap(() => this._resumeService.RESUME_CREATED$.next()));
  }

  private _handleResumeTypeChange(): void {
    this.form.resume_type.valueChanges.subscribe((value: ResumeType) =>
      value === ResumeType.Default ? this.form.vacancy_text.disable() : this.form.vacancy_text.enable()
    );
  }

  private _getTemplateOptions(): void {
    this._resumeTemplateApi.getItems().subscribe(res => {
      this.templatesOptions = res.entities.map(item => ({ label: item.name, value: item.id }));
    });
  }
}

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
  private _resumeApi: ResumeApiService = inject(ResumeApiService);
  private _resumeTemplateApi: ResumeTemplateApiService = inject(ResumeTemplateApiService);

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
      vacancy_text: { value: '', disabled: true },
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
    console.log(body);
    this._resumeApi.generateResume(body).subscribe();
    // this.context.dialog.close(body);
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

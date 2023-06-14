import { Injectable } from '@angular/core';
import { AbstractApiService } from '@misc/abstracts/services/abstract-api.service';
import { ClassConstructor } from 'class-transformer';
import { ResumeTemplate } from '@models/classes/resume-template.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeTemplateApiService extends AbstractApiService<ResumeTemplate> {
  protected readonly _URL_PATH: string = '/resume/resumes_templates';
  protected readonly _MODEL: ClassConstructor<ResumeTemplate> = ResumeTemplate;
}

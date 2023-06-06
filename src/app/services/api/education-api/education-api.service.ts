import { Injectable } from '@angular/core';
import { AbstractApiService } from '@misc/abstracts/services/abstract-api.service';
import { ClassConstructor } from 'class-transformer';
import { Education } from '@models/classes/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationApiService extends AbstractApiService<Education> {
  protected readonly _URL_PATH: string = '/user_profile/educations';
  protected readonly _MODEL: ClassConstructor<Education> = Education;
}

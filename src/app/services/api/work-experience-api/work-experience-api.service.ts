import { Injectable } from '@angular/core';
import { AbstractApiService } from '@misc/abstracts/services/abstract-api.service';
import { ClassConstructor } from 'class-transformer';
import { WorkExperience } from '@models/classes/work-experience.model';

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceApiService extends AbstractApiService<WorkExperience> {
  protected readonly _URL_PATH: string = '/user_profile/work_experiences';
  protected readonly _MODEL: ClassConstructor<WorkExperience> = WorkExperience;
}

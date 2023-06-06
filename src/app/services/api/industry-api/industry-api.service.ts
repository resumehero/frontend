import { Injectable } from '@angular/core';
import { AbstractApiService } from '@misc/abstracts/services/abstract-api.service';
import { ClassConstructor } from 'class-transformer';
import { Industry } from '@models/classes/industry.model';

@Injectable({
  providedIn: 'root'
})
export class IndustryApiService extends AbstractApiService<Industry> {
  protected readonly _URL_PATH: string = '/user_profile/industries';
  protected readonly _MODEL: ClassConstructor<Industry> = Industry;
}

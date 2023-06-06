import { Injectable } from '@angular/core';
import { AbstractApiService } from '@misc/abstracts/services/abstract-api.service';
import { ClassConstructor } from 'class-transformer';
import { Accomplishment } from '@models/classes/accomplishment.model';

@Injectable({
  providedIn: 'root'
})
export class AccomplishmentApiService extends AbstractApiService<Accomplishment> {
  protected readonly _URL_PATH: string = '/user_profile/accomplishments';
  protected readonly _MODEL: ClassConstructor<Accomplishment> = Accomplishment;
}

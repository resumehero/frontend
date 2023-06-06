import { Injectable } from '@angular/core';
import { AbstractApiService } from '@misc/abstracts/services/abstract-api.service';
import { ClassConstructor } from 'class-transformer';
import { Certification } from '@models/classes/certification.model';

@Injectable({
  providedIn: 'root'
})
export class CertificationApiService extends AbstractApiService<Certification> {
  protected readonly _URL_PATH: string = '/user_profile/certifications';
  protected readonly _MODEL: ClassConstructor<Certification> = Certification;
}

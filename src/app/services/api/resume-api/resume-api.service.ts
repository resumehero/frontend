import { Injectable } from '@angular/core';
import { AbstractApiService } from '@misc/abstracts/services/abstract-api.service';
import { ClassConstructor } from 'class-transformer';
import { Resume, ResumeCreate } from '@models/classes/resume.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeApiService extends AbstractApiService<Resume> {
  protected readonly _URL_PATH: string = '/resume/resumes';
  protected readonly _MODEL: ClassConstructor<Resume> = Resume;

  generateResume(body: ResumeCreate): Observable<any> {
    return this._http.post(`/resume/generate_resume`, body);
  }
}

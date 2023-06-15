import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  readonly RESUME_CREATED$: Subject<void> = new Subject<void>();
}

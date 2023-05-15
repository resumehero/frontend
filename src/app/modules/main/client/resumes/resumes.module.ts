import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumesComponent } from './resumes.component';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [ResumesComponent, ResumeListComponent],
  imports: [CommonModule, RouterOutlet]
})
export class ResumesModule {}

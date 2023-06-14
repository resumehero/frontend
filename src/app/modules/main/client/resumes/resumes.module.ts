import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumesComponent } from './resumes.component';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { CreateResumeComponent } from './create-resume/create-resume.component';

@NgModule({
  declarations: [ResumesComponent, ResumeListComponent, CreateResumeComponent],
  imports: [CommonModule, RouterOutlet, SharedModule]
})
export class ResumesModule {}

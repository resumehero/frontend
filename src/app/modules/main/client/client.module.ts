import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageModule } from '@modules/main/common/not-found-page/not-found-page.module';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '@modules/main/common/not-found-page/not-found-page.component';
import { MainLayoutComponent } from '@layouts/main/main-layout.component';
import { MainLayoutModule } from '@layouts/main/main-layout.module';
import { ProfileComponent } from '@modules/main/client/profile/profile.component';
import { ResumesComponent } from '@modules/main/client/resumes/resumes.component';
import { ProfileModule } from '@modules/main/client/profile/profile.module';
import { ResumesModule } from '@modules/main/client/resumes/resumes.module';
import { ProfileFormComponent } from '@modules/main/client/profile/profile-form/profile-form.component';
import { ChangePasswordComponent } from '@modules/main/client/profile/change-password/change-password.component';
import { ResumeListComponent } from '@modules/main/client/resumes/resume-list/resume-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'profile'
      },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: ProfileFormComponent
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent
          }
        ]
      },
      {
        path: 'resumes',
        component: ResumesComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: ResumeListComponent
          }
        ]
      },
      {
        path: '**',
        redirectTo: '/404'
      },
      {
        path: '404',
        component: NotFoundPageComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), MainLayoutModule, NotFoundPageModule, ProfileModule, ResumesModule]
})
export class ClientModule {}

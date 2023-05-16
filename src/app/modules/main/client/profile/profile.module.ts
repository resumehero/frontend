import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { MainLayoutModule } from '@layouts/main/main-layout.module';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ProfileComponent, ChangePasswordComponent, ProfileFormComponent],
  imports: [CommonModule, MainLayoutModule, RouterOutlet, SharedModule]
})
export class ProfileModule {}

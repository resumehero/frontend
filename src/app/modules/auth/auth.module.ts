import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInModule } from '@modules/auth/log-in/log-in.module';
import { SignUpModule } from '@modules/auth/sign-up/sign-up.module';
import { ConfirmationEmailModule } from '@modules/auth/confirmation-email/confirmation-email.module';
import { ForgotPasswordModule } from '@modules/auth/forgot-password/forgot-password.module';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from '@modules/auth/log-in/log-in.component';
import { SignUpComponent } from '@modules/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from '@modules/auth/forgot-password/forgot-password.component';
import { ConfirmationEmailComponent } from '@modules/auth/confirmation-email/confirmation-email.component';
import { ConfirmationEmailGuard } from '@guards/confirmation-email/confirmation-email.guard';
import { ConfirmationTokenResolver } from '@resolvers/confirmation-token/confirmation-token.resolver';
import { AuthLayoutComponent } from '@layouts/auth/auth-layout.component';
import { AuthLayoutModule } from '@layouts/auth/auth-layout.module';
import {
  ACTIVATION_TOKEN_KEY,
  ACTIVATION_UID_KEY,
  PASSWORD_CONFIRM_TOKEN_KEY,
  PASSWORD_CONFIRM_UID_KEY
} from '@misc/constants/_base.constant';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'log-in',
        component: LogInComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: `activate/:${ACTIVATION_UID_KEY}/:${ACTIVATION_TOKEN_KEY}`,
        component: ConfirmationEmailComponent,
        canActivate: [ConfirmationEmailGuard],
        resolve: {
          emailConfirmationErrorMessage: ConfirmationTokenResolver
        }
      },
      {
        path: `password-confirm/:${PASSWORD_CONFIRM_UID_KEY}/:${PASSWORD_CONFIRM_TOKEN_KEY}`,
        component: ForgotPasswordComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'log-in'
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AuthLayoutModule,
    LogInModule,
    SignUpModule,
    ForgotPasswordModule,
    ConfirmationEmailModule
  ]
})
export class AuthModule {}

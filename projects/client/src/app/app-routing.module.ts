import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeResolver } from '@resolvers/me/me.resolver';
import { UserRole } from '@models/enums/user-role.enum';
import { UnauthGuard } from '@guards/unauth/unauth.guard';
import { IRoleGuardParams, RoleGuard } from '@guards/role/role.guard';
import { AuthGuard } from '@guards/auth/auth.guard';
import { AuthModule } from '@modules/auth/auth.module';
import { ClientModule } from '@modules/main/client/client.module';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [UnauthGuard],
    loadChildren: (): Promise<Type<AuthModule>> =>
      import('@modules/auth/auth.module').then((m: { AuthModule: Type<AuthModule> }): Type<AuthModule> => m.AuthModule)
  },
  {
    path: '',
    resolve: { me: MeResolver },
    canMatch: [AuthGuard, RoleGuard],
    runGuardsAndResolvers: 'always',
    data: {
      roleGuardParams: {
        redirectTo: ['', 'auth', 'log-in'],
        roles: [UserRole.client]
      } as IRoleGuardParams
    },
    loadChildren: (): Promise<Type<ClientModule>> =>
      import('@modules/main/client/client.module').then((m: { ClientModule: Type<ClientModule> }): Type<ClientModule> => m.ClientModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always',
      enableTracing: false,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

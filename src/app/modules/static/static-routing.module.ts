import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TermsOfUseComponent } from '@modules/static/terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from '@modules/static/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: 'terms-of-use',
    component: TermsOfUseComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class StaticRoutingModule {}

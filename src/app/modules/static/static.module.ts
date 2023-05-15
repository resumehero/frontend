import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { StaticRoutingModule } from '@modules/static/static-routing.module';

@NgModule({
  declarations: [TermsOfUseComponent, PrivacyPolicyComponent],
  imports: [CommonModule, StaticRoutingModule],
  exports: [StaticRoutingModule]
})
export class StaticModule {}

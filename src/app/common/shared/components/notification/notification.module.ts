import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { ToastrModule } from 'ngx-toastr';
import { GlobalConfig } from 'ngx-toastr/toastr/toastr-config';

const toastrConfig: Partial<GlobalConfig> = {
  positionClass: 'toast-top-right',
  toastComponent: NotificationComponent,
  progressBar: true,
  preventDuplicates: true,
  includeTitleDuplicates: false
};

@NgModule({
  declarations: [NotificationComponent],
  imports: [CommonModule, ToastrModule.forRoot(toastrConfig)]
})
export class NotificationModule {}

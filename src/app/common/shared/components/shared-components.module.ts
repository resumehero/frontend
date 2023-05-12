import { NgModule } from '@angular/core';
import { AvatarModule } from '@shared/components/avatar/avatar.module';
import { LoaderContainerModule } from './loader-container/loader-container.module';
import { PaginatedListModule } from './paginated-list/paginated-list.module';
import { PaginatorModule } from './paginator/paginator.module';
import { CroppedTextModule } from './cropped-text/cropped-text.module';
import { NotificationModule } from '@shared/components/notification/notification.module';

@NgModule({
  exports: [AvatarModule, LoaderContainerModule, PaginatedListModule, PaginatorModule, CroppedTextModule, NotificationModule]
})
export class SharedComponentsModule {}

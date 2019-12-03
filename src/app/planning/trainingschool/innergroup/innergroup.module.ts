import { NgModule } from '@angular/core';
import { SharedModule } from './../../../shared/shared.module';
import { InnerGroupListComponent } from './views/innergroup-list/innergroup-list.component';
import { InnerGroupRoutingModule } from './innergroup-routing.module';
import { InnerGroupService } from './service/innergroup.service';

@NgModule({
  imports: [
    SharedModule,
    InnerGroupRoutingModule,
  ],
  // tslint:disable-next-line:max-line-length
  declarations: [InnerGroupListComponent],
  providers: [InnerGroupService],
})
export class InnerGroupModule { }

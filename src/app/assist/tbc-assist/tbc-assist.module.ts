import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TbcAssistRoutingModule, routedComponents } from './tbc-assist-routing.module';
import { TbcAssistApiService } from './service/tbc-assist-api.service';
import { TbcDetailResolverService } from './service/tbc-detail-resolver.service';
import { AccountModule } from '../../account/account.module';
import { OfferingModule } from '../../learning/offering/offering.module';
import { TrainingClassDetailModule } from '../../training/training-class/training-class-detail.module';
import { TbcExtendListComponent } from './views/tbc-extend-list/tbc-extend-list.component';

@NgModule({
  imports: [
    CommonModule,  
    SharedModule,
    TbcAssistRoutingModule,
    AccountModule,
    OfferingModule,
    TrainingClassDetailModule.forAssist()
  ],
  declarations: [
    ...routedComponents,
    TbcExtendListComponent,
  ],
  providers: [
    TbcAssistApiService,
    TbcDetailResolverService
  ]
})
export class TbcAssistModule { }

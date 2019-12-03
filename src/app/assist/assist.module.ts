import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AssistRoutingModule, routedComponents } from './assist-routing.module';
import { AssistHomeModule } from './assist-home/assist-home.module';
import { OrgTreeApiService } from 'app/shared/api';
import { AssistOrgTreeApiService } from './assist-org-tree-api.service';
import { ProxyRegisterTermComponent } from './term-assist/proxy-register-term/proxy-register-term.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AssistRoutingModule
  ],
  declarations: [
    ...routedComponents,
    ProxyRegisterTermComponent
  ],
  providers: [
    {provide: OrgTreeApiService, useClass: AssistOrgTreeApiService}
  ]
})
export class AssistModule { }

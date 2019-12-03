import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProxyRegisterTbclistComponent } from './proxy-register-tbclist/proxy-register-tbclist.component';
import { ProxyRegisterApiService } from './service/proxy-register-api.service';
import { ProxyRegisterAssistRoutingModule, routedComponents } from './proxy-register-assist-routing.module';
import { ProxyRegisterTermComponent } from './proxy-register-term/proxy-register-term.component';
import { TermUserImportComponent } from '../../learning/offering/public/term-user-import/term-user-import.component';
import { OfferingModule } from 'app/learning/offering/offering.module';
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ProxyRegisterAssistRoutingModule,
        OfferingModule
    ],
    declarations: [...routedComponents, ProxyRegisterTermComponent],
    providers: [
        ProxyRegisterApiService
    ]
})
export class ProxyRegisterAssistModule { }

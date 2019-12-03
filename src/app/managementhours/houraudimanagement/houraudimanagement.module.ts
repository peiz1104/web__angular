import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { HouraduiRoutingModule, routedComponents } from './houraudimanagement-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { SystemPublicModule } from '../../system/public/system-public.module';
import { PublicModule } from '../public/public.module';
import { HourauditdeclarelistComponent } from './views/hourauditdeclarelist/hourauditdeclarelist.component';

@NgModule({
    imports: [
        HouraduiRoutingModule,
        SharedModule,
        SystemPublicModule,
        PublicModule
    ],
    declarations: [...routedComponents],
    exports:[HourauditdeclarelistComponent]
})
export class HouraudimanagementModule { }

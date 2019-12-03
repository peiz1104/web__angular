import { NgModule } from '@angular/core';
import { SystemPublicModule } from '../../system/public/system-public.module';
import { SharedModule } from '../../shared/shared.module';
import { HourannualRoutingModule, routedComponents } from './hourannual-routing.module';


@NgModule({
    imports: [
        SystemPublicModule,
        SharedModule,
        HourannualRoutingModule
    ],
    declarations: [...routedComponents],
    providers: []
})
export class HourannualModule { }

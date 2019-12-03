import { NgModule } from '@angular/core';
import { HourconfigurationRoutingModule, routedComponents } from './hourconfiguration-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { SystemPublicModule } from '../../system/public/system-public.module';
import { PublicModule } from '../public/public.module';



@NgModule({
    imports: [
        HourconfigurationRoutingModule,
        SharedModule,
        SystemPublicModule,
        PublicModule
    ],
    declarations: [...routedComponents],
    providers: [],
})
export class HourconfigurationModule { }

import { NgModule } from '@angular/core';
import { HourtaskRoutingModule, routedComponents } from './hourtask-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { SystemPublicModule } from '../../system/public/system-public.module';
import { PublicModule } from '../public/public.module';



@NgModule({
    imports: [
        HourtaskRoutingModule,
        SharedModule,
        SystemPublicModule,
        PublicModule
    ],
    declarations: [...routedComponents],
    providers: []
})
export class HourtaskModule { }

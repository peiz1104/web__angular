import { NgModule } from '@angular/core';
import { SystemPublicModule } from '../../system/public/system-public.module';
import { SharedModule } from '../../shared/shared.module';
import { GrouphourRoutingModule, routedComponents } from './grouphour-routing.module';


@NgModule({
    imports: [
        SystemPublicModule,
        SharedModule,
        GrouphourRoutingModule
    ],
    declarations: [...routedComponents],
    providers: []
})
export class GrouphourModule { }


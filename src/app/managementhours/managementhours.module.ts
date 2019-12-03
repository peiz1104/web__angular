import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
// import { SystemPublicModule } from '../../system/public/system-public.module';
import { HourService } from './managementservice/hour.service'
import { ManagementRoutingModule } from './managementhours-routing.module';
import { PublicModule } from './public/public.module';

@NgModule({
    imports: [
        SharedModule,
        ManagementRoutingModule,
        PublicModule
    ],
    declarations: [],
    providers: [HourService]
})
export class ManagementhoursModule { }

import { SharedModule } from 'app/shared';
import { NgModule } from '@angular/core';

import { UgcActivityWorkInfoRoutingModule, routedComponents } from './ugc-activity-work-info-routing.module';
import { UgcPublicModule } from '../../../../public/public.mode';

@NgModule({
    imports: [
        SharedModule,
        UgcPublicModule,
        UgcActivityWorkInfoRoutingModule
    ],
    exports: [],
    declarations: [...routedComponents],
    providers: [],
})
export class UgcActivityWorkInfoModule { }

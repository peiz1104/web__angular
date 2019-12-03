import { SharedModule } from 'app/shared';
import { NgModule } from '@angular/core';

import { UgcActivityVoteInfoRoutingModule, routedComponents } from './ugc-activity-vote-info-routing.module';
import { UgcPublicModule } from '../../../../public/public.mode';

@NgModule({
    imports: [
        SharedModule,
        UgcActivityVoteInfoRoutingModule
    ],
    exports: [],
    declarations: [...routedComponents],
    providers: [],
})
export class UgcActivityVoteInfoModule { }

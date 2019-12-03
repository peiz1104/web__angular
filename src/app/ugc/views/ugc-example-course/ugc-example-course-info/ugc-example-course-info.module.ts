import { SharedModule } from 'app/shared';
import { NgModule } from '@angular/core';

import { UgcPublicModule } from '../../../public/public.mode';
import { UgcExampleCourseInfoRoutingModule, routedComponents } from './ugc-example-course-info-routing.module';

@NgModule({
    imports: [
        SharedModule,
        UgcPublicModule,
        UgcExampleCourseInfoRoutingModule
    ],
    exports: [],
    declarations: [...routedComponents],
    providers: [],
})
export class UgcExampleCourseInfoModule { }

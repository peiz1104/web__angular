import { DocumentInfoService } from './../../../library/service/documentInfo.service';
import { CoursePublicModule } from './../public/course-public.module';
import { SharedModule } from 'app/shared';
import { routedComponents, CourseInfoRoutingModule } from './course-info-routing.module';
import { NgModule } from '@angular/core';


import { MaterialModule } from '../../material/material.module';

@NgModule({
    imports: [
        SharedModule,
        CourseInfoRoutingModule,
        CoursePublicModule,
    ],
    exports: [],
    declarations: [...routedComponents],
    providers: [],
})
export class CourseInfoModule { }

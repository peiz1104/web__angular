
import { ResearchRoutingModule, routedComponents } from './research-routing.module';
import { NgModule } from '@angular/core';
import { ResearchService } from "app/development/research/service/research.service";
import { SharedModule } from 'app/shared';
import { SystemPublicModule } from '../../system/public/system-public.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TeacherLookupModule } from 'app/library/public/teacher-lookup/teacher-lookup.module';
import { DocumentInfoService } from 'app/library/service/documentInfo.service';


@NgModule({
    imports: [
        ResearchRoutingModule,
        SharedModule,
        TeacherLookupModule,
        SystemPublicModule,
        NgZorroAntdModule.forRoot()
    ],
    declarations: [
        ...routedComponents
    ],
    providers: [
        ResearchService,
        DocumentInfoService
    ],
})
export class ResearchModule { }

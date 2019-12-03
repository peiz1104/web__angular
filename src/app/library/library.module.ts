import { CaseInfo } from 'app/library/entity/case-info';
import { OfferingModule } from 'app/learning/offering/offering.module';
import { TermService } from './../learning/offering/service/term.service';
import { NgModule } from '@angular/core';
import { routedComponents, LibraryRoutingModule } from "./library-routing.module";
import { SharedModule } from "app/shared";
import { TeacherLookupModule } from './public/teacher-lookup/teacher-lookup.module';
import { DocumentLibService } from "./service/documentLib.service";
import { ReactiveFormsModule } from "@angular/forms/forms";
import { SystemModule } from "app/system/system.module";
import { DocumentDetailResolver } from "app/library/service/document-detail-resolver.service";
import { TrainBaseService } from './service/train-base.service';
import { ImageService } from './service/image.service';
import { TeacherService } from './service/teacher.service';
import { TeachernewService, TeacherPartService } from './service/teachernew.service';
import { TeacherGrantService } from './service/teacher-grant.service';
import { CaseInfoService } from './service/case.service';
import { CaseFormComponent } from './public/case-form/case-form.component';
import { CaseInfoComponent } from './views/case-info/case-info.component';
import { CertificateService } from "./service/certificate.service";
import { AccountService } from 'app/account/service/account.service';
import { CaseCiteLookupComponent } from './public/case-cite-lookup/case-cite-lookup.component';
import { EmploymentDocumentsService } from './service/employment-documents.service';
import { ChaZhanLocationService } from './service/chazhan-location.service';
import { DocumentInfoService } from 'app/library/service/documentInfo.service';


@NgModule({

    imports: [
        SharedModule,
        SystemModule,
        LibraryRoutingModule,
        TeacherLookupModule,
        OfferingModule, // 暂时的，重构系统级复用组件
    ],
    declarations: [
        ...routedComponents,
    ],
    providers: [
        DocumentLibService,
        DocumentDetailResolver,
        TrainBaseService,
        ImageService,
        TeacherService,
        TeachernewService,
        TeacherPartService,
        TeacherGrantService,
        CaseInfoService,
        CertificateService,
        AccountService,
        TermService,
        EmploymentDocumentsService,
        ChaZhanLocationService,
        DocumentInfoService,
    ],
    exports: [
        CaseFormComponent,
        CaseInfoComponent,
        CaseCiteLookupComponent,
    ],
})
export class LibraryModule { }

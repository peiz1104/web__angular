import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentListComponent } from "app/library/views/document-list/document-list.component";
import { DocumentAddComponent } from "app/library/views/document-add/document-add.component";
import { DocumentDetailResolver } from "app/library/service/document-detail-resolver.service";
import { DocumentEditComponent } from "app/library/views/document-edit/document-edit.component";
import { TrainBaseInfoComponent } from './views/train-base-info/train-base-info.component';
import { TrainBaseAddComponent } from './views/train-base-add/train-base-add.component';
import { TrainBaseEditComponent } from './views/train-base-edit/train-base-edit.component';
import { ImageListComponent } from 'app/library/views/image-list/image-list.component';
import { ImageEditComponent } from 'app/library/views/image-edit/image-edit.component';
import { ImageAddComponent } from 'app/library/views/image-add/image-add.component';
import { TeacherListComponent } from 'app/library/views/teacher-list/teacher-list.component';
import { TeacherExtendAddComponent } from 'app/library/views/teacher-extend-add/teacher-extend-add.component';
import { TeacherExtendEditComponent } from 'app/library/views/teacher-extend-edit/teacher-extend-edit.component';
import { TeacherInternalAddComponent } from 'app/library/views/teacher-internal-add/teacher-internal-add.component';
import { TeacherInternalEditComponent } from 'app/library/views/teacher-internal-edit/teacher-internal-edit.component';
import { CaseListComponent } from './views/case-list/case-list.component';
import { CaseAddComponent } from './views/case-add/case-add.component';
import { CaseEditComponent } from './views/case-edit/case-edit.component';
import { CaseInfoComponent } from './views/case-info/case-info.component';
import { CaseImportComponent } from './views/case-import/case-import.component';
import { CertificateListComponent } from './views/certificate-list/certificate-list.component';
import { DragBoxComponent } from './public/drag-box/drag-box.component';
import { CertificateAddComponent } from './views/certificate-add/certificate-add.component';
import { CertificateEditComponent } from './views/certificate-edit/certificate-edit.component';
import { DocumentDetailComponent } from 'app/library/views/document-detail/document-detail.component';
import { DocumentConditionComponent } from 'app/library/views/document-condition/document-condition.component';
import { TeacherQualificationComponent } from './views/teacher-qualification/teacher-qualification.component';
import { TeacherQualificationAddComponent } from './views/teacher-qualification-add/teacher-qualification-add.component';
import { TeacherQualificationEditComponent } from './views/teacher-qualification-edit/teacher-qualification-edit.component';
import { TeacherMainComponent } from './views/teacher-main/teacher-main.component';
import { TeacherGrantComponent } from './views/teacher-grant/teacher-grant.component';
import { TeacherFulltimeComponent } from './views/teacher-fulltime/teacher-fulltime.component';
import { TeacherFulltimeEditComponent } from './views/teacher-fulltime-edit/teacher-fulltime-edit.component';
import { TeacherParttimeComponent } from './views/teacher-parttime/teacher-parttime.component';
import { TeacherParttimeAddComponent } from './views/teacher-parttime-add/teacher-parttime-add.component';
import { TeacherParttimeEditComponent } from './views/teacher-parttime-edit/teacher-parttime-edit.component';
import { TeacherExternalComponent } from './views/teacher-external/teacher-external.component';
import { TeacherExternalAddComponent } from './views/teacher-external-add/teacher-external-add.component';
import { TeacherExternalEditComponent } from './views/teacher-external-edit/teacher-external-edit.component';
import { EmploymentDocumentsListComponent } from './views/employment-documents-list/employment-documents-list.component';
import { EmploymentDocumentsAddComponent } from './views/employment-documents-add/employment-documents-add.component';
import { TeacherQualificationImportComponent } from './views/teacher-qualification-import/teacher-qualification-import.component';
import { PdfLookComponent } from './views/pdf-look/pdf-look.component';
import { TeacherParttimeImportComponent } from './views/teacher-parttime-import/teacher-parttime-import.component';
import { DocumentFormComponent } from './public/document-form/document-form.component';
import { TrainBaseFormComponent } from './public/train-base-form/train-base-form.component';
import { ImageFormComponent } from './public/image-form/image-form.component';
import { TeacherExtendFormComponent } from './public/teacher-extend-form/teacher-extend-form.component';
import { TeacherUserFormComponent } from './public/teacher-user-form/teacher-user-form.component';
import { TeacherInternalFormComponent } from './public/teacher-internal-form/teacher-internal-form.component';
import { CaseFormComponent } from './public/case-form/case-form.component';
import { CaseCiteLookupComponent } from './public/case-cite-lookup/case-cite-lookup.component';
import { TeacherQualificationFormComponent } from './public/teacher-qualification-form/teacher-qualification-form.component';
import { TeacherParttimeFormComponent } from './public/teacher-parttime-form/teacher-parttime-form.component';
import { TeacherExternalFormComponent } from './public/teacher-external-form/teacher-external-form.component';
import { TeacherCourseLookupComponent } from './views/teacher-course-lookup/teacher-course-lookup.component';
import { TeacherCourseLookComponent } from './views/teacher-course-look/teacher-course-look.component';
import { TeacherFulltimeFormComponent } from './public/teacher-fulltime-form/teacher-fulltime-form.component';
import { EmploymentDocumentsService } from './service/employment-documents.service';
import { DocumentsTeacherLookComponent } from './views/documents-teacher-look/documents-teacher-look.component';
import { TrainLocationLookComponent } from './views/train-location-look/train-location-look.component';
import { ChaZhanLocationService } from './service/chazhan-location.service';
import { DocumentInfoService } from 'app/library/service/documentInfo.service';
import { TeacherInformationListComponent } from './public/teacher-information-list/teacher-information-list.component';
// tslint:disable-next-line:max-line-length
import { TeacherBaseInformationComponent } from './public/teacher-information-list/teacher-base-information/teacher-base-information.component';
import { QualificationComponent } from './public/teacher-information-list/qualification/qualification.component';
import { RecordComponent } from './public/teacher-information-list/record/record.component';
import { TeacherExtFromComponent } from './public/teacher-ext-from/teacher-ext-from.component';
import { TeacherInnerFormComponent } from './public/teacher-inner-form/teacher-inner-form.component';

import { BarfileComponent } from './views/barfile/barfile.component';
import { HeadofficefileComponent } from './views/barfile/headofficefile/headofficefile.component';
import { HeadofficemessageComponent } from './views/barfile/headofficemessage/headofficemessage.component';
import { HeadofficematerialtemplateComponent } from './views/barfile/headofficematerialtemplate/headofficematerialtemplate.component';
import { HeadofficeeducationComponent } from './views/barfile/headofficeeducation/headofficeeducation.component';
import { HeadofficecalendarComponent } from './views/barfile/headofficecalendar/headofficecalendar.component';
import { BarfilechooseugComponent } from './views/barfile/barfilechooseug/barfilechooseug.component';

const routes: Routes = [
    { path: '', redirectTo: 'document/list', pathMatch: 'full' },
    {
        path: 'document', children: [
            { path: 'add', component: DocumentAddComponent },
            { path: 'list', component: DocumentListComponent },
            {
                path: ':id', component: DocumentDetailComponent, resolve: { document: DocumentDetailResolver }, children: [
                    {
                        path: '', children: [
                            { path: '', redirectTo: 'edit', pathMatch: 'full' },
                            { path: 'edit', component: DocumentEditComponent },
                            { path: 'condition', component: DocumentConditionComponent },
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: 'image', children: [
            { path: '', component: ImageListComponent },
            { path: ':id/edit', component: ImageEditComponent },
            { path: 'add', component: ImageAddComponent }
        ]
    },
    {
        path: 'trainBase', children: [
            { path: '', component: TrainBaseInfoComponent },
            { path: ':id/edit', component: TrainBaseEditComponent },
            { path: 'add', component: TrainBaseAddComponent },
        ]
    },
    {
        path: 'teacher', children: [
            { path: '', component: TeacherListComponent },
            { path: 'extend', component: TeacherExtendAddComponent },
            { path: ':id/extend', component: TeacherExtendEditComponent },
            { path: 'internal', component: TeacherInternalAddComponent },
            { path: ':id/internal', component: TeacherInternalEditComponent },
            { path: 'qualification', component: TeacherQualificationComponent },
            { path: 'qualification/add', component: TeacherQualificationAddComponent },
            { path: 'qualification/:id/edit', component: TeacherQualificationEditComponent },
            { path: 'qualification/import', component: TeacherQualificationImportComponent },
            {
                path: 'main', component: TeacherMainComponent, children: [
                    { path: '', redirectTo: 'fulltime', pathMatch: 'full' },
                    { path: 'fulltime', component: TeacherFulltimeComponent },
                    { path: 'fulltime/:id/edit', component: TeacherFulltimeEditComponent },
                    { path: 'parttime', component: TeacherParttimeComponent },
                    { path: 'parttime/add', component: TeacherParttimeAddComponent },
                    { path: 'parttime/import', component: TeacherParttimeImportComponent },
                    { path: 'parttime/:id/edit', component: TeacherParttimeEditComponent },
                    { path: 'external', component: TeacherExternalComponent },
                    { path: 'external/add', component: TeacherExternalAddComponent },
                    { path: 'external/:id/edit', component: TeacherExternalEditComponent },
                    { path: 'preview/:documentInfoId', component: PdfLookComponent },
                ]
            },
            { path: 'grant', component: TeacherGrantComponent },
            { path: 'employment/documents', component: EmploymentDocumentsListComponent },
            { path: 'employment/documents/preview/:documentInfoId', component: PdfLookComponent },
            { path: 'add', component: EmploymentDocumentsAddComponent }
        ]
    },
    {
        path: 'case', children: [
            { path: '', component: CaseListComponent },
            { path: 'list', component: CaseListComponent },
            { path: 'add', component: CaseAddComponent },
            { path: ':id/edit', component: CaseEditComponent },
            { path: ':id/info', component: CaseInfoComponent },
            { path: 'import', component: CaseImportComponent },
        ]
    },
    {
        path: 'certificate', children: [
            { path: '', component: CertificateListComponent },
            { path: 'template/:id', component: DragBoxComponent },
            { path: 'add', component: CertificateAddComponent },
            { path: ':id/edit', component: CertificateEditComponent },
        ]
    },
    {
        path: 'barfile', component: BarfileComponent, children: [
            { path: '', redirectTo: 'headofficefile', pathMatch: 'full' },
            { path: 'headofficefile', component: HeadofficefileComponent },
            { path: 'headofficemessage', component: HeadofficemessageComponent },
            { path: 'headofficematerialtemplate', component: HeadofficematerialtemplateComponent },
            { path: 'educationsystem', component: HeadofficeeducationComponent },
            { path: 'headofficecalendar', component: HeadofficecalendarComponent },
            { path: ':barfileId', component: BarfilechooseugComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LibraryRoutingModule { }

export const routedComponents = [
    DocumentListComponent,
    DocumentAddComponent,
    DocumentFormComponent,
    DocumentEditComponent,
    TrainBaseInfoComponent,
    TrainBaseAddComponent,
    TrainBaseFormComponent,
    TrainBaseEditComponent,
    ImageListComponent,
    ImageEditComponent,
    ImageAddComponent,
    ImageFormComponent,
    TeacherListComponent,
    TeacherExtendAddComponent,
    TeacherExtendFormComponent,
    TeacherExtendEditComponent,
    TeacherUserFormComponent,
    TeacherInternalAddComponent,
    TeacherInternalFormComponent,
    TeacherInternalEditComponent,
    CaseListComponent,
    CaseAddComponent,
    CaseFormComponent,
    CaseEditComponent,
    CaseInfoComponent,
    CaseImportComponent,
    CertificateListComponent,
    DragBoxComponent,
    CertificateAddComponent,
    CertificateEditComponent,
    DocumentDetailComponent,
    CaseCiteLookupComponent,
    DocumentConditionComponent,
    TeacherQualificationComponent,
    TeacherMainComponent,
    TeacherGrantComponent,
    TeacherQualificationFormComponent,
    TeacherQualificationAddComponent,
    TeacherQualificationEditComponent,
    TeacherFulltimeComponent,
    TeacherParttimeComponent,
    TeacherExternalComponent,
    TeacherParttimeFormComponent,
    TeacherParttimeAddComponent,
    TeacherParttimeEditComponent,
    TeacherExternalAddComponent,
    TeacherExternalEditComponent,
    TeacherExternalFormComponent,
    TeacherCourseLookupComponent,
    TeacherCourseLookComponent,
    TeacherFulltimeEditComponent,
    TeacherFulltimeFormComponent,
    EmploymentDocumentsListComponent,
    DocumentsTeacherLookComponent,
    TrainLocationLookComponent,
    // TrainLocationAddComponent,
    EmploymentDocumentsAddComponent,
    PdfLookComponent,
    TeacherQualificationImportComponent,
    TeacherInformationListComponent,
    TeacherBaseInformationComponent,
    QualificationComponent,
    RecordComponent,
    TeacherExtFromComponent,
    TeacherInnerFormComponent,
    TeacherParttimeImportComponent,
    BarfileComponent,
    HeadofficefileComponent,
    HeadofficemessageComponent,
    HeadofficematerialtemplateComponent,
    HeadofficeeducationComponent,
    HeadofficecalendarComponent,
    BarfilechooseugComponent
];

import { ResearchComponent } from './research.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SteplistComponent } from './steplist/steplist.component';
import { SetpeditComponent } from './setpedit/setpedit.component';
import { EditcreateComponent } from 'app/managementhours/hourconfiguration/views/editcreate/editcreate.component';
import { StepDetailResolver } from './service/research-resover.service';
import { StageResolver } from './service/stage-resover.service';
import { StageaddComponent } from './stageadd/stageadd.component';
import { StageEditComponent } from './stage-edit/stage-edit.component';
import { StepresearchComponent } from './stepresearch/stepresearch.component';
import { ResearchmessgaeComponent } from './stepresearch/researchmessgae/researchmessgae.component';
import { ResearchstaffingComponent } from './stepresearch/researchstaffing/researchstaffing.component';
import { ResearchfeemanageComponent } from './stepresearch/researchfeemanage/researchfeemanage.component';
import { ResearchachievementsComponent } from './stepresearch/researchachievements/researchachievements.component';
import { ResearchassessmentComponent } from './stepresearch/researchassessment/researchassessment.component';
import { StaffconfigComponent } from './stepresearch/researchstaffing/staffconfig/staffconfig.component';
import { TeacherconfigComponent } from './stepresearch/researchstaffing/teacherconfig/teacherconfig.component';
import { CourseconfigComponent } from './stepresearch/researchstaffing/courseconfig/courseconfig.component';
import { NoticelistComponent } from './noticelist/noticelist.component';
import { NoticeaddComponent } from './noticeadd/noticeadd.component';
// tslint:disable-next-line:max-line-length
import { TrainingClassMessagesPersonsComponent } from './noticeadd/training-class-messages-persons/training-class-messages-persons.component';
import { PdfLookComponent } from './pdf-look/pdf-look.component';
import {UserTeacherImportComponent} from './stepresearch/researchstaffing/user-teacher-import/user-teacher-import.component';

const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    {
        path: 'list', component: ResearchComponent
    },
    {
        path: ':id/steplist', component: SteplistComponent,
    },
    { path: ':id/steplist/addstage', component: StageaddComponent },
    { path: ':id/steplist/:editId/editstage', component: StageEditComponent, resolve: { stageData: StageResolver } },
    { path: ':id/edit', component: SetpeditComponent, resolve: { stepData: StepDetailResolver } },
    { path: ':id/steplist/:stepId/stepdetail', component: StepresearchComponent },
    { path: ':id/steplist/:stepId/noticelist/:messageBoxId', component: NoticelistComponent },
    { path: ':id/steplist/:stepId/noticelist/:messageBoxId/add', component: NoticeaddComponent },
    { path: 'file/look/:documentInfoId', component: PdfLookComponent },
    { path: ':id/steplist/:stepId/stepdetail/import', component: UserTeacherImportComponent }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [StepDetailResolver, StageResolver]
})
export class ResearchRoutingModule { }

export const routedComponents = [
    ResearchComponent,
    SteplistComponent,
    SetpeditComponent,
    StageaddComponent,
    StageEditComponent,
    StepresearchComponent,
    ResearchmessgaeComponent,
    ResearchstaffingComponent,
    ResearchfeemanageComponent,
    ResearchachievementsComponent,
    ResearchassessmentComponent,
    StaffconfigComponent,
    TeacherconfigComponent,
    CourseconfigComponent,
    PdfLookComponent,
    NoticelistComponent,
    NoticeaddComponent,
    TrainingClassMessagesPersonsComponent,
    UserTeacherImportComponent

];

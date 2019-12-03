import { OfficeTeacherAssessComponent } from './views/training-class-office/office-teacher-assess/office-teacher-assess.component';
import { TrainingClassCourseForumResolver } from './../service/training-class-course-forum-Resolver.service';
import { TrainingClassCourseForumComponent } from './views/training-class-course-forum/training-class-course-forum.component';
import { CaseInfoService } from 'app/library/service/case.service';
import { TrainingClassMaterialComponent } from './views/training-class-material/training-class-material.component';
import { TrainingClassMaterialResolver } from './service/training-class-material-resolver.service';
import { TrainingClassCourseDetailResolver } from './service/training-class-course-detail-resover.service';
import { TrainingClassCourseComponent } from './views/training-class-course/training-class-course.component';
import { TrainingClassCourseDetailComponent } from './views/training-class-course-detail/training-class-course-detail.component';

import { TrainingClassEditComponent } from './views/training-class-edit/training-class-edit.component';
import { TrainingClassDetailComponent } from './views/training-class-detail/training-class-detail.component';
import { TrainingClassAddComponent } from './views/training-class-add/training-class-add.component';
import { TrainingClassListComponent } from './views/training-class-list/training-class-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingClassDetailResolver } from './service/training-class-detail-resolver.service';
import { TrainingClassDetailNewResolver } from './service/training-class-detailnew-resolver.service';
import { TrainingClassPreviewComponent } from './views/training-class-preview/training-class-preview.component';
import { TrainingClassConditionComponent } from './views/training-class-condition/training-class-condition.component';
import { TrainingClassScoreStrategyComponent } from './views/training-class-score-strategy/training-class-score-strategy.component';
import { TrainingClassPerformenceComponent } from './views/training-class-performence/training-class-performence.component';
import { TrainingClassMessagesComponent } from './views/training-class-messages/training-class-messages.component';
// tslint:disable-next-line:max-line-length
import { TrainingClassMessagesAddComponent } from './views/training-class-messages/training-class-messages-add/training-class-messages-add.component';
import { TrainingClassMessagesInfoComponent } from './views/training-class-messages/training-class-messages-info/training-class-messages-info.component';
import { TrainingClassMessagesPersonsComponent } from './views/training-class-messages/training-class-messages-add/training-class-messages-persons/training-class-messages-persons.component';



import { TrainingClassTrainCourseComponent } from './views/training-class-train-course/training-class-train-course.component';
import { TrainingClassExamArrangeComponent } from './views/training-class-exam-arrange/training-class-exam-arrange.component';
import { TrainingClassSurveyComponent } from './views/training-class-survey/training-class-survey.component';
import { TrainingClassAssessComponent } from './views/training-class-assess/training-class-assess.component';
import { TrainingClassAttendanceComponent } from './views/training-class-attendance/training-class-attendance.component';
// tslint:disable-next-line:max-line-length
import { TrainingClassAttendanceImportComponent } from './views/training-class-attendance-import/training-class-attendance-import.component';
import { TrainingClassAttendanceEditComponent } from './views/training-class-attendance-edit/training-class-attendance-edit.component';
import { OfficeTeacherComponent } from './views/training-class-office/office-teacher/office-teacher.component';
import { TrainingClassCertificateComponent } from './views/training-class-certificate/training-class-certificate.component';
import { TrainingClassResultsComponent } from './views/training-class-performence/training-class-results/training-class-results.component';
// tslint:disable-next-line:max-line-length
import { TrainingClassAchievementComponent } from './views/training-class-performence/training-class-achievement/training-class-achievement.component';
import { TrainingClassPourComponent } from './views/training-class-performence/training-class-pour/training-class-pour.component';

import { AccountService } from 'app/account/service/account.service';
import { TrainingClassCertificateService } from 'app/training/training-class/service/training-class-certificate.service';
import { CertificateService } from "app/library/service/certificate.service";

import { CerticateModalComponent } from './views/training-class-certificate/certicate-modal/certicate-modal.component';
import { TrainingClassNoticeBoxComponent } from './views/training-class-notice-box/training-class-notice-box.component';
// tslint:disable-next-line:max-line-length
import { TrainingClassCourseScorePourComponent } from './views/training-class-performence/training-class-course-score-pour/training-class-course-score-pour.component';
import { TrainingClassBannerComponent } from './views/training-class-banner/training-class-banner.component';
import { TrainingClassEnrollmentComponent } from './views/training-class-enrollment/training-class-enrollment.component';
import { TrainClassAssessmentComponent } from 'app/training/training-class/views/train-class-assessment/train-class-assessment.component';
import { TrainClassAttendanceComponent } from 'app/training/training-class/views/train-class-attendance/train-class-attendance.component';
import { TrainClassAttendancelistComponent } from 'app/training/training-class/views/train-class-attendancelist/train-class-attendancelist.component';
import { TrainClassAttendancenewListComponent } from 'app/training/training-class/views/train-class-attendancenew-list/train-class-attendancenew-list.component';
import { TrainClassAttendancenewPersonComponent } from 'app/training/training-class/views/train-class-attendancenew-person/train-class-attendancenew-person.component';
import { TrainClassClassfileComponent } from 'app/training/training-class/views/train-class-classfile/train-class-classfile.component';
import { TrainClassCostmanagementComponent } from 'app/training/training-class/views/train-class-costmanagement/train-class-costmanagement.component';
import { BasecostComponent } from 'app/training/training-class/views/train-class-costmanagement/basecost/basecost.component';
import { LocaltrafficComponent } from 'app/training/training-class/views/train-class-costmanagement/localtraffic/localtraffic.component';
import { LowerlevelComponent } from 'app/training/training-class/views/train-class-costmanagement/lowerlevel/lowerlevel.component';
import { SharecostComponent } from 'app/training/training-class/views/train-class-costmanagement/sharecost/sharecost.component';
import { TrainClassCourselistComponent } from 'app/training/training-class/views/train-class-courselist/train-class-courselist.component';
import { FeelistComponent } from './views/train-class-costmanagement/sharecost/feelist/feelist.component';
import { TrainingOfficeAssessmentComponent } from 'app/training/training-class/views/training-office-assessment/training-office-assessment.component';
import { TrainingClassTbcbaselistComponent } from 'app/training/training-class/views/training-class-tbcbaselist/training-class-tbcbaselist.component';
import { TrainingClassTbcbaseaddComponent } from 'app/training/training-class/views/training-class-tbcbaseadd/training-class-tbcbaseadd.component';
import { NewcerticateModalComponent } from 'app/training/training-class/views/training-class-newcertificate/newcerticate-modal/newcerticate-modal.component';
import { TrainingClassNewcertificateComponent } from 'app/training/training-class/views/training-class-newcertificate/training-class-newcertificate.component';
import { TrainingAssessmentComponent } from 'app/training/training-class/views/training-assessment/training-assessment.component';
import { TrainClassReglistComponent } from 'app/training/training-class/views/train-class-reglist/train-class-reglist.component';
import { TrainClassRegistrationComponent } from 'app/training/training-class/views/train-class-registration/train-class-registration.component';
import { TrainClassRegaddComponent } from 'app/training/training-class/views/train-class-regadd/train-class-regadd.component';
import { TrainClassPersonmessagelistComponent } from 'app/training/training-class/views/train-class-personmessagelist/train-class-personmessagelist.component';
import { TrainClassEvaluationComponent } from 'app/training/training-class/views/train-class-evaluation/train-class-evaluation.component';

import { TrainClassEndclassmanageComponent } from 'app/training/training-class/views/train-class-endclassmanage/train-class-endclassmanage.component';
import { TrainingClassTeachingManagementComponent } from './views/training-class-teaching-management/training-class-teaching-management.component';
import { TrainDocumentInfromationComponent } from './views/train-document-infromation/train-document-infromation.component';
import { DocumentmessageComponent } from './views/train-document-infromation/documentmessage/documentmessage.component';
import { CoursemessageComponent } from './views/train-document-infromation/coursemessage/coursemessage.component';
import { CaseListComponent } from './views/training-class-case/case-list/case-list.component';
import { CaseAddComponent } from './views/training-class-case/case-add/case-add.component';
import { CaseInfoComponent } from './views/training-class-case/case-info/case-info.component';
import { CaseEditComponent } from './views/training-class-case/case-edit/case-edit.component';
import { OfferingCaseService } from 'app/learning/offering/service/offering-case-api.service';
import { TrainClassCourseImportComponent } from './views/train-class-course-import/train-class-course-import.component';
import { TrainingClassTbcbaseWifilookComponent } from './views/training-class-tbcbase-wifilook/training-class-tbcbase-wifilook.component';
import { TrainingClassTbcbasePicklookComponent } from './views/training-class-tbcbase-picklook/training-class-tbcbase-picklook.component';
import { OfficeTeacherDetailComponent } from './views/training-class-office/office-teacher-detail/office-teacher-detail.component';
import { TrainingClassNewdetailComponent } from './views/training-class-newdetail/training-class-newdetail.component';
import { TrainingClassListNewComponent } from './views/training-class-list-new/training-class-list-new.component';
import { TrainClassCourseNewImportComponent } from './views/train-class-course-new-import/train-class-course-new-import.component';
import { CourseTeacherComponent } from './views/train-class-course-new-import/course-teacher/course-teacher.component';
import { CourseUserComponent } from './views/train-class-course-new-import/course-user/course-user.component';
import { TrainingClassGroupComponent } from 'app/training/training-class/views/training-class-group/training-class-group.component';
// tslint:disable-next-line:max-line-length
import { TrainClassGroupCourseComponent } from 'app/training/training-class/views/train-class-group-course/train-class-group-course.component';

import { AssessAnalysisComponent } from '../../assess/assess-analysis/assess-analysis.component';
import { TrainingClassCourseAddComponent } from './views/training-class-course-add/training-class-course-add.component';
import { TrainingClassForumComponent } from './views/training-class-forum/training-class-forum.component';
import { TrainingClassForumResolver } from '../service/train-class-forum-resolver.service';
import { Course } from '../../learning/course/entity/course';
import { TrainingClassCourseExamResolver } from './service/training-class-course-exam-resolver.service';

import {TeachingRecordsPushComponent} from './views/train-document-infromation/teaching-records-push/teaching-records-push.component';

const routes: Routes = [
    {
        path: '', children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: TrainingClassListNewComponent },
            { path: 'add', component: TrainingClassAddComponent },
            { path: 'preview', component: TrainingClassPreviewComponent },
            {
                path: 'assist',
                children: [
                    {
                        path: ':tbcId', resolve: { trainingClass: TrainingClassDetailNewResolver },
                        children: [
                            { path: '', redirectTo: 'message', pathMatch: 'full' },
                            {
                                path: 'message', children: [
                                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                                    { path: 'list', component: TrainingClassMessagesComponent },
                                    { path: 'add', component: TrainingClassMessagesAddComponent },
                                    { path: ':id/info', component: TrainingClassMessagesInfoComponent },
                                ]
                            },
                            {
                                path: 'exam', resolve: { target: TrainingClassDetailResolver }, children: [
                                    { path: '', loadChildren: 'app/exam/exam-reuse/exam-reuse.module#ExamReuseModule' }
                                ]
                            }
                        ]
                    },

                ]
            },
            {
                path: ':tbcId', component: TrainingClassNewdetailComponent,
                resolve: { trainingClass: TrainingClassDetailNewResolver },
                runGuardsAndResolvers: 'paramsOrQueryParamsChange',
                children: [
                    {
                        path: '', children: [
                            { path: '', redirectTo: 'edit', pathMatch: 'full' },
                            // tslint:disable-next-line:max-line-length
                            { path: 'edit', component: TrainingClassEditComponent, resolve: { trainingClass: TrainingClassDetailNewResolver } },
                            { path: 'office-teacher', component: OfficeTeacherComponent },
                            { path: 'office-teacher/:id', component: OfficeTeacherDetailComponent },
                            { path: 'office-teacher/:id/assess/:courseId', component: OfficeTeacherAssessComponent },
                            { path: 'condition', component: TrainingClassConditionComponent },
                            {
                                path: 'tbcbase', children: [
                                    { path: '', component: TrainingClassTbcbaselistComponent },
                                    { path: 'add', component: TrainingClassTbcbaseaddComponent },
                                ]
                            },
                            { path: 'score_strategy', component: TrainingClassScoreStrategyComponent },
                            {
                                path: 'performence', children: [
                                    { path: '', component: TrainingClassPerformenceComponent },
                                    { path: 'course-pour', component: TrainingClassCourseScorePourComponent, },
                                ]
                            },
                            { path: 'pour', component: TrainingClassPourComponent, },
                            {
                                path: 'endclassmanage', component: TrainClassEndclassmanageComponent,
                                resolve: { target: TrainingClassMaterialResolver },
                            },
                            {
                                path: 'classfile', component: TrainClassClassfileComponent
                            },
                            {
                                path: 'attendance', children: [
                                    { path: '', component: TrainingClassAttendanceComponent },
                                    { path: 'list', component: TrainingClassAttendanceComponent },
                                    { path: 'import', component: TrainingClassAttendanceImportComponent },
                                    { path: ':attendanceId/edit', component: TrainingClassAttendanceEditComponent }
                                ]
                            },
                            {
                                path: 'messages', children: [
                                    { path: '', component: TrainingClassMessagesComponent },
                                    { path: 'add', component: TrainingClassMessagesAddComponent },
                                    { path: ':id/info', component: TrainingClassMessagesInfoComponent },
                                ]
                            },
                            // { path: 'train_course', component: TrainingClassCourseComponent },
                            {
                                path: 'courses', children: [
                                    { path: '', component: TrainingClassCourseComponent },
                                    { path: 'import', component: TrainClassCourseNewImportComponent },
                                    { path: 'add', component: TrainingClassCourseAddComponent },
                                    { path: 'group', component: TrainClassGroupCourseComponent },
                                    {
                                        path: ':courseId', component: TrainingClassCourseDetailComponent,
                                        resolve: { course: TrainingClassCourseDetailResolver },
                                        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
                                        children: [
                                            // tslint:disable-next-line:max-line-length
                                            { path: '', loadChildren: 'app/learning/course/course-info/course-info.module#CourseInfoModule', data: {type: 'CLASSROOM_COURSE'} },
                                        ]
                                    },
                                    {
                                        path: ':courseId/exam', resolve: { target: TrainingClassCourseExamResolver }, children: [
                                            { path: '', loadChildren: 'app/exam/exam-course/exam-course.module#ExamCourseModule' }
                                        ]
                                    },
                                    {
                                        path: ':courseId/forum', resolve: { course: TrainingClassCourseDetailResolver },
                                        component: TrainingClassCourseForumComponent, children: [
                                            // tslint:disable-next-line:max-line-length
                                            { path: '', loadChildren: 'app/forum/ordinary-forum/ordinary-forum.module#OrdinaryForumModule', resolve: { forum: TrainingClassCourseForumResolver }, },
                                        ]
                                    },
                                ]
                            },
                            {
                                path: 'exam', resolve: { target: TrainingClassDetailResolver }, data: {type: 'TRAININGCLASS'}, children: [
                                    { path: '', loadChildren: 'app/exam/exam-reuse/exam-reuse.module#ExamReuseModule' }
                                ]
                            },

                            { path: 'certificate', component: TrainingClassCertificateComponent },
                            {
                                path: 'survey', children: [
                                    { path: '', component: TrainingClassSurveyComponent },
                                    { path: ':paperId/analysis', component: AssessAnalysisComponent }
                                ]
                            },
                            {
                                path: 'assess', children: [
                                    { path: '', component: TrainingClassAssessComponent },
                                    { path: ':paperId/analysis', component: AssessAnalysisComponent }
                                ]
                            },
                            { path: 'notice-box', component: TrainingClassNoticeBoxComponent },
                            {
                                path: 'attendancemessage', component: TrainClassAttendanceComponent, children: [
                                    // { path: '', redirectTo: 'courselist', pathMatch: 'full' },
                                    // { path: 'courselist', component: TrainClassCourselistComponent },
                                    // { path: 'attendancelist/:courseid', component: TrainClassAttendancelistComponent },
                                    // { path: 'personmessagelist/:personid', component: TrainClassPersonmessagelistComponent }
                                    { path: '', redirectTo: 'attendancelist', pathMatch: 'full' },
                                    { path: 'attendancelist', component: TrainClassAttendancenewListComponent },
                                    { path: 'personmessagelist/:personid', component: TrainClassAttendancenewPersonComponent }

                                ]
                            },
                            {
                                path: 'authorizedregistration', component: TrainClassRegistrationComponent, children: [
                                    { path: '', redirectTo: 'registrationlist', pathMatch: 'full' },
                                    { path: 'registrationlist', component: TrainClassReglistComponent },
                                    { path: 'registrationadd', component: TrainClassRegaddComponent }
                                ]
                            },
                            {
                                path: 'materials',
                                resolve: { target: TrainingClassMaterialResolver },
                                component: TrainingClassMaterialComponent,
                                // children: [
                                //     { path: '', loadChildren: 'app/learning/material/material.module#MaterialModule' }
                                // ]
                            },
                            { path: 'banner', component: TrainingClassBannerComponent },
                            {
                                path: 'case', children: [
                                    { path: '', component: CaseListComponent },
                                    { path: 'list', component: CaseListComponent },
                                    { path: 'add', component: CaseAddComponent },
                                    { path: ':id/edit', component: CaseEditComponent },
                                    { path: ':id/info', component: CaseInfoComponent },
                                ]
                            },
                            { path: 'enrollment', component: TrainingClassEnrollmentComponent },
                            {
                                path: 'forum', component: TrainingClassForumComponent, children: [
                                    // tslint:disable-next-line:max-line-length
                                    { path: '', loadChildren: 'app/forum/ordinary-forum/ordinary-forum.module#OrdinaryForumModule', resolve: { forum: TrainingClassForumResolver }, },
                                ]
                            },
                        ]
                    }
                ]
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        TrainingClassDetailResolver,
        AccountService,
        TrainingClassCertificateService,
        CertificateService,
        TrainingClassCourseDetailResolver,
        TrainingClassMaterialResolver,
        TrainingClassDetailNewResolver,
        OfferingCaseService,
        CaseInfoService,
        TrainingClassForumResolver,
        TrainingClassCourseForumResolver,
        TrainingClassCourseExamResolver,
    ]
})
export class TrainingClassRoutingModule { }

export const routedComponents = [
    TrainingClassListComponent,
    TrainingClassAddComponent,
    TrainingClassDetailComponent,
    TrainingClassEditComponent,
    TrainingClassPreviewComponent,
    TrainingClassConditionComponent,
    TrainingClassScoreStrategyComponent,
    TrainingClassPerformenceComponent,
    TrainingClassAttendanceComponent,
    TrainingClassAttendanceImportComponent,
    TrainingClassAttendanceEditComponent,
    TrainingClassMessagesComponent,
    TrainingClassMessagesAddComponent,
    TrainingClassMessagesInfoComponent,
    TrainingClassMessagesPersonsComponent,
    TrainingClassTrainCourseComponent,
    TrainingClassExamArrangeComponent,
    TrainingClassSurveyComponent,
    TrainingClassAssessComponent,
    OfficeTeacherComponent,
    TrainingClassCertificateComponent,
    TrainingClassResultsComponent,
    TrainingClassAchievementComponent,
    TrainingClassPourComponent,
    CerticateModalComponent,
    TrainingClassNoticeBoxComponent,
    TrainingClassCourseComponent,
    TrainingClassCourseDetailComponent,
    TrainingClassCourseScorePourComponent,
    TrainingClassMaterialComponent,
    TrainingClassBannerComponent,
    TrainingClassEnrollmentComponent,
    TrainingClassTbcbaseWifilookComponent,
    TrainClassAssessmentComponent,
    TrainClassAttendanceComponent,
    TrainClassAttendancelistComponent,
    TrainClassAttendancenewListComponent,
    TrainClassAttendancenewPersonComponent,
    TrainClassClassfileComponent,
    TrainClassCostmanagementComponent,
    BasecostComponent,
    LocaltrafficComponent,
    LowerlevelComponent,
    SharecostComponent,
    TrainClassCourselistComponent,
    TrainClassEndclassmanageComponent,
    TrainClassEvaluationComponent,
    TrainClassPersonmessagelistComponent,
    TrainClassRegaddComponent,
    TrainClassRegistrationComponent,
    TrainClassReglistComponent,
    TrainingAssessmentComponent,
    TrainingClassNewcertificateComponent,
    NewcerticateModalComponent,
    TrainingClassTbcbaseaddComponent,
    TrainingClassTbcbaselistComponent,
    TrainingOfficeAssessmentComponent,
    TrainingClassTeachingManagementComponent,
    TrainDocumentInfromationComponent,
    DocumentmessageComponent,
    CoursemessageComponent,
    CaseListComponent,
    CaseAddComponent,
    CaseEditComponent,
    CaseInfoComponent,
    FeelistComponent,
    TrainingClassTbcbasePicklookComponent,
    TrainClassCourseImportComponent,
    TrainingClassNewdetailComponent,
    TrainingClassListNewComponent,
    TrainClassCourseNewImportComponent,
    CourseTeacherComponent,
    CourseUserComponent,
    TrainingClassForumComponent,
    TrainingClassCourseForumComponent,
    TeachingRecordsPushComponent
];

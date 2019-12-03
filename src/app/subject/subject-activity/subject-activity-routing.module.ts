import { AssessAnalysisComponent } from './../../assess/assess-analysis/assess-analysis.component';
import { SubjectActivityCourseForumComponent } from './views/subject-activity-course-forum/subject-activity-course-forum.component';
import { SubjectForumResolver } from './service/subject-forum-resolver.service';
import { SubjectActivityForumComponent } from './views/subject-activity-forum/subject-activity-forum.component';
import { SubjectActivityAssessComponent } from './../subject-activity/views/subject-activity-assess/subject-activity-assess.component';
import { SubjectActivitySurveyComponent } from './../subject-activity/views/subject-activity-survey/subject-activity-survey.component';
import { CaseEditComponent } from './views/subject-case/case-edit/case-edit.component';
import { CaseAddComponent } from './views/subject-case/case-add/case-add.component';
import { CaseListComponent } from './views/subject-case/case-list/case-list.component';
import { SubjectConditionComponent } from './views/subject-condition/subject-condition.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectActivityListComponent } from './views/subject-activity-list/subject-activity-list.component';
import { SubjectActivityDetailComponent } from './views/subject-activity-detail/subject-activity-detail.component';
import { SubjectActivityDetailResolver } from './service/subject-activity-detail-resolver.service';
import { SubjectActivityAddComponent } from './views/subject-activity-add/subject-activity-add.component';
import { SubjectActivityEditComponent } from './views/subject-activity-edit/subject-activity-edit.component';
import { AccountService } from '../../account/service/account.service';
// tslint:disable-next-line:max-line-length
import { SubjectActivityMaterialsComponent } from '../../subject/subject-activity/views/subject-activity-materials/subject-activity-materials.component';
import { SubjectEnrollmentComponent } from './views/subject-enrollment/subject-enrollment.component';
// tslint:disable-next-line:max-line-length
import { SubjectActivityCourseComponent } from '../../subject/subject-activity/views/subject-activity-course/subject-activity-course.component';
// tslint:disable-next-line:max-line-length
import { SubjectActivityCourseDetailComponent } from 'app/subject/subject-activity/views/subject-activity-course-detail/subject-activity-course-detail.component';
import { SubjectActivityCourseDetailResolver } from 'app/subject/subject-activity/service/subject-activity-course-detail-resover.service';
import { CaseInfoComponent } from './views/subject-case/case-info/case-info.component';
// tslint:disable-next-line:max-line-length
import { SubjectActivityContentComponent } from 'app/subject/subject-activity/views/subject-activity-content/subject-activity-content.component';
import { SubjectActivityComponentComponent } from 'app/subject/subject-activity/views/subject-activity-component/subject-activity-component.component';
import { SubjcetActivityNoticeBoxComponent } from './views/subject-activity-notice-box/subject-activity-notice-box.component';
import { SubjectActivityCourseGroupComponent } from './views/subject-activity-course-group/subject-activity-course-group.component';
import { SubjectActivityCourseForumResolver } from './service/subject-activity-course-forum-Resolver.service';
import { SubjectActivityCourseExamResolver } from './service/subject-activity-course-exam-resolver.service';
const routes: Routes = [
    {
        path: '', children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: SubjectActivityListComponent },
            { path: 'add', component: SubjectActivityAddComponent },
            {
                path: ':subjectId', component: SubjectActivityDetailComponent,
                resolve: { subjectActivity: SubjectActivityDetailResolver },
                runGuardsAndResolvers: 'paramsOrQueryParamsChange',
                children: [
                    {
                        path: '', children: [
                            { path: '', redirectTo: 'edit', pathMatch: 'full' },
                            { path: 'edit', component: SubjectActivityEditComponent },
                            { path: 'condition', component: SubjectConditionComponent },
                            { path: 'content', component: SubjectActivityContentComponent },
                            { path: 'component', component: SubjectActivityComponentComponent },
                            { path: 'enrollment', component: SubjectEnrollmentComponent },
                            {
                                path: 'exam', resolve: { target: SubjectActivityDetailResolver }, data: {type: 'SUBJECT'}, children: [
                                    { path: '', loadChildren: 'app/exam/exam-reuse/exam-reuse.module#ExamReuseModule' }
                                ]
                            },
                            { path: 'materials', component: SubjectActivityMaterialsComponent },
                            // { path: 'survey', component: SubjectActivitySurveyComponent },
                            {
                                path: 'survey', children: [
                                    { path: '', component: SubjectActivitySurveyComponent },
                                    { path: ':paperId/analysis', component: AssessAnalysisComponent }
                                ]
                            },
                           // { path: 'assess', component: SubjectActivityAssessComponent },
                            {
                                path: 'assess', children: [
                                    { path: '', component: SubjectActivityAssessComponent },
                                    { path: ':paperId/analysis', component: AssessAnalysisComponent }
                            ]
                            },
                            {
                                path: 'courses', children: [
                                    { path: '', component: SubjectActivityCourseComponent },
                                    { path: 'group', component: SubjectActivityCourseGroupComponent },
                                    {
                                        path: ':courseId', component: SubjectActivityCourseDetailComponent,
                                        resolve: { course: SubjectActivityCourseDetailResolver },
                                        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
                                        children: [
                                            // tslint:disable-next-line:max-line-length
                                            { path: '', loadChildren: 'app/learning/course/course-info/course-info.module#CourseInfoModule' , data: {type: 'SUBJECT_COURSE'}},
                                        ]
                                    },
                                    {
                                        path: ':courseId/exam', resolve: { target: SubjectActivityCourseExamResolver }, children: [
                                            { path: '', loadChildren: 'app/exam/exam-course/exam-course.module#ExamCourseModule' }
                                        ]
                                    },
                                    {
                                        path: ':courseId/forum', resolve: { course: SubjectActivityCourseDetailResolver },
                                        component: SubjectActivityCourseForumComponent, children: [
                                            // tslint:disable-next-line:max-line-length
                                            { path: '', loadChildren: 'app/forum/ordinary-forum/ordinary-forum.module#OrdinaryForumModule', resolve: { forum: SubjectActivityCourseForumResolver }, },
                                        ]
                                    },
                                ]
                            },
                            {
                                path: 'case', children: [
                                    { path: '', component: CaseListComponent },
                                    { path: 'list', component: CaseListComponent },
                                    { path: 'add', component: CaseAddComponent },
                                    { path: ':id/edit', component: CaseEditComponent },
                                    { path: ':id/info', component: CaseInfoComponent },
                                ]
                            },
                            { path: 'notice-box', component: SubjcetActivityNoticeBoxComponent },
                            {
                                path: 'forum', component: SubjectActivityForumComponent, children: [
                                    // tslint:disable-next-line:max-line-length
                                    { path: '', loadChildren: 'app/forum/ordinary-forum/ordinary-forum.module#OrdinaryForumModule', resolve: { forum: SubjectForumResolver }, },
                                ]
                            },
                        ]
                    },
                ]
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        AccountService,
        SubjectForumResolver,
        SubjectActivityCourseExamResolver,
    ]
})
export class SubjectActivityRoutingModule { }

export const routedComponents = [
    SubjectActivityListComponent,
    SubjectActivityDetailComponent,
    SubjectConditionComponent,
    SubjectEnrollmentComponent,
    CaseListComponent,
    CaseAddComponent,
    CaseEditComponent,
    CaseInfoComponent,
    SubjcetActivityNoticeBoxComponent,
    SubjectActivityCourseGroupComponent,
    SubjectActivityForumComponent,
    SubjectActivityCourseForumComponent,
];

import { ClassroomForumResolver } from './service/classroom-forum-resolver.service';
import { ClassroomEnrollmentComponent } from './views/classroom-enrollment/classroom-enrollment.component';
import { ClassroomLinkComponent } from './views/classroom-link/classroom-link.component';
import { OfferingRecommendComponent } from './../offering/views/offering-recommend/offering-recommend.component';
import { ClassroomCourseResolver } from './service/classroom-course-resolver.service';
import { ClassroomCourseComponent } from './views/classroom-course/classroom-course.component';
import { ClassroomForumComponent } from './views/classroom-forum/classroom-forum.component';
import { ClassroomPerformanceComponent } from './views/classroom-performance/classroom-performance.component';
import { ClassroomNoticeBoxComponent } from './views/classroom-notice-box/classroom-notice-box.component';
import { ClassroomConditionComponent } from './views/classroom-condition/classroom-condition.component';
import { ClassroomDetailResolver } from './service/classroom-detail-resolver.service';
import { ClassroomEditComponent } from './views/classroom-edit/classroom-edit.component';
import { ClassroomDetailComponent } from './views/classroom-detail/classroom-detail.component';
import { ClassroomAddComponent } from './views/classroom-add/classroom-add.component';
import { ClassroomListComponent } from './views/classroom-list/classroom-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseListComponent } from 'app/learning/classroom/views/classroom-case/case-list/case-list.component';
import { CaseAddComponent } from 'app/learning/classroom/views/classroom-case/case-add/case-add.component';
import { CaseEditComponent } from './views/classroom-case/case-edit/case-edit.component';
import { CaseInfoComponent } from 'app/learning/classroom/views/classroom-case/case-info/case-info.component';
import { ClassroomLearningComponent } from 'app/learning/classroom/views/classroom-learning/classroom-learning.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ClassroomListComponent },
  { path: 'add', component: ClassroomAddComponent },
  { path: 'link', component: ClassroomLinkComponent },
  { path: 'recommend', component: OfferingRecommendComponent },
  { path: 'status', component: ClassroomLearningComponent },
  {
    path: ':id', component: ClassroomDetailComponent, resolve: { classroom: ClassroomDetailResolver, course: ClassroomCourseResolver },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    children: [
      {
        path: '', children: [
          { path: '', redirectTo: 'edit', pathMatch: 'full' },
          { path: 'edit', component: ClassroomEditComponent },
          {
            path: 'courseInfo', component: ClassroomCourseComponent, children: [
              // tslint:disable-next-line:max-line-length
              { path: '', loadChildren: 'app/learning/course/course-info/course-info.module#CourseInfoModule' }
            ]
          },
          { path: 'condition', component: ClassroomConditionComponent },
          { path: 'enrollment', component: ClassroomEnrollmentComponent },
          { path: 'performance', component: ClassroomPerformanceComponent },
          {
            path: 'forum', component: ClassroomForumComponent, children: [
              // tslint:disable-next-line:max-line-length
              { path: '' , loadChildren: 'app/forum/ordinary-forum/ordinary-forum.module#OrdinaryForumModule', resolve: { forum: ClassroomForumResolver}, },
            ]
          },
          { path: 'notice-box', component: ClassroomNoticeBoxComponent },
          {
            path: 'case', children: [
              { path: '', component: CaseListComponent },
              { path: 'list', component: CaseListComponent },
              { path: 'add', component: CaseAddComponent },
              { path: ':caseId/edit', component: CaseEditComponent },
              { path: ':caseId/info', component: CaseInfoComponent },
            ]
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ClassroomDetailResolver, ClassroomCourseResolver, ClassroomForumResolver]
})
export class ClassroomRoutingModule { }

export const routedComponents = [
  ClassroomListComponent,
  ClassroomAddComponent,
  ClassroomDetailComponent,
  ClassroomEditComponent,
  ClassroomCourseComponent,
  ClassroomConditionComponent,
  ClassroomPerformanceComponent,
  ClassroomForumComponent,
  ClassroomNoticeBoxComponent,
  ClassroomLinkComponent,
  ClassroomEnrollmentComponent,
  CaseListComponent,
  CaseAddComponent,
  CaseEditComponent,
  CaseInfoComponent
];

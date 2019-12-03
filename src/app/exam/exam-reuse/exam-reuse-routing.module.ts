/*
 * @Author: majunfeng
 * @Date: 2017-11-02 18:25:35
 * @Last Modified by: longping
 * @Last Modified time: 2018-05-11 10:33:11
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExamListComponent } from './views/exam-list/exam-list.component';
import { ExamAddComponent } from './views/exam-add/exam-add.component';
import { ExamEditComponent } from './views/exam-edit/exam-edit.component';
import { ExamAllotComponent } from './views/exam-allot/exam-allot.component';
import { ExamGradeComponent } from './views/exam-grade/exam-grade.component';
import { ExamDetailResolver } from './service/examination-resolver';
import { ExamPersonComponent } from './views/exam-person/exam-person.component';
import { ExamInfoComponent } from './views/exam-info/exam-info.component';
import { CanDeactivateGuard } from '../service/can-deactivate-guard.service';
import { ExamReviewComponent } from './views/exam-review/exam-review.component';
import { ReviewPapersFrameComponent } from './views/review-papers-frame/review-papers-frame.component';
import { ExamReuseTargetResolver } from './service/exam-reuse-target-resolver.service';
import { ExamDetailComponent } from './views/exam-detail/exam-detail.component';
import { ExamNewAllotComponent } from "./views/exam-new-allot/exam-new-allot.component";

export const routes: Routes = [
    {
        path: '', resolve: { targetInfo: ExamReuseTargetResolver }, children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: ExamListComponent },
            { path: 'add', component: ExamAddComponent },
            {
                path: ':exam_id', component: ExamDetailComponent, resolve: { examination: ExamDetailResolver }, children: [
                    {
                        path: '', children: [
                            // { path: '', redirectTo: 'add', pathMatch: 'full' },
                            { path: '', component: ExamEditComponent },
                            { path: 'allot', component: ExamAllotComponent },
                            { path: "newAllot", component: ExamNewAllotComponent },
                            { path: 'person', component: ExamPersonComponent },
                            { path: 'grade', component: ExamGradeComponent },
                            { path: 'info', component: ExamInfoComponent, canDeactivate: [CanDeactivateGuard] },
                            { path: 'review', component: ExamReviewComponent },
                        ]
                    },
                ]
            },
            {
                path: 'papers/:uceId', component: ReviewPapersFrameComponent
            },
            { path: 'allot', component: ExamAllotComponent },
            { path: 'grade', component: ExamGradeComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [ExamReuseTargetResolver]
})
export class ExamReuseRoutingModule { }

export const routedComponents = [
    ExamListComponent,
    ExamAddComponent,
    ExamAllotComponent,
    ExamEditComponent,
    ExamGradeComponent,
    ExamPersonComponent,
    ExamInfoComponent,
    ExamReviewComponent
];

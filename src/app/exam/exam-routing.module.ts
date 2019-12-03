/*
 * @Author: mozhengqian
 * @Date: 2017-11-12 12:42:00
 * @Last Modified by: longping
 * @Last Modified time: 2018-05-11 10:03:27
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'examination', pathMatch: 'full' },
    { path: 'basic-setting', loadChildren: 'app/exam/basic-setting/basic-setting.module#BasicSettingModule' },
    { path: 'examination', loadChildren: 'app/exam/examination/examination.module#ExaminationModule' },
    // tslint:disable-next-line:max-line-length
    { path: 'examination-learning', loadChildren: 'app/exam/examinationForLearning/examinationForLearning.module#ExaminationForLearningModule' },
    { path: 'exam-paper', loadChildren: 'app/exam/exam-paper/exam-paper.module#ExamPaperModule' },
    { path: 'test-question', loadChildren: 'app/exam/test-question/test-question.module#TestQuestionModule' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ExamRoutingModule { }
export const routedComponents = [
]

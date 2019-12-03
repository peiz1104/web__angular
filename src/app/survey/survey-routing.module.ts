import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyIndexComponent } from './survey-index/survey-index.component';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { SurveyEditComponent } from './survey-edit/survey-edit.component';
import { SurveyViewComponent } from './survey-view/survey-view.component';
import { SurveySettingsComponent } from './survey-settings/survey-settings.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionViewComponent } from './questions/question-view/question-view.component';
import { ReportComponent } from './report/report.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { SurveyPaperListComponent } from './survey-paper-list/survey-paper-list.component';
import { SurveyPaperEditComponent } from './survey-paper-edit/survey-paper-edit.component';
import { SurveyDetailComponent } from './survey-detail/survey-detail.component';
import { SurveyConditionComponent } from './survey-condition/survey-condition.component';
import { SurveyTplListComponent } from './survey-tpl-list/survey-tpl-list.component';
import { SurveyTplAddComponent } from './survey-tpl-add/survey-tpl-add.component';
import { SurveyTplEditComponent } from './survey-tpl-edit/survey-tpl-edit.component';
import { SurveyTplDetailComponent } from './survey-tpl-detail/survey-tpl-detail.component';
import { SurveyTplPaperComponent } from './survey-tpl-paper/survey-tpl-paper.component';
import { SurveyTplDetailResolver } from './survey-tpl-detail-resolver.service';


const routes: Routes = [
  { path: '', component: SurveyIndexComponent },
  {
    path: 'paper', children: [
      { path: '', component: SurveyListComponent },
      { path: 'add', component: SurveyEditComponent },
      { path: ':id/edit', component: SurveyEditComponent },
      { path: ':id/view', component: QuestionViewComponent },
      { path: ':id/settings', component: SurveySettingsComponent },
      { path: ':id/questions', component: QuestionsComponent },
      { path: ':id/report', component: ReportComponent },
      { path: ':id/enrollment', component: EnrollmentComponent },
    ]
  },
  {
    path: 'tpl', children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: SurveyTplListComponent },
      { path: 'add', component: SurveyTplAddComponent },
      { path: ':id', component: SurveyTplDetailComponent, resolve: {survey: SurveyTplDetailResolver}, children: [
        {path: '' , children: [
          { path: '', redirectTo: 'edit', pathMatch: 'full'},
          { path: 'edit', component: SurveyTplEditComponent},
          { path: 'paper', component: SurveyTplPaperComponent}
          ]}
      ]}
    ]
  },
  {
    path: 'surveyPaper', children: [
      { path: '', component: SurveyPaperListComponent },
      { path: 'add', component: SurveyPaperEditComponent },
      {
        path: ':id', component: SurveyDetailComponent, children: [
          {
            path: 'detail', children: [
              { path: 'condition', component: SurveyPaperEditComponent },
              // { path: 'edit/:id', component: SurveyEditComponent },
              // { path: 'questions/:id', component: QuestionsComponent },
            ]
          }
        ]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    SurveyTplDetailResolver
  ]
})
export class SurveyRoutingModule { }

export const routedComponents = [SurveyIndexComponent];

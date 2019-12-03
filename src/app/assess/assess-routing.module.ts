import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessIndexComponent } from './assess-index/assess-index.component';
import { PaperListComponent } from './paper-list/paper-list.component';
import { PaperEditComponent } from './paper-edit/paper-edit.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionViewComponent } from './questions/question-view/question-view.component';
import { AssessListComponent } from './assess-list/assess-list.component';
import { AssessEditComponent } from './assess-edit/assess-edit.component';
import { AssessDetailComponent } from './assess-detail/assess-detail.component';

const routes: Routes = [
  { path: '', component: AssessIndexComponent },
  {
    path: 'paper', children: [
      { path: '', component: PaperListComponent },
      { path: 'add', component: PaperEditComponent },
      { path: ':id/edit', component: PaperEditComponent },
      { path: ':id/view', component: QuestionViewComponent },
      { path: ':id/questions', component: QuestionsComponent }
    ]
  },
  {
    path: 'assesses', children: [
      { path: '', component: AssessListComponent },
      { path: 'add', component: AssessEditComponent },
      {
        path: ':id', component: AssessDetailComponent, children: [
          {
            path: '', children: [
              { path: 'edit', component: AssessEditComponent },
              // { path: 'edit/:id', component: PaperEditComponent },
              // { path: 'view', component: QuestionViewComponent },
              // { path: 'questions/:id', component: QuestionsComponent }
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
  providers: []
})
export class AssessRoutingModule { }

export const routedComponents = [];

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessIndexComponent } from './assess-index/assess-index.component';
import { AssessListComponent } from './assess-list/assess-list.component';
import { AssessRoutingModule } from './assess-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ConsoleuiModule } from 'console-ui-ng';
import { AssessService } from './assess.service';
import { PaperService } from './paper.service';
import { AssessEditComponent } from './assess-edit/assess-edit.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionsService } from './questions/questions.service';
import { ChoiceComponent } from './questions/choice/choice.component';
import { OptionComponent } from './questions/choice/option/option.component';
import { QuestionActionComponent } from './questions/question-action/question-action.component';
import { QuestionEditComponent } from './questions/question-edit/question-edit.component';
import { ShortAnswerComponent } from './questions/short-answer/short-answer.component';
import { QuestionViewComponent } from './questions/question-view/question-view.component';
import { PaperListComponent } from './paper-list/paper-list.component';
import { PaperEditComponent } from './paper-edit/paper-edit.component';
import { AssessLookupComponent } from './assess-lookup/assess-lookup.component';
import { AssessDetailComponent } from './assess-detail/assess-detail.component';
import { MatrixComponent } from './questions/matrix/matrix.component';
import { MatrixOptionComponent } from './questions/matrix/matrix-option/matrix-option.component';
import { AssessAnalysisComponent } from './assess-analysis/assess-analysis.component';
import { AssessAnswerEchoComponent } from './assess-answer-echo/assess-answer-echo.component';
import { FillBlankComponent } from '../survey/questions/fill-blank/fill-blank.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ConsoleuiModule,
    AssessRoutingModule,
  ],
  exports: [
    AssessEditComponent,
    QuestionsComponent,
    AssessDetailComponent,
    PaperEditComponent
  ],
  providers: [
    AssessService,
    QuestionsService,
    PaperService
  ],
  declarations: [
    AssessIndexComponent,
    AssessListComponent,
    AssessEditComponent,
    QuestionsComponent,
    ChoiceComponent,
    OptionComponent,
    QuestionActionComponent,
    QuestionEditComponent,
    ShortAnswerComponent,
    QuestionViewComponent,
    PaperListComponent,
    PaperEditComponent,
    AssessLookupComponent,
    AssessDetailComponent,
    MatrixComponent,
    MatrixOptionComponent,
    AssessAnalysisComponent,
    AssessAnswerEchoComponent,
  ],
  entryComponents: [
    QuestionViewComponent,
    AssessAnswerEchoComponent,
  ]
})
export class AssessModule { }

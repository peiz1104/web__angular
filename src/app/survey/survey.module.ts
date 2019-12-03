import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ConsoleuiModule } from 'console-ui-ng';
import { SurveyIndexComponent } from './survey-index/survey-index.component';
import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { SurveyEditComponent } from './survey-edit/survey-edit.component';
import { SurveyViewComponent } from './survey-view/survey-view.component';
import { SurveySettingsComponent } from './survey-settings/survey-settings.component';
import { SurveyService } from './survey.service';
import { SurveyPaperService } from './surveyPaper.service';
import { QuestionsComponent } from './questions/questions.component';
import { ReportComponent } from './report/report.component';
import { QuestionsService } from './questions/questions.service';
import { ChoiceComponent } from './questions/choice/choice.component';
import { OptionComponent } from './questions/choice/option/option.component';
import { FillBlankComponent } from './questions/fill-blank/fill-blank.component';
import { QuestionEditComponent } from './questions/question-edit/question-edit.component';
import { QuestionActionComponent } from './questions/question-action/question-action.component';
import { FillOptionComponent } from './questions/fill-blank/fill-option/fill-option.component';
import { MatrixComponent } from './questions/matrix/matrix.component';
import { ParagraphComponent } from './questions/paragraph/paragraph.component';
import { MatrixOptionComponent } from './questions/matrix/matrix-option/matrix-option.component';
import { MatrixFillBlankComponent } from './questions/matrix-fill-blank/matrix-fill-blank.component';
import { MatrixFillOptionComponent } from './questions/matrix-fill-blank/matrix-fill-option/matrix-fill-option.component';
import { QuestionViewComponent } from './questions/question-view/question-view.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { SurveyPaperListComponent } from './survey-paper-list/survey-paper-list.component';
import { SurveyPaperEditComponent } from './survey-paper-edit/survey-paper-edit.component';
import { PaperLookupComponent } from './paper-lookup/paper-lookup.component';
import { SurveyDetailComponent } from './survey-detail/survey-detail.component';
import { SurveyConditionComponent } from './survey-condition/survey-condition.component';
import { OfferingModule } from 'app/learning/offering/offering.module';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { SurveyTplListComponent } from './survey-tpl-list/survey-tpl-list.component';
import { SurveyTplService } from './survey-tpl.service';
import { SurveyTplAddComponent } from './survey-tpl-add/survey-tpl-add.component';
import { SurveyTplDetailComponent } from './survey-tpl-detail/survey-tpl-detail.component';
import { SurveyTplEditComponent } from './survey-tpl-edit/survey-tpl-edit.component';
import { SurveyTplPaperComponent } from './survey-tpl-paper/survey-tpl-paper.component';
import { SurveyTplLookupComponent } from './survey-tpl-lookup/survey-tpl-lookup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ConsoleuiModule,
    SurveyRoutingModule,
    OfferingModule
  ],
  exports: [
    SurveyDetailComponent,
    SurveyPaperEditComponent,
    SurveyEditComponent,
    QuestionsComponent,
    SurveyConditionComponent,
  ],
  declarations: [
    SurveyIndexComponent,
    SurveyListComponent,
    SurveyEditComponent,
    SurveyViewComponent,
    SurveySettingsComponent,
    QuestionsComponent,
    ReportComponent,
    ChoiceComponent,
    OptionComponent,
    FillBlankComponent,
    QuestionEditComponent,
    QuestionActionComponent,
    FillOptionComponent,
    MatrixComponent,
    ParagraphComponent,
    MatrixOptionComponent,
    MatrixFillBlankComponent,
    MatrixFillOptionComponent,
    QuestionViewComponent,
    EnrollmentComponent,
    SurveyPaperListComponent,
    SurveyPaperEditComponent,
    PaperLookupComponent,
    SurveyDetailComponent,
    SurveyConditionComponent,
    SurveyFormComponent,
    SurveyTplListComponent,
    SurveyTplAddComponent,
    SurveyTplDetailComponent,
    SurveyTplEditComponent,
    SurveyTplPaperComponent,
    SurveyTplLookupComponent,
  ],
  providers: [
    SurveyService,
    QuestionsService,
    SurveyPaperService,
    SurveyTplService
  ]
})
export class SurveyModule { }

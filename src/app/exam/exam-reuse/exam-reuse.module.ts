import { TestQuestionService } from './../service/test-question.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ExamReuseRoutingModule, routedComponents } from './exam-reuse-routing.module';
import { ExamMessageComponent } from './public/exam-message/exam-message.component';
import { OfferingModule } from '../../learning/offering/offering.module';
import { ExaminationService } from './service/examination.service';
import { ExamDetailResolver } from './service/examination-resolver';
import { ExamPaperService } from '../service/exam-paper.service';
import { ExaminationManagementService } from '../service/examination.service';
import { SelectPersonComponent } from './public/select-person/select-person.component';
import { InnerHtmlPipePipe } from './pipe/inner-html-pipe.pipe';
import { ViewTestModule } from '../view-test/view-test.module';
import { ExamReviewComponent } from './views/exam-review/exam-review.component';
import { ReviewPapersFrameComponent } from './views/review-papers-frame/review-papers-frame.component';
import { ReviewPapersBoxComponent } from './views/review-papers-box/review-papers-box.component';
import { ReviewAnswerBoxComponent } from './views/review-papers-box/review-answer-box/review-answer-box.component';
import { ExamFormComponent } from './public/exam-form/exam-form.component';
import { ExamDetailComponent } from './views/exam-detail/exam-detail.component';
import { ExamNewAllotComponent } from './views/exam-new-allot/exam-new-allot.component';
import { ExamAddGroupComponent } from './views/exam-add-group/exam-add-group.component';
import { ExamMarkingBoxComponent } from './views/exam-new-allot/exam-marking-box/exam-marking-box.component';
import { ExamNewJkBoxComponent } from './views/exam-new-allot/exam-jk-box/exam-jk-box.component';
import { ExamKaBoxComponent } from './views/exam-new-allot/exam-ka-box/exam-ka-box.component';
import { ExamJkBoxComponent } from './views/exam-allot/exam-jk-box/exam-jk-box.component';
@NgModule({
    imports: [
        SharedModule, ExamReuseRoutingModule, OfferingModule, ViewTestModule
    ],
    exports: [ReviewPapersFrameComponent, ReviewPapersBoxComponent, ReviewAnswerBoxComponent, ...routedComponents],
    declarations: [
        ...routedComponents,
        ExamMessageComponent,
        SelectPersonComponent,
        InnerHtmlPipePipe,
        ExamReviewComponent,
        ReviewPapersFrameComponent,
        ReviewPapersBoxComponent,
        ReviewAnswerBoxComponent,
        ExamFormComponent,
        ExamDetailComponent,
        ExamNewAllotComponent,
        ExamAddGroupComponent,
        ExamMarkingBoxComponent,
        ExamNewJkBoxComponent,
        ExamJkBoxComponent,
        ExamKaBoxComponent
    ],
    providers: [ExaminationService, ExamDetailResolver, ExamPaperService, ExaminationManagementService, TestQuestionService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExamReuseModule { }

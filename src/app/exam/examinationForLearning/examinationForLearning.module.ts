import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ExaminationForLearningRoutingModule, routedComponents } from './examinationForLearning-routing.module';
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
@NgModule({
    imports: [
        SharedModule, ExaminationForLearningRoutingModule, OfferingModule, ViewTestModule
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
        ReviewAnswerBoxComponent
    ],
    providers: [ExaminationService, ExamDetailResolver, ExamPaperService, ExaminationManagementService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExaminationForLearningModule { }

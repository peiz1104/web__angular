import { ExamPublicModule } from './../public/public.module';
import { NgModule } from '@angular/core';
import { SystemPublicModule } from '../../system/public/system-public.module';
import { ExamPaperRoutingModule, routedComponents } from './exam-paper-routing.module';
import { PaperEditScoreComponent } from './views/paper-edit-score/paper-edit-score.component';
import { ExaminationService } from 'app/exam/examination/service/examination.service';
import { ViewTestModule } from 'app/exam/view-test/view-test.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        SystemPublicModule,
        ExamPublicModule,
        ExamPaperRoutingModule,
        ViewTestModule,
        SharedModule
    ],
    exports: [],
    declarations: [...routedComponents, PaperEditScoreComponent],
    providers: [ExaminationService],
})
export class ExamPaperModule { }

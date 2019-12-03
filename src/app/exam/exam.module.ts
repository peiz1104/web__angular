/*
 * @Author: mozhengqian
 * @Date: 2017-11-12 12:41:54
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-02 14:35:15
 */
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
// import { SystemPublicModule } from '../system/public/system-public.module';
import { ExamRoutingModule, routedComponents } from './exam-routing.module';
import { TestQuestionService } from 'app/exam/service/test-question.service';
import { ExamPaperService } from 'app/exam/service/exam-paper.service';
import { BasicSettingService } from 'app/exam/service/basic-setting.service';
import { AccountService } from 'app/account/service/account.service';
import { ViewTestModule } from './view-test/view-test.module';


@NgModule({
    imports: [
        SharedModule,
        ExamRoutingModule,
        ViewTestModule
    ],
    exports: [],
    declarations: [...routedComponents],
    providers: [TestQuestionService, ExamPaperService, BasicSettingService, AccountService],
})
export class ExamModule { }

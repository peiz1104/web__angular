/*
 * @Author: mozhengqian
 * @Date: 2017-11-01 17:52:43
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-02 14:47:24
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TestQuestionRoutingModule, routedComponents } from './test-question-routing.module';
import { TestListComponent } from './views/test-list/test-list.component';
import { TestAddComponent } from './views/test-add/test-add.component';
import { TestLibraryComponent } from './views/test-library/test-library.component';
import { TestJudgmentQuestionsAddComponent } from './views/test-add/test-judgment-questions-add/test-judgment-questions-add.component';
import { TestMatchingQuestionsAddComponent } from './views/test-add/test-matching-questions-add/test-matching-questions-add.component';
import { TestChoiceQuestionsAddComponent } from './views/test-add/test-choice-questions-add/test-choice-questions-add.component';
// tslint:disable-next-line:max-line-length
import { TestShortanswerQuestionsAddComponent } from './views/test-add/test-shortanswer-questions-add/test-shortanswer-questions-add.component';
// tslint:disable-next-line:max-line-length
import { TestCompletionQuestionsAddComponent } from './views/test-add/test-completion-questions-add/test-completion-questions-add.component';
// tslint:disable-next-line:max-line-length
import { TestReadingcomprehensionQuestionsAddComponent } from './views/test-add/test-readingcomprehension-questions-add/test-readingcomprehension-questions-add.component';
// tslint:disable-next-line:max-line-length
import { TestReadingcomprehensionQuestionsListComponent } from './views/test-readingcomprehension-questions-list/test-readingcomprehension-questions-list.component';
import { TestEditComponent } from './views/test-edit/test-edit.component';
import { TestChoiceQuestionsEditComponent } from './views/test-edit/test-choice-questions-edit/test-choice-questions-edit.component';
// tslint:disable-next-line:max-line-length
import { TestCompletionQuestionsEditComponent } from './views/test-edit/test-completion-questions-edit/test-completion-questions-edit.component';
import { TestJudgmentQuestionsEditComponent } from './views/test-edit/test-judgment-questions-edit/test-judgment-questions-edit.component';
import { TestMatchingQuestionsEditComponent } from './views/test-edit/test-matching-questions-edit/test-matching-questions-edit.component';
// tslint:disable-next-line:max-line-length
import { TestReadingcomprehensionQuestionsEditComponent } from './views/test-edit/test-readingcomprehension-questions-edit/test-readingcomprehension-questions-edit.component';
import { TestShortanswerQuestionsEditComponent } from './views/test-edit/test-shortanswer-questions-edit/test-shortanswer-questions-edit.component';
import { TestUploadComponent } from './views/test-upload/test-upload.component';
import { TestHisComponent } from './views/test-his/test-his.component';
import { TestMigrationComponent } from './views/test-migration/test-migration.component';
import { ViewTestModule } from '../view-test/view-test.module';
import { TestSynComponent } from './views/test-syn/test-syn.component';


@NgModule({
    imports: [
        SharedModule,
        TestQuestionRoutingModule,
        ViewTestModule
    ],
    exports: [],
    declarations: [
        ...routedComponents,
        TestListComponent,
        TestAddComponent,
        TestLibraryComponent,
        TestJudgmentQuestionsAddComponent,
        TestMatchingQuestionsAddComponent,
        TestChoiceQuestionsAddComponent,
        TestCompletionQuestionsAddComponent,
        TestShortanswerQuestionsAddComponent,
        TestReadingcomprehensionQuestionsAddComponent,
        TestReadingcomprehensionQuestionsListComponent,
        TestEditComponent,
        TestChoiceQuestionsEditComponent,
        TestCompletionQuestionsEditComponent,
        TestJudgmentQuestionsEditComponent,
        TestMatchingQuestionsEditComponent,
        TestReadingcomprehensionQuestionsEditComponent,
        TestShortanswerQuestionsEditComponent,
        TestUploadComponent,
        TestHisComponent,
        TestMigrationComponent,
        TestSynComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TestQuestionModule { }

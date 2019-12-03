import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BasicSettingRoutingModule, routedComponents } from './basic-setting-routing.module';
import { QuestionTypeListComponent } from './views/question-type-list/question-type-list.component';
import { QuestionTypeAddComponent } from './views/question-type-add/question-type-add.component';
import { QuestionDifficultyListComponent } from './views/question-difficulty-list/question-difficulty-list.component';
import { QuestionDifficultyAddComponent } from './views/question-difficulty-add/question-difficulty-add.component';
import { FieldSettingComponent } from './views/field-setting/field-setting.component';
import { EditFieldComponent } from './views/edit-field/edit-field.component';



@NgModule({
    imports: [
        SharedModule,
        BasicSettingRoutingModule
    ],
    exports: [],
    // tslint:disable-next-line:max-line-length
    declarations: [...routedComponents, QuestionTypeListComponent, QuestionTypeAddComponent, QuestionDifficultyListComponent, QuestionDifficultyAddComponent, FieldSettingComponent, EditFieldComponent],
    providers: [],
})
export class BasicSettingModule { }

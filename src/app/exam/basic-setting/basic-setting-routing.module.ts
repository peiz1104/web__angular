import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionCateListComponent } from './views/question-cate-list/question-cate-list.component';
import { QuestionCateAddComponent } from './views/question-cate-add/question-cate-add.component';
import { QuestionCateEditComponent } from './views/question-cate-edit/question-cate-edit.component';
import { QuestionTypeListComponent } from './views/question-type-list/question-type-list.component';
import { QuestionTypeAddComponent } from './views/question-type-add/question-type-add.component';
import { QuestionDifficultyAddComponent } from './views/question-difficulty-add/question-difficulty-add.component';
import { SettingComponent } from './views/setting/setting.component';
import { EditFieldComponent } from './views/edit-field/edit-field.component';

const routes: Routes = [
    { path: '', redirectTo: 'set', pathMatch: 'full' },
    { path: 'set', component: SettingComponent },
    // { path: 'list', component: QuestionCateListComponent },
    { path: 'add-type', component: QuestionTypeAddComponent },
    { path: 'edit-type/:id', component: QuestionTypeAddComponent },
    { path: 'add-diff', component: QuestionDifficultyAddComponent },
    { path: 'edit-diff/:id', component: QuestionDifficultyAddComponent },
    { path: 'add-field', component: EditFieldComponent },
    { path: 'add-field/:id', component: EditFieldComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BasicSettingRoutingModule { }

export const routedComponents = [
    SettingComponent,
    QuestionCateListComponent,
    QuestionCateAddComponent,
    QuestionCateEditComponent,
    QuestionTypeListComponent,
    QuestionTypeAddComponent,
];

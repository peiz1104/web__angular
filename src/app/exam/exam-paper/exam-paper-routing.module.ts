import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaperHomeComponent } from './views/paper-home/paper-home.component';
import { PaperCreateComponent } from './views/paper-create/paper-create.component';
import { PaperViewComponent } from './views/paper-view/paper-view.component';
import { PaperTakquestionsComponent } from './views/paper-takquestions/paper-takquestions.component';
import { PaperImportComponent } from './views/paper-import/paper-import.component';
import { PaperAddTestComponent } from './views/paper-add-test/paper-add-test.component';
import { PaperRelatedTestComponent } from './views/paper-related-test/paper-related-test.component';
import { PaperStrategyExtractionComponent } from './views/paper-strategy-extraction/paper-strategy-extraction.component';
import { PaperEditComponent } from './views/paper-edit/paper-edit.component';
import { PaperUpdateComponent } from './views/paper-update/paper-update.component';
import { PaperEditScoreComponent } from './views/paper-edit-score/paper-edit-score.component';
import { PaperEditAddtestComponent } from './views/paper-edit-addtest/paper-edit-addtest.component';
import { PaperAllImportComponent } from './views/paper-all-import/paper-all-import.component';
import { PaperPreviewPartitionComponent } from './views/paper-preview-partition/paper-preview-partition.component';


const routes: Routes = [
    {
        path: '', children: [
        ], component: PaperHomeComponent
    },
    { path: 'createpaper', component: PaperCreateComponent },
    { path: 'paperaddtest', component: PaperAddTestComponent },
    {
        path: 'editpaper/:id', children: [
            { path: '', redirectTo: 'updatepaper', pathMatch: 'full' },
            { path: "updatepaper", component: PaperUpdateComponent },
            { path: "addtest", component: PaperEditAddtestComponent }
        ], component: PaperEditComponent
    },
    { path: 'viewpaper/:id', component: PaperViewComponent },
    { path: 'takquestionpaper', component: PaperTakquestionsComponent },
    { path: "editscore", component: PaperEditScoreComponent },
    { path: 'strategyrandom', component: PaperStrategyExtractionComponent },
    { path: 'import', component: PaperImportComponent },
    { path: "volumeimport", component: PaperAllImportComponent },
    { path: 'relatedtest/:id', component: PaperRelatedTestComponent },
    { path: 'previewpartition/:id', component: PaperPreviewPartitionComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ExamPaperRoutingModule { }

export const routedComponents = [
    PaperHomeComponent,
    PaperCreateComponent,
    PaperViewComponent,
    PaperTakquestionsComponent,
    PaperImportComponent,
    PaperAddTestComponent,
    PaperRelatedTestComponent,
    PaperStrategyExtractionComponent,
    PaperEditComponent,
    PaperUpdateComponent,
    PaperEditAddtestComponent,
    PaperAllImportComponent,
    PaperPreviewPartitionComponent,
    PaperEditScoreComponent
];


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingClassListNewComponent } from './views/training-class-list-new/training-class-list-new.component';
import { TrainingClassAddComponent } from './views/training-class-add/training-class-add.component';
import { TrainingClassPreviewComponent } from './views/training-class-preview/training-class-preview.component';
import { TrainingClassDetailNewResolver } from './service/training-class-detailnew-resolver.service';
import { TrainingClassMessagesComponent } from './views/training-class-messages/training-class-messages.component';
import { TrainingClassMessagesAddComponent } from './views/training-class-messages/training-class-messages-add/training-class-messages-add.component';
import { TrainingClassDetailResolver } from './service/training-class-detail-resolver.service';
import { TrainingClassListComponent } from './views/training-class-list/training-class-list.component';
import { TrainingClassMessagesInfoComponent } from './views/training-class-messages/training-class-messages-info/training-class-messages-info.component';
const routes: Routes = [
    {
        path: '', children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: TrainingClassListNewComponent },
            { path: 'add', component: TrainingClassAddComponent },
            { path: 'preview', component: TrainingClassPreviewComponent },
            {
                path: 'assist',
                children: [
                    {
                        path: ':tbcId', resolve: { target: TrainingClassDetailNewResolver },
                        children: [
                            { path: '', redirectTo: 'message', pathMatch: 'full' },
                            {
                                path: 'message', children: [
                                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                                    { path: 'list', component: TrainingClassMessagesComponent },
                                    { path: 'add', component: TrainingClassMessagesAddComponent },
                                    { path: ':id/info', component: TrainingClassMessagesInfoComponent },
                                ]
                            },
                            {
                                path: 'exam', children: [
                                    { path: '', loadChildren: 'app/exam/exam-reuse/exam-reuse.module#ExamReuseModule' }
                                ]
                            }
                        ]
                    },

                ]
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        TrainingClassDetailResolver,
        TrainingClassDetailNewResolver,
    ]
})
export class TrainingClassRoutingModule { }

export const routedComponents = [
    TrainingClassListNewComponent,
    TrainingClassAddComponent,
    TrainingClassPreviewComponent,
    TrainingClassListComponent,
];

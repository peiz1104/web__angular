import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanlistComponent } from './views/planlist/planlist.component';
import { TrainingClassDetailNewResolver } from 'app/training/training-class/service/training-class-detailnew-resolver.service';
// tslint:disable-next-line:max-line-length
import { TrainingClassMessagesComponent } from 'app/training/training-class/views/training-class-messages/training-class-messages.component';
// tslint:disable-next-line:max-line-length
import { TrainingClassMessagesAddComponent } from 'app/training/training-class/views/training-class-messages/training-class-messages-add/training-class-messages-add.component';
import { TrainingClassMessagesInfoComponent } from 'app/training/training-class/views/training-class-messages/training-class-messages-info/training-class-messages-info.component';
const routes: Routes = [
    { path: '', component: PlanlistComponent },
    {
        path: 'plandetail', children: [
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlanRoutingModule { }

export const routedComponents = [
    PlanlistComponent
]

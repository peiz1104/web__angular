import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TbcListComponent } from './views/tbc-list/tbc-list.component';
import { TbcDetailComponent } from './views/tbc-detail/tbc-detail.component';
import { TbcDetailResolverService } from './service/tbc-detail-resolver.service';
import { TbcConditionComponent } from './views/tbc-condition/tbc-condition.component';
import { TbcScoreStrategyComponent } from './views/tbc-score-strategy/tbc-score-strategy.component';
import { TbcEnrollmentComponent } from './views/tbc-enrollment/tbc-enrollment.component';
import { TbcEditComponent } from './views/tbc-edit/tbc-edit.component';
import { TbcMaterialComponent } from './views/tbc-material/tbc-material.component';
import { TbcNoticeComponent } from './views/tbc-notice/tbc-notice.component';
import { TbcExtendListComponent } from './views/tbc-extend-list/tbc-extend-list.component';
import { TrainingClassDetailNewResolver } from '../../training/training-class/service/training-class-detailnew-resolver.service';
import { TrainingClassMessagesComponent } from '../../training/training-class/views/training-class-messages/training-class-messages.component';
import { TrainingClassMessagesAddComponent } from '../../training/training-class/views/training-class-messages/training-class-messages-add/training-class-messages-add.component';
import { TrainingClassDetailResolver } from '../../training/training-class/service/training-class-detail-resolver.service';
const routes: Routes = [
    { path: '', component: TbcExtendListComponent },
    {
        path: 'extand',
        children: [
            {
                path: ':tbcId', resolve: { target: TrainingClassDetailNewResolver },
                children: [
                    { path: '', redirectTo: 'message', pathMatch: 'full' },
                    {
                        path: 'message', children: [
                            { path: '', redirectTo: 'list', pathMatch: 'full' },
                            { path: 'list', component: TrainingClassMessagesComponent },
                            { path: 'add', component: TrainingClassMessagesAddComponent }
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
export class TbcAssistRoutingModule { }

export const routedComponents = [
    TbcListComponent,
    TbcDetailComponent,

    TbcConditionComponent,
    TbcScoreStrategyComponent,
    TbcEnrollmentComponent,
    TbcEditComponent,

    TbcMaterialComponent,
    TbcNoticeComponent,
    TbcExtendListComponent
];

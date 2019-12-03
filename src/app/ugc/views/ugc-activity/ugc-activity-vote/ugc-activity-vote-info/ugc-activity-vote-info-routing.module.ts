import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UgcActivityVoteInfoComponent } from './ugc-activity-vote-info.component';
import { UgcActivityVoteEditComponent } from '../ugc-activity-vote-edit/ugc-activity-vote-edit.component';
import { UgcActivityVoteOptionListComponent } from '../ugc-activity-vote-option-list/ugc-activity-vote-option-list.component';


const routes: Routes = [
    {
        path: '', component: UgcActivityVoteInfoComponent, children: [
            {
                path: '', children: [
                    { path: '', component: UgcActivityVoteEditComponent },
                    { path: 'options', component: UgcActivityVoteOptionListComponent }
                ]
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UgcActivityVoteInfoRoutingModule { }

export const routedComponents = [UgcActivityVoteInfoComponent, UgcActivityVoteEditComponent, UgcActivityVoteOptionListComponent];

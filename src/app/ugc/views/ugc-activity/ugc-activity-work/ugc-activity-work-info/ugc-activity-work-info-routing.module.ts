import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UgcActivityWorkInfoComponent } from './ugc-activity-work-info.component';
import { UgcActivityWorkEditComponent } from '../ugc-activity-work-edit/ugc-activity-work-edit.component';
import { UgcActivityWorkChapterComponent } from '../ugc-activity-work-chapter/ugc-activity-work-chapter.component';


const routes: Routes = [
    {
        path: '', component: UgcActivityWorkInfoComponent, children: [
            {
                path: '', children: [
                    { path: '', component: UgcActivityWorkEditComponent },
                    { path: 'chapters', component: UgcActivityWorkChapterComponent }
                ]
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UgcActivityWorkInfoRoutingModule { }

export const routedComponents = [UgcActivityWorkInfoComponent, UgcActivityWorkEditComponent, UgcActivityWorkChapterComponent];

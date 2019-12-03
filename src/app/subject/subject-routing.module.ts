import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjcetNoticeBoxListComponent } from './subject-notice-box/subject-notice-box-list.component';
import { SubjectSettingApiService } from './service/subject-setting-api.service';
import { SubjcetBannerBoxListComponent } from './subject-banner-box/subject-banner-box-list.component';
const routes: Routes = [
    {
        path: '', children: [
            { path: 'activity', loadChildren: 'app/subject/subject-activity/subject-activity.module#SubjectActivityModule' },
            { path: 'notice-box', component: SubjcetNoticeBoxListComponent },
            { path: 'banner-box', component: SubjcetBannerBoxListComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [SubjectSettingApiService]
})
export class SubjectRoutingModule { }

export const routedComponents = [
    SubjcetNoticeBoxListComponent,
    SubjcetBannerBoxListComponent
];

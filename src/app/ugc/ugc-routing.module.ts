import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UgcBannerListComponent } from './views/ugc-banner/ugc-banner-list.component';
import { UgcBannerService } from './service/ugc-banner.service';
import { UgcNoticeBoxListComponent } from './views/ugc-notice-box/ugc-notice-box-list.component';
import { UgcNoticeService } from './service/ugc-notice.service';
import { UgcExampleCourseListComponent } from './views/ugc-example-course/ugc-example-course-list.component';
import { UgcExampleCourseService } from './service/ugc-example-course.service';
// import { UgcExampleCourseEditComponent } from './views/ugc-example-course/ugc-example-course-edit/ugc-example-course-edit.component';
import { UgcExampleCourseAddComponent } from './views/ugc-example-course/ugc-example-course-add/ugc-example-course-add.component';
import { UgcExampleCourseDetailComponent } from './views/ugc-example-course/ugc-example-course-detail/ugc-example-course-detail.component';
import { UgcExampleCourseDetailResolver } from './service/ugc-example-course-detail-resover.service';
const routes: Routes = [
    {
        path: '', children: [
            { path: 'activity', loadChildren: 'app/ugc/views/ugc-activity/ugc-activity.module#UgcActivityModule' },
            {
                path: 'example-course', children: [
                    { path: '', component: UgcExampleCourseListComponent },
                    { path: 'add', component: UgcExampleCourseAddComponent },
                    // { path: ':id/edit', component: UgcExampleCourseEditComponent },
                    {
                        path: ':ugcExampleCourseId', component: UgcExampleCourseDetailComponent,
                        resolve: { ugcExampleCourse:  UgcExampleCourseDetailResolver },
                        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
                        children: [
                            // tslint:disable-next-line:max-line-length
                            { path: '', loadChildren: 'app/ugc/views/ugc-example-course/ugc-example-course-info/ugc-example-course-info.module#UgcExampleCourseInfoModule' },
                        ]
                    },
                ]
            },
            { path: 'banner', component: UgcBannerListComponent },
            { path: 'notice-box', component: UgcNoticeBoxListComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [UgcBannerService, UgcNoticeService, UgcExampleCourseService, UgcExampleCourseDetailResolver]
})
export class UgcRoutingModule { }

export const routedComponents = [
    UgcBannerListComponent,
    UgcNoticeBoxListComponent,
    UgcExampleCourseListComponent,
    UgcExampleCourseDetailComponent,
    UgcExampleCourseAddComponent
];

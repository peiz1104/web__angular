import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UgcActivityListComponent } from "./ugc-activity-list/ugc-activity-list.component";
import { UgcActivityService } from "./../../service/ugc-activity.service";
import { UgcActivityDetailResolver } from '../../service/ugc-activity-detail-resolver.service';
import { UgcActivityDetailComponent } from './ugc-activity-detail/ugc-activity-detail.component';
import { UgcActivityEditComponent } from './ugc-activity-edit/ugc-activity-edit.component';
import { UgcActivityConditionListComponent } from './ugc-activity-condition/ugc-activity-condition-list.component';
import { UgcActivityAwardListComponent } from './ugc-activity-award/ugc-activity-award-list.component';
import { UgcActivityAwardService } from '../../service/ugc-activity-award.service';
import { UgcActivityEnrollmentListComponent } from './ugc-activity-enrollment/ugc-activity-enrollment-list.component';
import { UgcActivityEnrollmentService } from '../../service/ugc-activity-enrollment.service';
import { UgcActivityNoticeBoxListComponent } from './ugc-activity-notice-box/ugc-activity-notice-box-list.component';
import { UgcActivityVoteListComponent } from './ugc-activity-vote/ugc-activity-vote-list.component';
// import { UgcActivityVoteEditComponent } from './ugc-activity-vote/ugc-activity-vote-edit/ugc-activity-vote-edit.component';
// tslint:disable-next-line:max-line-length
// import { UgcActivityVoteOptionListComponent } from './ugc-activity-vote/ugc-activity-vote-option-list/ugc-activity-vote-option-list.component';
import { UgcActivityVoteService } from '../../service/ugc-activity-vote.service';
import { UgcActivityVoteOptionService } from '../../service/ugc-activity-vote-option.service';
import { UgcActivityWorkListComponent } from './ugc-activity-work/ugc-activity-work-list.component';
import { UgcActivityExpertListComponent } from './ugc-activity-expert/ugc-activity-expert-list.component';
import { UgcActivityAddComponent } from 'app/ugc/views/ugc-activity/ugc-activity-add/ugc-activity-add.component';
import { UgcActivityWorkService } from '../../service/ugc-activity-work.service';
import { UgcActivityCategoryComponent } from './ugc-activity-category/ugc-activity-category.component';
import { UgcActivityCategoryService } from '../../service/ugc-activity-category.service';
import { UgcActivityCategoryListComponent } from './ugc-activity-category/ugc-activity-category-list/ugc-activity-category-list.component';
import { UgcActivityCategoryEditComponent } from './ugc-activity-category/ugc-activity-category-edit/ugc-activity-category-edit.component';
// tslint:disable-next-line:max-line-length
// import { UgcActivityWorkEditComponent } from 'app/ugc/views/ugc-activity/ugc-activity-work/ugc-activity-work-edit/ugc-activity-work-edit.component';
import { UgcActivityExpertService } from 'app/ugc/service/ugc-activity-expert.service';
import { UgcActivityAuditorListComponent } from './ugc-activity-auditor/ugc-activity-auditor-list.component';
import { UgcActivityAuditorService } from 'app/ugc/service/ugc-activity-auditor.service';
import { UgcActivityMessagesComponent } from './ugc-activity-messages/ugc-activity-messages.component';
import { UgcActivityMessagesAddComponent } from './ugc-activity-messages/ugc-activity-messages-add/ugc-activity-messages-add.component';
import { UgcActivityMessageService } from 'app/ugc/service/ugc-activity-message.service';
// tslint:disable-next-line:max-line-length
import { UgcActivityMessagesPersonsComponent } from './ugc-activity-messages/ugc-activity-messages-add/ugc-activity-messages-persons/ugc-activity-messages-persons.component';
import { UgcActivityExcellentListComponent } from './ugc-activity-excellent/ugc-activity-excellent-list.component';
import { UgcActivityWorkAddComponent } from './ugc-activity-work/ugc-activity-work-add/ugc-activity-work-add.component';
import { UgcChapterService } from '../../service/ugc-chapter.service';
import { UgcActivityWorkDetailComponent } from './ugc-activity-work/ugc-activity-work-detail/ugc-activity-work-detail.component';
import { UgcActivityWorkDetailResolver } from '../../service/ugc-activity-work-detail-resover.service';
import { UgcActivityVoteDetailComponent } from './ugc-activity-vote/ugc-activity-vote-detail/ugc-activity-vote-detail.component';
import { UgcActivityForumComponent } from './ugc-activity-forum/ugc-activity-forum.component';
import { UgcActivityForumResolver } from '../../service/ugc-activity-forum-resolver.service';
const routes: Routes = [
    {
        path: '', children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: UgcActivityListComponent },
            { path: 'add', component: UgcActivityAddComponent },
            {
                path: ':activityId', component: UgcActivityDetailComponent,
                resolve: { ugcActivity: UgcActivityDetailResolver },
                runGuardsAndResolvers: 'paramsOrQueryParamsChange',
                children: [
                    {
                        path: '', children: [
                            { path: '', redirectTo: 'edit', pathMatch: 'full' },
                            { path: 'edit', component: UgcActivityEditComponent },
                            {
                                path: 'category', component: UgcActivityCategoryComponent, children: [
                                    {
                                        path: '', children: [
                                            { path: '', redirectTo: 'list', pathMatch: 'full' },
                                            { path: 'list', component: UgcActivityCategoryListComponent },
                                            { path: 'add', component: UgcActivityCategoryEditComponent },
                                            { path: ':id/edit', component: UgcActivityCategoryEditComponent }
                                        ]
                                    }
                                ]},
                            { path: 'condition', component: UgcActivityConditionListComponent },
                            { path: 'enrollment', component: UgcActivityEnrollmentListComponent },
                            {
                                path: 'works', children: [
                                    { path: '', component: UgcActivityWorkListComponent },
                                    { path: 'add', component: UgcActivityWorkAddComponent },
                                    {
                                        path: ':workId', component: UgcActivityWorkDetailComponent,
                                        resolve: { work: UgcActivityWorkDetailResolver },
                                        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
                                        children: [
                                            // tslint:disable-next-line:max-line-length
                                            { path: '', loadChildren: 'app/ugc/views/ugc-activity/ugc-activity-work/ugc-activity-work-info/ugc-activity-work-info.module#UgcActivityWorkInfoModule' },
                                        ]
                                    },
                                ]
                            },
                            {
                                path: 'votes', children: [
                                    {
                                        path: '', component: UgcActivityVoteDetailComponent,
                                        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
                                        children: [
                                            // tslint:disable-next-line:max-line-length
                                            { path: '', loadChildren: 'app/ugc/views/ugc-activity/ugc-activity-vote/ugc-activity-vote-info/ugc-activity-vote-info.module#UgcActivityVoteInfoModule' },
                                        ]
                                    },
                                ]
                            },
                            { path: 'auditor', component: UgcActivityAuditorListComponent },
                            { path: 'notice-box', component: UgcActivityNoticeBoxListComponent },
                            { path: 'messages', children: [
                                { path: '', component: UgcActivityMessagesComponent},
                                { path: 'add', component: UgcActivityMessagesAddComponent }
                            ]},
                            { path: 'experts', component: UgcActivityExpertListComponent },
                            {
                                path: 'awards', children: [
                                    { path: '', component: UgcActivityAwardListComponent }
                                ]
                            },
                            {
                                path: 'excellent-works', component: UgcActivityExcellentListComponent
                            },
                            {
                                path: 'forum', component: UgcActivityForumComponent, children: [
                                    // tslint:disable-next-line:max-line-length
                                    { path: '', loadChildren: 'app/forum/ordinary-forum/ordinary-forum.module#OrdinaryForumModule', resolve: { forum: UgcActivityForumResolver }, },
                                ]
                            },
                        ]
                    }
                ]
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        UgcActivityService,
        UgcActivityDetailResolver,
        UgcActivityEnrollmentService,
        UgcActivityAwardService,
        UgcActivityVoteService,
        UgcActivityWorkService,
        UgcActivityVoteOptionService,
        UgcActivityCategoryService,
        UgcActivityAuditorService,
        UgcActivityExpertService,
        UgcActivityMessageService,
        UgcChapterService,
        UgcActivityWorkDetailResolver,
        UgcActivityForumResolver

    ]
})

export class UgcActivityRoutingModule { }

export const routedComponents = [
    UgcActivityDetailComponent,
    UgcActivityListComponent,
    UgcActivityAddComponent,
    UgcActivityEditComponent,
    UgcActivityConditionListComponent,
    UgcActivityCategoryComponent,
    UgcActivityCategoryListComponent,
    UgcActivityEnrollmentListComponent,
    UgcActivityWorkListComponent,
    UgcActivityVoteListComponent,
    UgcActivityForumComponent,
    UgcActivityExpertListComponent,
    UgcActivityAwardListComponent,
    UgcActivityAuditorListComponent,
    UgcActivityNoticeBoxListComponent,
    UgcActivityCategoryEditComponent,
    UgcActivityMessagesPersonsComponent,
    UgcActivityMessagesComponent,
    UgcActivityMessagesAddComponent,
    UgcActivityExcellentListComponent,
    UgcActivityWorkAddComponent,
    UgcActivityWorkDetailComponent,
    UgcActivityVoteDetailComponent
]


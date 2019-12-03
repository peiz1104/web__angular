import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './core/error/page-not-found/page-not-found.component';
import { AuthGuard } from './core/auth/auth-guard.service';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CanDeactivateGuard } from './exam/service/can-deactivate-guard.service'
import { NewLayoutComponent } from './newlayout/new-layout/new-layout.component';
import { AssistLayoutComponent } from './core/layout/assist-layout/assist-layout.component';
import { AssistAuthGuard } from './core/auth/assist-auth-guard.service';

const routes: Routes = [
    /* { path: 'review', loadChildren: 'app/exam/examination/examination.module#ExaminationModule' }, */
    {
        path: '', component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', loadChildren: 'app/dashboard/dashboard.module#DashboardModule' },
            { path: 'account', loadChildren: 'app/account/account.module#AccountModule' },
            { path: 'system', loadChildren: 'app/system/system.module#SystemModule' },
            { path: 'learning', loadChildren: 'app/learning/learning.module#LearningModule' },
            { path: 'library', loadChildren: 'app/library/library.module#LibraryModule' },
            { path: 'survey', loadChildren: 'app/survey/survey.module#SurveyModule' },
            { path: 'assess', loadChildren: 'app/assess/assess.module#AssessModule' },
            { path: 'portal', loadChildren: 'app/portal/portal.module#PortalModule' },
            { path: 'exam', loadChildren: 'app/exam/exam.module#ExamModule' },
            { path: 'points', loadChildren: 'app/points/points.module#PointsModule' },
            { path: 'training', loadChildren: 'app/training/training.module#TrainingModule' },
            { path: 'ugc', loadChildren: 'app/ugc/ugc.module#UgcModule' },
            { path: 'homeconfig', loadChildren: 'app/home/home.module#HomeModule' },
            { path: 'planning', loadChildren: 'app/planning/planning.module#PlanningModule' },
            { path: 'classhour', loadChildren: 'app/managementhours/managementhours.module#ManagementhoursModule' },
            { path: 'development', loadChildren: 'app/development/development.module#DevelopmentModule' },
            { path: 'subject', loadChildren: 'app/subject/subject.module#SubjectModule' },

            { path: 'forum', loadChildren: 'app/forum/forum.module#ForumModule' },
            // { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
        ]
    },
    {
        path: 'application', canActivate: [AuthGuard], component: NewLayoutComponent,
        children: [
            { path: '', redirectTo: 'all', pathMatch: 'full' },
            { path: 'all', loadChildren: 'app/newhome/newhome.module#NewhomeModule' }
        ]
    },
    // tslint:disable-next-line:max-line-length
    {
        path: 'training/planmanagement', canActivate: [AuthGuard], component: MainLayoutComponent,
        children: [
            { path: '', loadChildren: 'app/plainmanagent/plainmanagent.module#PlainmanagentModule' }
        ]
    },
    { path: 'home', canActivate: [AuthGuard], loadChildren: 'app/homepage/homepage.module#HomePageMoudle' },
    {
        path: 'assist', component: AssistLayoutComponent,
        canActivate: [AssistAuthGuard],
        children: [
            { path: '', loadChildren: 'app/assist/assist.module#AssistModule' }
        ]
    },
    { path: 'review', loadChildren: 'app/exam/examination/examination.module#ExaminationModule' },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        CanDeactivateGuard
    ]
})
export class AppRoutingModule { }

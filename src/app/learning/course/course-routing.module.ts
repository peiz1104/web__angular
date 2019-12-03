import { CourseTrialComponent } from './views/course-trial/course-trial.component';
import { ChinalifeCourseTeacherPageComponent } from './views/chinalife-course-teacher-page/chinalife-course-teacher-page.component';
import { CourseStrategyComponent } from './views/course-strategy/course-strategy.component';
import { CourseTeacherListComponent } from './views/course-teacher-list/course-teacher-list.component';
import { RcoImportComponent } from './views/rco-import/rco-import.component';
import { CourseDetailResolver } from './service/course-detail-resolver.service';
import { CourseOutlineComponent } from './views/course-outline/course-outline.component';
import { CourseEditComponent } from './views/course-edit/course-edit.component';
import { CourseDetailComponent } from './views/course-detail/course-detail.component';
import { CourseAddComponent } from './views/course-add/course-add.component';
import { CourseListComponent } from './views/course-list/course-list.component';
import { ChinaLifeCourseTeacherListComponent } from "./views/china-life-course-teacher-list/china-life-course-teacher-list.component";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseMaterialComponent } from './public/course-material/course-material.component';

const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: CourseListComponent },
    { path: 'add', component: CourseAddComponent },
    {
        path: ':id', component: CourseDetailComponent, resolve: { course: CourseDetailResolver },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        children: [
            {
                path: '', children: [
                    { path: '', redirectTo: 'edit', pathMatch: 'full' },
                    { path: 'edit', component: CourseEditComponent },
                    { path: 'outline', component: CourseOutlineComponent },
                    { path: 'outline/import', component: RcoImportComponent },
                    /* { path: 'teachers', component: CourseTeacherListComponent },*/
                    { path: 'teachers', component: ChinaLifeCourseTeacherListComponent },
                    { path: 'pageTeachers', component: ChinalifeCourseTeacherPageComponent },
                    { path: 'strategy', component: CourseStrategyComponent },
                    { path: 'materials', component: CourseMaterialComponent },
                    { path: 'trial', component: CourseTrialComponent }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        CourseDetailResolver,
    ]
})
export class CourseRoutingModule { }

export const routedComponents = [
    CourseListComponent,
    CourseAddComponent,
    CourseDetailComponent,
    CourseEditComponent,
    CourseOutlineComponent,
    RcoImportComponent,
    CourseTeacherListComponent,
    CourseStrategyComponent,
    CourseTrialComponent
];

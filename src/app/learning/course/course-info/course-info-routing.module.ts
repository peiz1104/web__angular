import { CourseAssessComponent } from './../views/course-assess/course-assess.component';
import { CourseTrialPublicComponent } from './../public/course-trial-public/course-trial-public.component';
import { CourseTeacherListComponent } from './../public/course-teacher-list/course-teacher-list.component';
import { CourseOutlineComponent } from './../public/course-outline/course-outline.component';
import { BaseInfoComponent } from './base-info/base-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseInfoComponent } from './course-info.component';
import { OutlineNewComponent } from './outline-new/outline-new.component';
import { CourseTeacherNewComponent } from './course-teacher-new/course-teacher-new.component';
import { CourseMaterialNewComponent } from './course-material-new/course-material-new.component';
import { CourseStrategyNewComponent } from './course-strategy-new/course-strategy-new.component';
import {ChinalifeCourseteacherListComponent} from "../public/chinalife-courseteacher-list/chinalife-courseteacher-list.component";

const routes: Routes = [
    {
        path: '', component: CourseInfoComponent, children: [
            {
                path: '', children: [
                    { path: '', component: BaseInfoComponent },
                    { path: 'outline', component: CourseOutlineComponent },
             /*       { path: 'teachers', component: CourseTeacherListComponent },*/
                    { path: 'teachers', component: ChinalifeCourseteacherListComponent},
                    { path: 'materials', component: CourseMaterialNewComponent },
                    { path: 'strategy', component: CourseStrategyNewComponent },
                    { path: 'trial', component: CourseTrialPublicComponent },
                    { path: 'assess', component: CourseAssessComponent}
                ]
            },
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CourseInfoRoutingModule { }

export const routedComponents = [
    CourseInfoComponent,
    BaseInfoComponent,
    OutlineNewComponent,
    CourseTeacherNewComponent,
    CourseMaterialNewComponent,
    CourseStrategyNewComponent
];

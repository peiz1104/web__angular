import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UgcExampleCourseInfoComponent } from './ugc-example-course-info.component';
import { UgcExampleCourseEditComponent } from '../ugc-example-course-edit/ugc-example-course-edit.component';
import { UgcExampleCourseChapterComponent } from '../ugc-example-course-chapter/ugc-example-course-chapter.component';


const routes: Routes = [
    {
        path: '', component: UgcExampleCourseInfoComponent, children: [
            {
                path: '', children: [
                    { path: '', component: UgcExampleCourseEditComponent },
                    { path: 'chapters', component: UgcExampleCourseChapterComponent }
                ]
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UgcExampleCourseInfoRoutingModule { }

export const routedComponents = [UgcExampleCourseInfoComponent, UgcExampleCourseEditComponent, UgcExampleCourseChapterComponent];

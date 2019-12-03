import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', children: [
    { path: 'course', loadChildren: 'app/learning/course/course.module#CourseModule' },
    { path: 'classroom', loadChildren: 'app/learning/classroom/classroom.module#ClassroomModule' },
    // { path: 'path', loadChildren: 'app/learning/path/path.module#PathModule' }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningRoutingModule { }

export const routedComponents = [];

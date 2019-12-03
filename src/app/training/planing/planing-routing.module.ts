import { TrainingCourseComponent } from './training-course/training-course.component';
import { PlaningComponent } from './planing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    { path: '', component: PlaningComponent },
    { path: 'training/:id', component: TrainingCourseComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlaningRoutingModule { }

export const routedComponents = [];

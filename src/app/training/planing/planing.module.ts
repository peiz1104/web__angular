import { PlaningComponent } from './planing.component';
import { PlaningRoutingModule } from './planing-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainingCourseComponent } from './training-course/training-course.component';
import { SharedModule } from 'app/shared';

@NgModule({
    imports: [
        CommonModule,
        PlaningRoutingModule,
        SharedModule
    ],
    declarations: [PlaningComponent, TrainingCourseComponent]
})
export class PlaningModule { }

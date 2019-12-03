import { NgModule } from '@angular/core';
import { SharedModule } from './../../../shared/shared.module';
import { TrainingPlanRoutingModule } from './trainingplan-routing.module';
import { TrainingPlanListComponent } from './views/trainingplan-list/trainingplan-list.component';
import { TrainingPlanService } from './service/trainingplan.service';
import { TrainingPlanHistoryService } from './service/trainingplanhistory.service';
import { TrainingPlanAddComponent } from './views/trainingplan-add/trainingplan-add.component';
import { TrainingPlanEditComponent } from './views/trainingplan-edit/trainingplan-edit.component';
import { TrainingPlanViewComponent } from './views/trainingplan-view/trainingplan-view.component';
import { TrainingPlanImportComponent } from './views/trainingplan-import/trainingplan-import.component';
import { TrainingPlanCopyComponent } from './views/trainingplan-copy-lastYear/lastyearplan-list.component';
import { CourseTeacherService } from './../../../learning/course/service/course-teacher.service';
import { CourseService } from './../../../learning/course/service/course.service';
@NgModule({
    imports: [
        SharedModule,
        TrainingPlanRoutingModule,
    ],
    // tslint:disable-next-line:max-line-length
    declarations: [TrainingPlanListComponent, TrainingPlanAddComponent,
        TrainingPlanEditComponent, TrainingPlanViewComponent, TrainingPlanImportComponent
        , TrainingPlanCopyComponent],
    providers: [TrainingPlanService, TrainingPlanHistoryService, CourseTeacherService, CourseService]
})
export class TrainingPlanModule { }

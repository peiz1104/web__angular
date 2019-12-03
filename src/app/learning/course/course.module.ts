import { DocumentInfoService } from './../../library/service/documentInfo.service';
import { StrategyModule } from 'app/learning/strategy/strategy.module';
import { CoursePublicModule } from './public/course-public.module';
import { CourseTeacherService } from './service/course-teacher.service';
import { CourseOutlineService } from './service/course-outline.service';
import { RcoService } from './service/rco.service';
import { CourseDetailResolver } from './service/course-detail-resolver.service';
import { routedComponents } from './course-routing.module';
import { CourseService } from './service/course.service';
import { CourseListComponent } from './views/course-list/course-list.component';
import { CourseRoutingModule } from './course-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseFormComponent } from './public/course-form/course-form.component';
import { CourseAddComponent } from './views/course-add/course-add.component';
import { CourseDetailComponent } from './views/course-detail/course-detail.component';
import { CourseEditComponent } from './views/course-edit/course-edit.component';
import { RcoItemComponent } from './public/rco-item/rco-item.component';
import { CourseLookupComponent } from './public/course-lookup/course-lookup.component';
import { CourseTeacherListComponent } from './views/course-teacher-list/course-teacher-list.component';
import { MaterialModule } from '../material/material.module';
import { ChinaLifeCourseTeacherListComponent } from './views/china-life-course-teacher-list/china-life-course-teacher-list.component';
import { CourseTrialComponent } from './views/course-trial/course-trial.component';
import { ChinalifeCourseTeacherPageComponent } from './views/chinalife-course-teacher-page/chinalife-course-teacher-page.component';

@NgModule({
    imports: [
        SharedModule,
        StrategyModule,
        MaterialModule,
        CourseRoutingModule,
        CoursePublicModule,
    ],
    declarations: [...routedComponents, ChinaLifeCourseTeacherListComponent, ChinalifeCourseTeacherPageComponent],
    providers: [],
    exports: [],
})
export class CourseModule { }

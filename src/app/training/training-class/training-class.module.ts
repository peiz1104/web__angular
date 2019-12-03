import { COURSE_API_SERVICES } from './../../learning/course/service/index';
import { CoursePublicModule } from './../../learning/course/public/course-public.module';
import { SurveyModule } from 'app/survey/survey.module';
import { AssessModule } from 'app/assess/assess.module';
import { OfferingModule } from './../../learning/offering/offering.module';
import { TrainingClassPublicModule } from './public/public.module';
import { TrainingClassRoutingModule, routedComponents } from './training-class-routing-new.module';
import { SharedModule } from 'app/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrategyModule } from 'app/learning/strategy/strategy.module';
import { NoticeBoxModule } from './../../public-suite/notice-box/notice-box.module';
import { TeacherLookupModule } from './public/teacher-lookup/teacher-lookup.module';
import { LibraryModule } from '../../library/library.module';
import { MaterialModule } from '../../learning/material/material.module';
import { TrainingClassGroupComponent } from './views/training-class-group/training-class-group.component';
import { TrainClassGroupCourseComponent } from './views/train-class-group-course/train-class-group-course.component';
import { TrainingClassDetailModule } from './training-class-detail.module';

@NgModule({
    imports: [
        SharedModule,
        StrategyModule,
        TrainingClassRoutingModule,
        TrainingClassPublicModule,
        TrainingClassDetailModule,
        OfferingModule,
        SurveyModule,
        AssessModule,
        NoticeBoxModule,
        CoursePublicModule,
        TeacherLookupModule,
        LibraryModule,
        MaterialModule,
    ],

    declarations: [...routedComponents,
        TrainingClassGroupComponent,
    ],
    providers: [...COURSE_API_SERVICES]
})
export class TrainingClassModule { }

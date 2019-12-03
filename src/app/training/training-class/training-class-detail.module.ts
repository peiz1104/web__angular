import { COURSE_API_SERVICES } from './../../learning/course/service/index';
import { CoursePublicModule } from './../../learning/course/public/course-public.module';
import { SurveyModule } from 'app/survey/survey.module';
import { AssessModule } from 'app/assess/assess.module';
import { OfferingModule } from './../../learning/offering/offering.module';
import { TrainingClassPublicModule } from './public/public.module';
import { TrainingClassDetailRoutingModule, routedComponents } from './training-class-detail-routing.module';
import { SharedModule } from 'app/shared';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrategyModule } from 'app/learning/strategy/strategy.module';
import { NoticeBoxModule } from './../../public-suite/notice-box/notice-box.module';
import { LibraryModule } from '../../library/library.module';
import { OfficeTeacherDetailComponent } from './views/training-class-office/office-teacher-detail/office-teacher-detail.component';
import { MaterialModule } from '../../learning/material/material.module';
import { TrainingClassCourseAddComponent } from './views/training-class-course-add/training-class-course-add.component';
import { TrainingApiModule } from '../service/training-api.module';
import { TrainingClassXType, manageXtypeFactory, assistXtypeFactory } from './service/training-class-xtype.service';
import { TeacherLookupModule } from './public/teacher-lookup/teacher-lookup.module';
import { OfficeTeacherAssessComponent } from './views/training-class-office/office-teacher-assess/office-teacher-assess.component';

@NgModule({
    imports: [
        SharedModule,
        StrategyModule,
        TrainingClassDetailRoutingModule,
        TrainingClassPublicModule,
        OfferingModule,
        SurveyModule,
        AssessModule,
        NoticeBoxModule,
        CoursePublicModule,
        LibraryModule,
        MaterialModule,
        TrainingApiModule,
        TeacherLookupModule,
    ],
    declarations: [...routedComponents,
        OfficeTeacherAssessComponent],
    providers: [
        ...COURSE_API_SERVICES,
        {
            provide: TrainingClassXType,
            useFactory: manageXtypeFactory
        }
    ]
})
export class TrainingClassDetailModule {
    static forAssist(): ModuleWithProviders {
        return {
            ngModule: TrainingClassDetailModule,
            providers: [
                ...COURSE_API_SERVICES,
                {
                    provide: TrainingClassXType,
                    useFactory: assistXtypeFactory
                }
            ]
        };
    }
}

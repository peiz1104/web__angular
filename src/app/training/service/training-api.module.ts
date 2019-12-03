import { TrainingClassApiService } from './training-class-api.service';

import { NgModule } from '@angular/core';
import { TrainingClassAttendanceApiService } from './training-class-attendance.service.';
import { TrainingClassMessageApiService } from './training-class-message.service';
import { OfferingCourseApiService } from 'app/training/service/offering-course-api.service';
import { TrainClassBannerApiService } from './train-class-banner-api.service';
import { OfficeTeacherApiService } from 'app/training/service/office-teacher-api.service';
import { StatisticsService } from './statistics.service';


@NgModule({
    providers: [
        TrainingClassApiService,
        TrainingClassAttendanceApiService,
        TrainingClassMessageApiService,
        OfferingCourseApiService,
        TrainClassBannerApiService,
        OfficeTeacherApiService,
        StatisticsService
    ],
})
export class TrainingApiModule { }

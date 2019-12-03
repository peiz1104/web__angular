import { OfferingGroupService } from './service/offering-group-api.service';
import { OfferingEnrollmentApiService } from './service/offering-enrollment-api.service';
import { OfferingRecommendService } from 'app/learning/offering/service/offering-recommend.service';
import { ClassroomService } from './../classroom/service/classroom.service';
import { OfferingService } from './service/offering.service';
import { TermService } from './service/term.service';
import { SystemModule } from './../../system/system.module';
import { SharedModule } from './../../shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferingConditionComponent } from './public/offering-condition/offering-condition.component';
import { ConditionComponent } from './public/condition/condition.component';
import { OfferingRecommendComponent } from './views/offering-recommend/offering-recommend.component';
import { OfferingEnrollmentComponent } from './public/offering-enrollment/offering-enrollment.component';
import { OfferingEnrollmentEnrolledComponent } from './public/offering-enrollment-enrolled/offering-enrollment-enrolled.component';
// tslint:disable-next-line:max-line-length
import { OfferingEnrollmentNotEnrolledComponent } from './public/offering-enrollment-not-enrolled/offering-enrollment-not-enrolled.component';
import { OfferingEnrollmentAppliedComponent } from './public/offering-enrollment-applied/offering-enrollment-applied.component';
import { OfferingEnrollmentRefusedComponent } from './public/offering-enrollment-refused/offering-enrollment-refused.component';
import { TermUserImportComponent } from './public/term-user-import/term-user-import.component';
import { OfferingReglistComponent } from './public/offering-reglist/offering-reglist.component';
import { OfferingCourseGroupComponent } from './views/offering-course-group/offering-course-group.component';
import { OfferingCourseLookupComponent } from './public/offering-course-lookup/offering-course-lookup.component';
import { OfferingCourseApiService } from './service/offering-course-api.service';

@NgModule({
    imports: [
        SharedModule,
        SystemModule
    ],
    declarations: [
        OfferingConditionComponent,
        ConditionComponent,
        OfferingRecommendComponent,
        OfferingEnrollmentComponent,
        OfferingEnrollmentEnrolledComponent,
        OfferingEnrollmentNotEnrolledComponent,
        OfferingEnrollmentAppliedComponent,
        OfferingEnrollmentRefusedComponent,
        TermUserImportComponent,
        OfferingReglistComponent,
        OfferingCourseGroupComponent,
        OfferingCourseLookupComponent
    ],
    providers: [
        TermService,
        OfferingService,
        ClassroomService,
        OfferingRecommendService,
        OfferingEnrollmentApiService,
        OfferingGroupService,
        OfferingCourseApiService,
    ],
    exports: [
        OfferingConditionComponent,
        ConditionComponent,
        OfferingRecommendComponent,
        OfferingEnrollmentComponent,
        OfferingCourseGroupComponent,
        OfferingCourseLookupComponent,
        TermUserImportComponent
    ],
})
export class OfferingModule { }

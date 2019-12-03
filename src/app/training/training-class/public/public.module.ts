import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared';
import { TrainingClassFormComponent } from './training-class-form/training-class-form.component';
import { TrainingClassAttendanceFormComponent } from './training-class-attendance-form/training-class-attendance-form.component';
import { ModalListComponent } from './modal-list/modal-list.component';
import { TrainingClassFormNewComponent } from './training-class-form-new/training-class-form-new.component';
import { CourseSystemLookupComponent } from './course-system-lookup/course-system-lookup.component';
import { CourseTeacherSystemLookupComponent } from './course-teacher-system-lookup/course-teacher-system-lookup.component';
import { CopyTrainingCourseComponent } from './copy-training-course/copy-training-course.component';
import { TrainingClassApiService } from '../../service/training-class-api.service';

const PUBLIC_COMPS = [
    TrainingClassFormComponent,
    TrainingClassAttendanceFormComponent,
    ModalListComponent,
    TrainingClassFormNewComponent,
    CourseSystemLookupComponent,
    CourseTeacherSystemLookupComponent,
    CopyTrainingCourseComponent
];

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [...PUBLIC_COMPS],
    exports: [...PUBLIC_COMPS],
    providers: [
        TrainingClassApiService
    ]
})
export class TrainingClassPublicModule { }

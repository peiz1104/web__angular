import { AssessModule } from 'app/assess/assess.module';
import { CourseAssessComponent } from './../views/course-assess/course-assess.component';
import { FormArray } from '@angular/forms';
import { CourseTeacherLookupComponent } from './course-teacher-lookup/course-teacher-lookup.component';
import { CourseTeacherListComponent } from './course-teacher-list/course-teacher-list.component';
import { RouterModule } from '@angular/router';
import { RcoItemComponent } from './rco-item/rco-item.component';
import { CourseLookupComponent } from './course-lookup/course-lookup.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { SharedModule } from 'app/shared';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseOutlineComponent } from './course-outline/course-outline.component';
import { RcoUploadComponent } from './rco-upload/rco-upload.component';
import { RcoLinkComponent } from './rco-link/rco-link.component';
import { RcoLookupResourceComponent } from './rco-lookup-resource/rco-lookup-resource.component';
import { RcoAddGroupComponent } from './rco-add-group/rco-add-group.component';
import { RcoItemEditComponent } from './rco-item-edit/rco-item-edit.component';
import { RcoPreviewComponent } from './rco-preview/rco-preview.component';
import { MaterialModule } from '../../material/material.module';
import { CourseStrategyComponent } from './course-strategy/course-strategy.component';
import { StrategyModule } from '../../strategy/strategy.module';
import { TrainingClassPublicModule } from '../../../training/training-class/public/public.module';
import { ChinalifeCourseteacherListComponent } from './chinalife-courseteacher-list/chinalife-courseteacher-list.component';
import { CourseTrialFormComponent } from './course-trial-form/course-trial-form.component';
import { CourseTrialPublicComponent } from './course-trial-public/course-trial-public.component';
import { CourseMaterialComponent } from './course-material/course-material.component';

export const PUBLIC_COMPS = [
    CourseFormComponent,
    CourseLookupComponent,
    RcoItemComponent,
    CourseOutlineComponent,
    CourseTeacherListComponent,
    CourseTeacherLookupComponent,
    CourseMaterialComponent,
    CourseStrategyComponent,
    ChinalifeCourseteacherListComponent,
    CourseTrialFormComponent,
    CourseTrialPublicComponent,
    CourseAssessComponent,
];

@NgModule({
    imports: [
        SharedModule,
        MaterialModule,
        StrategyModule,
        RouterModule,
        TrainingClassPublicModule,
        AssessModule,
    ],
    declarations: [
        ...PUBLIC_COMPS,
        RcoUploadComponent,
        RcoLinkComponent,
        RcoLookupResourceComponent,
        RcoAddGroupComponent,
        RcoItemEditComponent,
        RcoPreviewComponent,
    ],
    exports: [...PUBLIC_COMPS],
    entryComponents: [
        CourseLookupComponent,
        CourseTeacherLookupComponent,
        RcoUploadComponent,
        RcoLinkComponent,
        RcoLookupResourceComponent,
        RcoAddGroupComponent,
        RcoItemEditComponent,
        RcoPreviewComponent,
    ]
})
export class CoursePublicModule { }

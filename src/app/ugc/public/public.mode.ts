import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared';

import { UgcActivityFormComponent } from './ugc-activity-form/ugc-activity-form.component';
import { UgcActivityCategoryTreeComponent } from 'app/ugc/public/ugc-activity-category-tree/ugc-activity-category-tree.component';
import { UgcActivityCategorySelectComponent } from './ugc-activity-category-select/ugc-activity-category-select.component';
import { UgcActivityWorkPersonsComponent } from './ugc-activity-work-persons/ugc-activity-work-persons.component';
import { UgcActivityWorkFormComponent } from './ugc-activity-work-form/ugc-activity-work-form.component';
import { UgcChapterItemComponent } from './ugc-chapter-item/ugc-chapter-item.component';
import { UgcChapterListComponent } from './ugc-chapter-list/ugc-chapter-list.component';
import { UgcChapterService } from '../service/ugc-chapter.service';
import { UgcChapterUploadComponent } from './ugc-chapter-upload/ugc-chapter-upload.component';
import { UgcChpaterItemEditComponent } from './ugc-chapter-item-edit/ugc-chapter-item-edit.component';
import { UgcExampleCourseFormComponent } from './ugc-example-course-form/ugc-example-course-form.component';
import { UgcActivityEnrollmentPersonsComponent } from './ugc-activity-enrollment-persons/ugc-activity-enrollment-persons.component';


const PUBLIC_COMPS = [
    UgcActivityFormComponent,
    UgcActivityCategoryTreeComponent,
    UgcActivityWorkPersonsComponent,
    UgcActivityCategorySelectComponent,
    UgcActivityWorkFormComponent,
    UgcChapterItemComponent,
    UgcChapterListComponent,
    UgcChapterUploadComponent,
    UgcChpaterItemEditComponent,
    UgcExampleCourseFormComponent,
    UgcActivityEnrollmentPersonsComponent
];

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [...PUBLIC_COMPS],
  exports: [...PUBLIC_COMPS],
  entryComponents: [UgcChapterUploadComponent, UgcChpaterItemEditComponent],
  providers: [UgcChapterService]
})
export class UgcPublicModule { }

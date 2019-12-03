import { CourseTrialService } from './../../learning/course/service/course-trial.service';
import { OfferingCourseGroupComponent } from './../../learning/offering/views/offering-course-group/offering-course-group.component';
import { SubjectActivityAssessComponent } from './views/subject-activity-assess/subject-activity-assess.component';
import { OfferingCaseService } from 'app/learning/offering/service/offering-case-api.service';
import { DocumentInfoService } from './../../library/service/documentInfo.service';
import { CourseTeacherService } from './../../learning/course/service/course-teacher.service';
import { CourseOutlineService } from './../../learning/course/service/course-outline.service';
import { OfferingCourseApiService } from 'app/training/service/offering-course-api.service';
import { NoticeBoxModule } from './../../public-suite/notice-box/notice-box.module';
import { AssessModule } from './../../assess/assess.module';
import { OfferingModule } from '../../learning/offering/offering.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared';
import { SubjectActivityListComponent } from './views/subject-activity-list/subject-activity-list.component';
import { SubjectActivityRoutingModule, routedComponents } from './subject-activity-routing.module';
import { SubjectActivityDetailComponent } from './views/subject-activity-detail/subject-activity-detail.component';
import { SubjectActivityApiService } from '../service/subject-activity-api.service';
import { SubjectActivityAddComponent } from './views/subject-activity-add/subject-activity-add.component';
import { SubjectActivityFormComponent } from './public/subject-activity-form/subject-activity-form.component';
import { SubjectActivityEditComponent } from './views/subject-activity-edit/subject-activity-edit.component';
import { SubjectActivityDetailResolver } from '../subject-activity/service/subject-activity-detail-resolver.service';
import { SubjectActivityMaterialsComponent } from './views/subject-activity-materials/subject-activity-materials.component';
import { SurveyModule } from '../../survey/survey.module';
import { CoursePublicModule } from '../../learning/course/public/course-public.module';
import { LibraryModule } from '../../library/library.module';
import { MaterialModule } from '../../learning/material/material.module';
import { SubjectActivityCourseComponent } from './views/subject-activity-course/subject-activity-course.component';
import { CourseService } from '../../learning/course/service/course.service';
import { SubjectActivityCourseDetailComponent } from './views/subject-activity-course-detail/subject-activity-course-detail.component';
import { SubjectActivityCourseDetailResolver } from 'app/subject/subject-activity/service/subject-activity-course-detail-resover.service';
import { RcoService } from 'app/learning/course/service/rco.service';
import { SubjectActivityContentComponent } from './views/subject-activity-content/subject-activity-content.component';
import { SubjectActivityComponentComponent } from './views/subject-activity-component/subject-activity-component.component';
import { SubjectActivityCourseGroupComponent } from './views/subject-activity-course-group/subject-activity-course-group.component';
import { SubjectActivitySurveyComponent } from './views/subject-activity-survey/subject-activity-survey.component';
import { SubjectActivityCourseForumResolver } from './service/subject-activity-course-forum-Resolver.service';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SubjectActivityRoutingModule,
    OfferingModule,
    SurveyModule,
    AssessModule,
    NoticeBoxModule,
    CoursePublicModule,
    LibraryModule,
    MaterialModule,
  ],
  declarations: [...routedComponents,
     SubjectActivityAddComponent,
     SubjectActivityFormComponent,
     SubjectActivityEditComponent,
     SubjectActivityMaterialsComponent,
     SubjectActivityCourseComponent,
     SubjectActivityCourseDetailComponent,
     SubjectActivityContentComponent,
     SubjectActivityComponentComponent,
     SubjectActivityCourseGroupComponent,
     SubjectActivityAssessComponent,
     SubjectActivitySurveyComponent,
    ],
  providers: [
    SubjectActivityApiService,
     SubjectActivityDetailResolver,
     OfferingCourseApiService,
     CourseService,
     RcoService,
     SubjectActivityCourseDetailResolver,
     CourseOutlineService,
     CourseTeacherService,
     DocumentInfoService,
     OfferingCaseService,
     CourseTrialService,
     SubjectActivityCourseForumResolver,
    ]
})
export class SubjectActivityModule { }

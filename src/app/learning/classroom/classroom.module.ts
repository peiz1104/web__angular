import { OrdinaryForumModule } from './../../forum/ordinary-forum/ordinary-forum.module';
import { ForumModule } from './../../forum/forum.module';
import { CaseInfoService } from './../../library/service/case.service';
import { OfferingCaseService } from './../offering/service/offering-case-api.service';
import { CoursePublicModule } from './../course/public/course-public.module';
import { NoticeBoxModule } from './../../public-suite/notice-box/notice-box.module';
import { OfferingModule } from './../offering/offering.module';
import { ClassroomDetailResolver } from './service/classroom-detail-resolver.service';
import { CourseModule } from './../course/course.module';
import { ClassroomService } from './service/classroom.service';
import { ClassroomRoutingModule, routedComponents } from './classroom-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClassroomFormComponent } from './public/classroom-form/classroom-form.component';
import { ClassroomCourseComponent } from './views/classroom-course/classroom-course.component';
import { LibraryModule } from 'app/library/library.module';
import { ClassroomLearningComponent } from './views/classroom-learning/classroom-learning.component';

@NgModule({
  imports: [
    SharedModule,
    ClassroomRoutingModule,
    CoursePublicModule,
    OfferingModule,
    NoticeBoxModule,
    LibraryModule,
    OrdinaryForumModule,
    // CoursePublicModule
  ],
  declarations: [...routedComponents, ClassroomFormComponent, ClassroomCourseComponent, ClassroomLearningComponent],
  providers: [ClassroomService, OfferingCaseService, CaseInfoService]
})
export class ClassroomModule { }

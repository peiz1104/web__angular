import { Forum } from './../../../../forum/ordinary-forum/entity/forum';
import { Course } from './../../../../learning/course/entity/course';
import { NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Offering } from 'app/learning/offering/entity/offering';
import { OfferingCourseApiService } from '../../../../training/service/offering-course-api.service';
import { SubjectActivity } from '../../../entity/subject-activity';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-subject-activity-course-forum',
  templateUrl: './subject-activity-course-forum.component.html',
  styleUrls: ['./subject-activity-course-forum.component.scss']
})
export class SubjectActivityCourseForumComponent implements OnInit {

  course: Course;
  subjectActivity: SubjectActivity;
  forum;

  constructor(
    private route: ActivatedRoute,
    private offeringCourseApi: OfferingCourseApiService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { course: Course, subjectActivity: any}) => {
      this.course = data.course;
      this.subjectActivity = data.subjectActivity;
    })
    this.getForum( this.subjectActivity.id, this.course.id);
  }

  getForum(OfferingId: number, courseId: number ) {
    this.offeringCourseApi.getForum(OfferingId, courseId).subscribe(
      ok => {
        this.forum = ok;
        console.log("sdas", this.forum);
      },
      err => {
        tipMessage(err);
      }
    );
  }

  initCondition() {
    this.offeringCourseApi.iniForum(this.subjectActivity.id, this.course.id).subscribe(
      ok => {
        this.forum = ok;
      },
      err => {
        tipMessage(err);
      }
    );
  }

}

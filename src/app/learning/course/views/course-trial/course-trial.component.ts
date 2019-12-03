import { Video } from './../../entity/video';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../entity/course';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../service/course.service';
import { NzMessageService } from 'ng-zorro-antd';
import { CourseTrialService } from '../../service/course-trial.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  templateUrl: './course-trial.component.html',
  styleUrls: ['./course-trial.component.scss']
})
export class CourseTrialComponent implements OnInit {

  course: Course;
  trial: Video;
  loading: boolean = false;
  editable: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private courseTrialService: CourseTrialService,
    private message: NzMessageService,
  ) { }

  ngOnInit() {
    this.trial = new Video();
    this.route.data.subscribe(({ course }: { course: Course }) => {
      this.loading = true;
      this.course = course;
      this.initTrial(course.id);
    });
  }

  initTrial(courseId: number) {
    this.courseTrialService.find(courseId).subscribe(
      data => {
        this.trial = data;
        this.loading = false;
      },
      err => {
        tipMessage(err);
        this.loading = false;
      }
    );
  }
}

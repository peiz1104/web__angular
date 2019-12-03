import { Component, OnInit } from '@angular/core';
import { Course } from '../../entity/course';
import { Video } from '../../entity/video';
import { ActivatedRoute } from '@angular/router';
import { CourseTrialService } from '../../service/course-trial.service';
import { NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
  selector: 'spk-course-trial-public',
  templateUrl: './course-trial-public.component.html',
  styleUrls: ['./course-trial-public.component.scss']
})
export class CourseTrialPublicComponent implements OnInit {

  course: Course;
  trial: Video;
  loading: boolean = false;
  editable: boolean;
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
      this.editable = this.isEditable(this.course);
      this.initTrial(course.id);
    });
  }

  isEditable(course: Course) {
    return course.sourceType == 'ORIGINAL' || course.sourceType == 'COPIED';
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

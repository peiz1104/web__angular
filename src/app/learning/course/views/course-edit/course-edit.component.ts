import { CourseService } from './../../service/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'console-ui-ng';
import { Course } from './../../entity/course';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    templateUrl: './course-edit.component.html',
    styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {
    course: Course;
    msg: Message[];
    loading: boolean = false;

    constructor(private router: Router, private route: ActivatedRoute,
        private courseService: CourseService) { }

    ngOnInit() {
        this.route.data.subscribe((data: { course: Course }) => {
            this.course = data.course;
        });
    }
    doSubmit(event) {
        this.loading = true;
      let courseIds = event.courseIds;
      console.log(courseIds);
      let param = {
        ...event.value,
        motherId: courseIds[0] || '',
        bigId: courseIds[1] || '',
        smallId: courseIds[2] || '',
      }
        this.courseService.update(param).subscribe(
            course => {
              this.loading = false;
              tipMessage('保存成功', 'success');
              this.router.navigate(['.'], { relativeTo: this.route, queryParams: { t: Math.random() } });
              this.course = course;
            },
            err => {
                this.loading = false;
                this.msg = [{ severity: 'danger', summary: '保存失败', detail: err, id: 1 }];
            }
        );
    }
}

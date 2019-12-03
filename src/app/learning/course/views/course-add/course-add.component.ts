import { CourseFormComponent } from './../../public/course-form/course-form.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from './../../service/course.service';
import { Message } from 'console-ui-ng';
import { Course } from './../../entity/course';
import { Component, OnInit, ViewChild } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    templateUrl: './course-add.component.html',
    styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {
    course: Course = new Course();
    msg: Message[] = [];
    loading: boolean = false;

    @ViewChild("courseForm") courseForm: CourseFormComponent;

    constructor(private courseService: CourseService,
        private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
    }

    doSubmit({ originalEvent, value, nextAction, courseIds }) {
        console.log(value)
        console.log(courseIds)
        let param = {
          ...value,
            motherId: courseIds[0] || '',
            bigId: courseIds[1] || '',
            smallId: courseIds[2] || ''
        }
        this.loading = true;
        this.courseService.create(param).subscribe(
            course => {
              this.loading = false;
              tipMessage('保存成功', 'success');
              if (nextAction == 'addNext') {
                this.addNext();
              } else if (nextAction == 'toDetail') {
                this.toDetail(course.id);
              } else {
                this.toList();
              }
               /* if (param.motherId) {
                    this.courseService.getsavecategory(param, course.id).subscribe(
                        () => {
                            this.loading = false;
                            tipMessage('保存成功', 'success');
                            if (nextAction == 'addNext') {
                                this.addNext();
                            } else if (nextAction == 'toDetail') {
                                this.toDetail(course.id);
                            } else {
                                this.toList();
                            }
                        }
                    )
                } else {
                    this.loading = false;
                    tipMessage('保存成功', 'success');
                    if (nextAction == 'addNext') {
                        this.addNext();
                    } else if (nextAction == 'toDetail') {
                        this.toDetail(course.id);
                    } else {
                        this.toList();
                    }
                }*/
            },
            err => {
                this.loading = false;
                this.msg = err;
            }
        );
    }

    onCancel(e) {
        this.toList();
    }

    addNext() {
        this.course = new Course();
        this.courseForm._initForm();
    }

    toDetail(courseId: number) {
        this.router.navigate(['../', courseId], { relativeTo: this.route });
    }

    toList() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }
}

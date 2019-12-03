import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from '../../../../learning/course/entity/course';
import { CourseFormComponent } from '../../../../learning/course/public/course-form/course-form.component';
import { Router, ActivatedRoute } from '@angular/router';
import { OfferingCourseApiService } from '../../../service/offering-course-api.service';
import { TrainingClass } from '../../../entity/training-class';
import { CourseService } from "../../../../learning/course/service/course.service";
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-training-class-course-add',
    templateUrl: './training-class-course-add.component.html',
    styleUrls: ['./training-class-course-add.component.scss']
})
export class TrainingClassCourseAddComponent implements OnInit {
    trainingClass: TrainingClass;
    course: Course = new Course();
    loading: boolean = false;
    trainingType: string;

    @ViewChild("courseForm") courseForm: CourseFormComponent;

    constructor(private offeringCourseApi: OfferingCourseApiService,
        private router: Router, private route: ActivatedRoute, private courseService: CourseService) { }

    ngOnInit() {
        this.route.data.subscribe((data: { trainingClass: TrainingClass }) => {
            this.trainingClass = data.trainingClass;
            this.trainingType = this.trainingClass.trainingType;
        });
    }

    doSubmit({ originalEvent, value, nextAction, courseIds }) {
        // console.log('就是这里')
        this.loading = true;
        // console.log(value);
        let param = {
            ...value,
              motherId: courseIds[0] || '',
              bigId: courseIds[1] || '',
              smallId: courseIds[2] || ''
        }
        this.offeringCourseApi.create(this.trainingClass.id, param).subscribe(
            course => {
                // if (param.motherId) {
                //     this.courseService.getsavecategory(param, course.course.id).subscribe(
                //         () => {
                //             this.loading = false;
                //             tipMessage('保存成功', 'success');
                //             if (nextAction == 'addNext') {
                //                 this.addNext();
                //             } else if (nextAction == 'toDetail') {
                //                 this.toDetail(course.id);
                //             } else {
                //                 this.toList();
                //             }
                //         }
                //     )
                // } else {
                    this.loading = false;
                    tipMessage('保存成功', 'success');
                    if (nextAction == 'addNext') {
                        this.addNext();
                    } else if (nextAction == 'toDetail') {
                        this.toDetail(course.id);
                    } else {
                        this.toList();
                    }
                // }
            },
            err => {
                this.loading = false;
                tipMessage('创建课程失败');
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

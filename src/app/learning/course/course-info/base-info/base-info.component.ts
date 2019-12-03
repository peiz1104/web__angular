import { CourseService } from './../../service/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from './../../entity/course';
import { Component, OnInit, Optional } from '@angular/core';
import { OfferingCourseApiService } from '../../service/offering-course-api.service';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    template: `
        <spk-course-form [loading]="loading" [course]="course" (doSubmit)="doSubmit($event)"></spk-course-form>
    `
})

export class BaseInfoComponent implements OnInit {
    course: Course;
    msg;
    loading: boolean = false;
    tbcId;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private courseService: CourseService,
        private offeringCourseApi: OfferingCourseApiService
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { course: Course }) => {
            this.course = data.course;
        });

        this.tbcId = +this.route.snapshot.paramMap.get('tbcId');
    }

    doSubmit(event) {
        // console.log('???这里')
        this.loading = true;
        let value = event.value;
        value['id'] = this.course.id;
        let courseIds = event.courseIds;
        let param = {
            motherId: courseIds[0] || '',
            bigId: courseIds[1] || '',
            smallId: courseIds[2] || ''
        };
        value['motherId'] = courseIds[0] || '';
        value['bigId'] = courseIds[1] || '';
        value['smallId'] = courseIds[2] || '';
        let update;
        if (this.tbcId) {
            console.log('offeringCourseApi')
            update = this.offeringCourseApi.update(this.tbcId, value);
        } else {
            console.log('CourseService')
            update = this.courseService.update(value);
        }

        update.subscribe(
            course => {
                // if (param.motherId) {
                //     this.courseService.getsavecategory(param, course.id).subscribe(
                //         res => {
                //             this.loading = false;
                //             tipMessage('保存成功', 'success');
                //             this.router.navigate(['.'], { relativeTo: this.route, queryParams: { t: Math.random() } });
                //             this.course = course;
                //         }
                //     )
                // } else {
                this.loading = false;
                tipMessage('保存成功', 'success');
                this.router.navigate(['.'], { relativeTo: this.route, queryParams: { t: Math.random() } });
                this.course = course;
                // }
            },
            err => {
                this.loading = false;
                this.msg = [{ severity: 'danger', summary: '保存失败', detail: err, id: 1 }];
            }
        );
    }
}

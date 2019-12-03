import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UgcCourse } from '../../../entity/ugc-course';
import { UgcExampleCourse } from '../../../entity/ugc-example-course';
import { UgcExampleCourseService } from '../../../service/ugc-example-course.service';
import { NzMessageService } from 'ng-zorro-antd';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-ugc-example-course-chapter',
    templateUrl: './ugc-example-course-chapter.component.html',
    styleUrls: ['./ugc-example-course-chapter.component.scss']
})
export class UgcExampleCourseChapterComponent implements OnInit {

    ugcExampleCourse: UgcExampleCourse;
    editable: boolean = true;
    isCreate: boolean = false;
    constructor(
        private route: ActivatedRoute,
        private message: NzMessageService,
        private ugcActivityWorkService: UgcExampleCourseService
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { ugcExampleCourse: UgcExampleCourse }) => {
            this.ugcExampleCourse = data.ugcExampleCourse;
            if (!data.ugcExampleCourse.courseId || data.ugcExampleCourse.courseId == null) {
                this.ugcActivityWorkService.getOne(this.ugcExampleCourse.id).subscribe(
                    exampleCourse => {
                        this.ugcExampleCourse = exampleCourse;
                        this.updateCourseInfo();
                    },
                    err => {
                        tipMessage(err);
                    }
                )
            } else {
                this.updateCourseInfo();
            }
        })
    }

    updateCourseInfo() {
        this.ugcExampleCourse.course = new UgcCourse();
        this.ugcExampleCourse.course.id = this.ugcExampleCourse.courseId;
        this.ugcExampleCourse.course.name = this.ugcExampleCourse.courseName;
        this.ugcExampleCourse.course.imageUrl = this.ugcExampleCourse.courseImageUrl;
        this.ugcExampleCourse.course.intro = this.ugcExampleCourse.courseIntro;
    }

}

import { Forum } from './../../../../forum/ordinary-forum/entity/forum';
import { TrainingClass } from './../../../entity/training-class';
import { Course } from './../../../../learning/course/entity/course';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfferingCourseApiService } from '../../../service/offering-course-api.service';
import { Offering } from 'app/learning/offering/entity/offering';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-training-class-course-forum',
    templateUrl: './training-class-course-forum.component.html',
    styleUrls: ['./training-class-course-forum.component.scss']
})
export class TrainingClassCourseForumComponent implements OnInit {

    course: Course;
    trainingClass: TrainingClass;
    forum;

    constructor(
        private route: ActivatedRoute,
        private offeringCourseApi: OfferingCourseApiService,
    ) { }

    ngOnInit() {
        this.route.data.subscribe((data: { course: Course, trainingClass: any }) => {
            this.course = data.course;
            this.trainingClass = data.trainingClass;
        })
        this.getForum(this.trainingClass.id, this.course.id);
    }

    getForum(OfferingId: number, courseId: number) {
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
        this.offeringCourseApi.iniForum(this.trainingClass.id, this.course.id).subscribe(
            ok => {
                this.forum = ok;
            },
            err => {
                tipMessage(err);
            }
        );
    }

}

import { Course } from './../../../course/entity/course';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ClassroomService } from './../../service/classroom.service';
import { Classroom } from './../../entity/classroom';
import { Component, OnInit } from '@angular/core';
import { tipMessage } from 'app/account/entity/message-tip';

@Component({
    selector: 'spk-classroom-add',
    templateUrl: './classroom-add.component.html',
    styleUrls: ['./classroom-add.component.scss']
})
export class ClassroomAddComponent implements OnInit {

    course: Course = new Course();
    classroom: Classroom = new Classroom();
    loading: boolean = false;
    currentStep = 0;

    constructor(
        private classroomService: ClassroomService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.classroom = new Classroom();
    }

    prev() {
        this.currentStep--;
    }

    next() {
        this.currentStep++;
    }

    courseFormSubmit({ originalEvent, value }) {
        this.course = value;

        this._refreshClassroom();

        this.next();
    }

    _refreshClassroom() {

        this.classroom.name = /* this.classroom.name || */ this.course.name;
        this.classroom.userGroup = /* tthis.classroom.userGroup || */ this.course.userGroup;
        this.classroom.description = /* tthis.classroom.description || */ this.course.description;

        this.classroom.offeringCourse = {
            course: this.course
        };
    }

    classroomFormSubmit(event) { // {originalEvent, value}
        console.log(event.value);
        this.doSubmit(event);
    }

    doSubmit(event) {
        this.loading = true;
        this.classroomService.save(event.value).subscribe(
            classroom => {
                tipMessage('保存成功', 'success');
                this.classroom = classroom;
                this.next();
                this.loading = false;
            },
            err => {
                tipMessage('保存失败');
                this.loading = false;
            }
        );
    }

    addNext() {
        this.course = new Course();
        this.classroom = new Classroom();
        this.currentStep = 0;
    }

    goList() {
        this.router.navigate(['../list'], { relativeTo: this.route });
    }

    goDetail() {
        this.router.navigate(['../', this.classroom.id], { relativeTo: this.route });
    }
}

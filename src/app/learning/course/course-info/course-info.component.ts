import { ActivatedRoute, UrlSegment, Router } from '@angular/router';
import { Course } from './../entity/course';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'spk-course-info',
    templateUrl: './course-info.component.html',
    styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {

    course: Course;
    courseAssess: boolean = false;
    showTeachers;
    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        let url = this.router.url;
        this.showTeachers = url.indexOf('/learning/classroom') != -1;
    	this.route.data.subscribe((data: {course: Course, type: string}) => {
        this.course = data.course;
	      if (data.type) {
	        this.courseAssess = true;
	      }
        });
    }

}

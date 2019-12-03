import { CourseService } from './../../../learning/course/service/course.service';
import { RouterStateSnapshot } from '@angular/router';
import { Course } from './../../../learning/course/entity/course';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SubjectActivityCourseDetailResolver implements Resolve<Course> {
    constructor(private courseApi: CourseService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
        let courseId = route.paramMap.get('courseId');

        if (courseId) {
            return this.courseApi.getOne(courseId);
        } else {
            return Observable.of(null);
        }
    }
}

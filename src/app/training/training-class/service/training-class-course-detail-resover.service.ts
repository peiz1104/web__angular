import { CourseService } from './../../../learning/course/service/course.service';
import { RouterStateSnapshot } from '@angular/router';
import { Course } from './../../../learning/course/entity/course';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { OfferingCourseApiService } from '../../service/offering-course-api.service';

@Injectable()
export class TrainingClassCourseDetailResolver implements Resolve<Course> {
    constructor(private courseApi: OfferingCourseApiService) {
        console.log(courseApi)
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
        let tbcId = +route.paramMap.get('tbcId');
        let courseId = +route.paramMap.get('courseId');

        if (tbcId && courseId) {
            return this.courseApi.getCourse(tbcId, courseId);
        } else {
            return Observable.of(null);
        }
    }
}

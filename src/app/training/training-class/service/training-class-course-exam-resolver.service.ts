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
export class TrainingClassCourseExamResolver implements Resolve<any> {
    constructor(private courseApi: OfferingCourseApiService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let courseId = +route.paramMap.get('courseId');
        let tbcId = +route.paramMap.get('tbcId');

        if (courseId) {
            return this.courseApi.getCourse(tbcId, courseId).map(it => {
                it['offeringId'] = tbcId;
                return it;
            });
        } else {
            return Observable.of(null);
        }
    }
}

import { OfferingCourseApiService } from './offering-course-api.service';
import { Forum } from './../../forum/ordinary-forum/entity/forum';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class TrainingClassCourseForumResolver implements Resolve<Forum> {

    constructor(private router: Router, private offeringCourseApiService: OfferingCourseApiService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let tbcId = route.paramMap.get('tbcId');
        let courseId = route.paramMap.get('courseId');
        return this.offeringCourseApiService.getForum( tbcId, courseId)
            .map(forum => {
                return forum;
            })
            .catch(err => {
                return Observable.of(err);
            });
    }
}
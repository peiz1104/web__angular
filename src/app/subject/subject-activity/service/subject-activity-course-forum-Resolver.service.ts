import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { OfferingCourseApiService } from '../../../training/service/offering-course-api.service';
import { Forum } from '../../../forum/ordinary-forum/entity/forum';

@Injectable()
export class SubjectActivityCourseForumResolver implements Resolve<Forum> {

    constructor(private router: Router, private offeringCourseApiService: OfferingCourseApiService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let tbcId = route.paramMap.get('subjectId');
        let courseId = route.paramMap.get('courseId');
        return this.offeringCourseApiService.getForum(tbcId, courseId)
            .map(forum => {
                return forum;
            })
            .catch(err => {
                return Observable.of(err);
            });
    }
}

import { SubjectActivity } from './../../entity/subject-activity';
import { Forum } from './../../../forum/ordinary-forum/entity/forum';
import { SubjectActivityApiService } from './../../service/subject-activity-api.service';
import { Observable } from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class SubjectForumResolver implements Resolve<Forum> {

    constructor(private router: Router, private subjectActivityApiService: SubjectActivityApiService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SubjectActivity> {
        let id = route.paramMap.get('subjectId');

        return this.subjectActivityApiService.getForum(id)
            .map(forum => {
                return forum;
            })
            .catch(err => {
                // this.router.navigate(['/learning/classroom/list']);
                return Observable.of(err);
            });
    }
}

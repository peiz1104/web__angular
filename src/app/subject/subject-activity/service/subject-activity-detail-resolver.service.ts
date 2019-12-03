import { Router } from '@angular/router';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { SubjectActivity } from 'app/subject/entity/subject-activity';
import { SubjectActivityApiService } from '../../service/subject-activity-api.service';

@Injectable()
export class SubjectActivityDetailResolver implements Resolve<SubjectActivity> {
    constructor(
        private router: Router,
        private subjectActivityApi: SubjectActivityApiService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SubjectActivity> {
        let subjectId = +route.paramMap.get('subjectId');

        if (subjectId) {
            return this.subjectActivityApi.getOne(subjectId)
                .catch(err => {
                    this.toSubjectList();
                    return Observable.of(null);
                });
        } else {
            this.toSubjectList();
            return Observable.of(null);
        }

    }

    toSubjectList() {
        this.router.navigateByUrl('/subject/activity');
    }
}

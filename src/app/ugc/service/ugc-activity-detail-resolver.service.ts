import { Router } from '@angular/router';
import { UgcActivity } from 'app/ugc/entity/ugc-activity';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UgcActivityService } from 'app/ugc/service/ugc-activity.service';

@Injectable()
export class UgcActivityDetailResolver implements Resolve<UgcActivity> {
    constructor(
        private router: Router,
        private ugcActivityService: UgcActivityService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UgcActivity> {
        let activityId = +route.paramMap.get('activityId');

        if (activityId) {
            return this.ugcActivityService.getOne(activityId)
                .catch(err => {
                    this.toActivityList();
                    return Observable.of(null);
                });
        } else {
            this.toActivityList();
            return Observable.of(null);
        }

    }

    toActivityList() {
        this.router.navigateByUrl('/ugc/activity/list');
    }
}

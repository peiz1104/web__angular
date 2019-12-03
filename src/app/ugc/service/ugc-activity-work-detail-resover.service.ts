import { RouterStateSnapshot } from '@angular/router';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UgcActivityWorkService } from './ugc-activity-work.service';
import { UgcActivityWork } from '../entity/ugc-activity-work';

@Injectable()
export class UgcActivityWorkDetailResolver implements Resolve<UgcActivityWork> {
    constructor(private ugcActivityWorkService: UgcActivityWorkService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UgcActivityWork> {
        let workId = route.paramMap.get('workId');
        let activityId = route.paramMap.get('activityId');
        if (activityId && workId) {
            return this.ugcActivityWorkService.get(activityId, workId);
        } else {
            return Observable.of(null);
        }
    }
}

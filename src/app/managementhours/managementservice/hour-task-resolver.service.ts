import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HourService } from './hour.service';

@Injectable()
export class HourTaskDetailResolver implements Resolve<any> {
    constructor(private courseApi: HourService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let ruleId = route.paramMap.get('ruleId');
        let nowYear = route.paramMap.get('nowYear');

        if (ruleId || nowYear) {
            return this.courseApi.getHourRuleListSearchYear();
        } else {
            return Observable.of(null);
        }
    }
}

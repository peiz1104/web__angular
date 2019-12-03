import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HourService } from './hour.service';

@Injectable()
export class HourCarryoverDetailResolver implements Resolve<any> {
    constructor(
        private courseApi: HourService,
        private router: Router,
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        // let ruleId = route.paramMap.get('ruleId');
        // let nowYear = route.paramMap.get('nowYear');

        return this.courseApi.getCarryOverYear()
            .catch(err => {
                this.toTrainingList();
                return Observable.of(null);
            });
    }
    toTrainingList() {
        this.router.navigateByUrl('/classhour/houraduitmanage/hourauditdeclarelist');
    }
}

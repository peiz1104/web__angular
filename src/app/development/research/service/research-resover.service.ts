
import { RouterStateSnapshot } from '@angular/router';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ResearchService } from './research.service';

@Injectable()
export class StepDetailResolver implements Resolve<any> {
    constructor(private service: ResearchService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let stepId = route.paramMap.get('id');

        if (stepId) {
            return this.service.getsinglemessage(stepId);
        } else {
            return Observable.of(null);
        }
    }
}

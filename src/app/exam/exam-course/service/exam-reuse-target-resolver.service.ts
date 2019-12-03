import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export interface ExamTargetInfo {
    id: number;
    name: string;
    siteId?: number;
    siteName?: string;
    userGroupId?: number;
    userGroupName?: string;
    startDate?: Date;
    endDate?: Date;
    offeringId?: number;
}

export interface ExamTargetResolveData {
    target: ExamTargetInfo;
    type: 'OFFERING' | 'COURSE';
}

@Injectable()
export class ExamReuseTargetResolver implements Resolve<ExamTargetResolveData> {

    constructor(private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ExamTargetResolveData {
        let parent: ActivatedRouteSnapshot = route.parent;
        return {
            target: parent.data.target,
            type: 'COURSE'
        };
    }
}

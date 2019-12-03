import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpAdaptor } from './../../../../core/http/http-adaptor';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BaseService } from './../../../../core/service/base.service';
import { TrainingPlan } from './../entity/trainingplan';

@Injectable()
export class TrainingPlanHistoryService extends BaseService<TrainingPlan> {
    constructor(protected httpAdaptor: HttpAdaptor, private router: Router) {
        super(httpAdaptor.http, httpAdaptor, '/api/designatedplan/history');
    }
}

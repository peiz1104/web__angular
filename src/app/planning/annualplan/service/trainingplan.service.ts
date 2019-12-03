import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { BaseService } from './../../../core/service/base.service';
import { TrainingPlan } from './../entity/trainingplan';

@Injectable()
export class TrainingPlanService extends BaseService<TrainingPlan> {
    constructor(protected httpAdaptor: HttpAdaptor, private router: Router) {
        super(httpAdaptor.http, httpAdaptor, '/api/trainingplan');
    }

    resolve(id: number): Observable<TrainingPlan> {

        return this.getOne(id)
            .map(trainingPlan => {
                return trainingPlan;
            })
            .catch(err => {
                this.router.navigate(['../../list']);
                return Observable.of(err);
            });
    }

    save(trainingPlan: TrainingPlan) {
        return this.httpAdaptor.put(`${this.url}/${trainingPlan['id']}`, trainingPlan);
    }

}

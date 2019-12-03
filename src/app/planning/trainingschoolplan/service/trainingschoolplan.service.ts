import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BaseService } from './../../../core/service/base.service';
import { TrainingSchoolPlan } from 'app/planning/trainingschoolplan/entity/trainingschoolplan';

@Injectable()
export class TrainingSchoolPlanService extends BaseService<TrainingSchoolPlan> {
    constructor(protected httpAdaptor: HttpAdaptor, private router: Router) {
        super(httpAdaptor.http, httpAdaptor, '/api/trainingschoolplan');
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrainingSchoolPlan> {
        let id = route.paramMap.get('id');

        return this.getOne(id)
            .map(trainingSchool => {
                return trainingSchool;
            })
            .catch(err => {
                this.router.navigate(['/planning/trainingschoolplan/list']);
                return Observable.of(err);
            });
    }

    getAll() {
        return this.httpAdaptor.get(`${this.url}/all`);
    }

    approve(argus: any) {
        const ids = argus.selected.map(it => it.id);
        let message = argus.message;
        let approvalStatus = argus.operate;
        return this.httpAdaptor.post(`/api/trainingschoolplan/approve`, null,
            { params: { trainingIds: ids, message: message, operate: approvalStatus } }
        );
    }

}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BaseService } from './../../../core/service/base.service';
import { TrainingSchool } from './../entity/trainingschool';

@Injectable()
export class TrainingSchoolService extends BaseService<TrainingSchool> {
    constructor(protected httpAdaptor: HttpAdaptor, private router: Router) {
        super(httpAdaptor.http, httpAdaptor, '/api/trainingschool');
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrainingSchool> {
        let id = route.paramMap.get('id');

        return this.getOne(id)
            .map(trainingSchool => {
                return trainingSchool;
            })
            .catch(err => {
                this.router.navigate(['/planning/trainingschool/list']);
                return Observable.of(err);
            });
    }

    getAll() {
        return this.httpAdaptor.get(`${this.url}/all`);
    }

    checkIsCreated(trainingSchool: TrainingSchool) {
        return this.httpAdaptor.get(`${this.url}/created`, { params: { id: trainingSchool.id, name: trainingSchool.name } });
    }

}

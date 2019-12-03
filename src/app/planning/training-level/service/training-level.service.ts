import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BaseService } from './../../../core/service/base.service';
import { TrainingLevel } from './../entity/training-level';

@Injectable()
export class TrainingLevelService extends BaseService<TrainingLevel> {
    constructor(protected httpAdaptor: HttpAdaptor, private router: Router) {
        super(httpAdaptor.http, httpAdaptor, '/api/planning/traininglevel');
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrainingLevel> {
        let id = route.paramMap.get('id');

        return this.getOne(id)
            .map(trainingLevel => {
                return trainingLevel;
            })
            .catch(err => {
                this.router.navigate(['/planning/traininglevel/list']);
                return Observable.of(err);
            });
    }

    getAllTrainingClassification() {
        return this.httpAdaptor.get('/api/planning/trainingclassification/all');
    }

    getAllByTrainingClassification(id: number) {
        return this.httpAdaptor.get(`/api/planning/traininglevel/all/${id}`);
    }

    checkIsCreated(trainingLevel: TrainingLevel, trainingClassificationId: number) {
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.get(`${this.url}/created`, { params: { id: trainingLevel.id, name: trainingLevel.name, trainingClassificationId: trainingClassificationId, isAdust: trainingLevel.isAdjust } });
    }
}

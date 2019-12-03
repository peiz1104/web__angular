import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BaseService } from './../../../core/service/base.service';
import { TrainingClassification } from './../entity/training-classification';

@Injectable()
export class TrainingClassificationService extends BaseService<TrainingClassification> {
    constructor(protected httpAdaptor: HttpAdaptor, private router: Router) {
        super(httpAdaptor.http, httpAdaptor, '/api/planning/trainingclassification');
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrainingClassification> {
        let id = route.paramMap.get('id');

        return this.getOne(id)
            .map(trainingClassification => {
                return trainingClassification;
            })
            .catch(err => {
                this.router.navigate(['/planning/trainingclassification/list']);
                return Observable.of(err);
            });
    }

    getAllPersonnelClassification() {
        return this.httpAdaptor.get('/api/planning/personnelclassification/all');
    }

    getAllByPersonnelClassification(id: number) {
        return this.httpAdaptor.get(`/api/planning/trainingclassification/all/${id}`);
    }

    checkIsCreated(trainingClassification: TrainingClassification, personnelClassificationId: number) {
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.get(`${this.url}/created`, { params: { id: trainingClassification.id, name: trainingClassification.name, personnelClassificationId: personnelClassificationId } });
    }

}

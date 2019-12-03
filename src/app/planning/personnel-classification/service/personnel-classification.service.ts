import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BaseService } from './../../../core/service/base.service';
import { PersonnelClassification } from './../entity/personnel-classification';

@Injectable()
export class PersonnelClassificationService extends BaseService<PersonnelClassification> {
    constructor(protected httpAdaptor: HttpAdaptor, private router: Router) {
        super(httpAdaptor.http, httpAdaptor, '/api/planning/personnelclassification');
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PersonnelClassification> {
        let id = route.paramMap.get('id');

        return this.getOne(id)
            .map(personnelClassification => {
                return personnelClassification;
            })
            .catch(err => {
                this.router.navigate(['/planning/personnelclassification/list']);
                return Observable.of(err);
            });
    }

    getAll() {
        return this.httpAdaptor.get(`${this.url}/all`);
    }

    checkIsCreated(personnelClassification: PersonnelClassification) {
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.get(`${this.url}/created`, { params: { id: personnelClassification.id, name: personnelClassification.name } });
    }

    getAllTrainingSettingAttributes() {
        return this.httpAdaptor.get(`${this.url}/attributes`);
    }

}

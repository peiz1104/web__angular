import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpAdaptor } from './../../../../core/http/http-adaptor';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BaseService } from './../../../../core/service/base.service';
import { InnerGroup } from './../entity/innergroup';

@Injectable()
export class InnerGroupService extends BaseService<InnerGroup> {
    constructor(protected httpAdaptor: HttpAdaptor, private router: Router) {
        super(httpAdaptor.http, httpAdaptor, '/api/trainingschool/inner');
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InnerGroup> {
        let id = route.paramMap.get('id');

        return this.getOne(id)
            .map(innerGroup => {
                return innerGroup;
            })
            .catch(err => {
                this.router.navigate(['/planning/trainingschool/']);
                return Observable.of(err);
            });
    }

}

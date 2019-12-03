import { RouterStateSnapshot } from '@angular/router';
import { BusinessEntityApiService } from './business-entity-api.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BusinessEntityDetailResolver implements Resolve<any> {
    constructor(private entityApi: BusinessEntityApiService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        // let entityIdentifier = route.paramMap.get('entityIdentifier');
        let entityId = route.paramMap.get('entityId');

        if (entityId) {
            return this.entityApi.getOne(entityId);
        } else {
            return Observable.of(null);
        }
    }

}

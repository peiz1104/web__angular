
import { RouterStateSnapshot } from '@angular/router';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ResearchService } from './research.service';

@Injectable()
export class StageResolver implements Resolve<any> {
    constructor(private service: ResearchService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let phaseId = route.paramMap.get('editId');
        let id = route.paramMap.get('id');

        if (phaseId && id) {
            return this.service.getdevstageDetail(id, phaseId);
        } else {
            return Observable.of(null);
        }
    }
}

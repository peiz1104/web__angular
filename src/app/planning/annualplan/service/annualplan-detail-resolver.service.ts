import { Observable } from 'rxjs/Observable';
import { AnnualplanService } from './annualplan.service';
import { AnnualPlan } from './../entity/annualplan';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AnnualplanDetailResolverService implements Resolve<AnnualPlan> {

    constructor(private annualplanService: AnnualplanService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AnnualPlan> {
        let id = route.paramMap.get('id');

        return this.annualplanService.getOne(id)
            .map(annualPlan => {
                return annualPlan;
            })
            .catch(err => {
                this.router.navigate(['/planning/annualplan/list']);
                return Observable.of(err);
            });
    }
}

import { Observable } from 'rxjs/Observable';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AnnualSubPlan } from './../entity/annualsubplan';
import { TrainingPlanService } from './trainingplan.service';
import { ResearchPlanService } from './researchplan.service';
import { OtherPlanService } from './otherplan.service';

@Injectable()
export class AnnualSubPlanDetailResolverService implements Resolve<AnnualSubPlan> {

    constructor(
        private router: Router,
        private trainingPlanService: TrainingPlanService,
        private researchPlanService: ResearchPlanService,
        private otherPlanService: OtherPlanService,
    ) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AnnualSubPlan> {
        let id = route.paramMap.get('id');
        let planType = route.paramMap.get('planType');
        let service;
        if (planType == 'RE' || planType == 'REH') {
            service = this.researchPlanService;
            if (planType == 'REH') {
                service.url = "/api/researchplan/history";
            } else {
                service.url = "/api/researchplan";
            }
        } else if (planType == 'EL' || planType == 'ELH') {
            service = this.otherPlanService;
            if (planType == 'ELH') {
                service.url = "/api/otherplan/history";
            } else {
                service.url = "/api/otherplan";
            }
        } else {
            service = this.trainingPlanService
            if (planType == 'CTH' || planType == 'CDH' || planType == 'OTH' || planType == 'ODH') {
                service.url = "/api/trainingplan/history";
            } else {
                service.url = "/api/trainingplan";
            }
        }
        return service.getOne(id)
            .map(annualSubPlan => {
                return annualSubPlan;
            })
            .catch(err => {
                this.router.navigate([this.router.routerState.snapshot.url]);
                return Observable.of(err);
            });
    }
}

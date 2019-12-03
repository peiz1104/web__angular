import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpAdaptor } from './../../../../core/http/http-adaptor';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BaseService } from './../../../../core/service/base.service';
import { TrainingPlan } from './../entity/trainingplan';
import { TrainingPlanHistoryService } from './trainingplanhistory.service';
import { Pagination } from './../../../../core/entity/pagination';

@Injectable()
export class TrainingPlanService extends BaseService<TrainingPlan> {
    constructor(
        protected httpAdaptor: HttpAdaptor,
        private router: Router,
        private trainingPlanHistoryService: TrainingPlanHistoryService
    ) {
        super(httpAdaptor.http, httpAdaptor, '/api/designatedplan');
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrainingPlan> {
        let id = route.paramMap.get('id');
        let planType = route.paramMap.get('planType');
        let service;
        if (planType == 'CTH') {
            service = this.trainingPlanHistoryService;
        } else {
            service = this;
        }
        return service.getOne(id)
            .map(trainingPlan => {
                return trainingPlan;
            })
            .catch(err => {
                this.router.navigate([this.router.routerState.snapshot.url]);
                return Observable.of(err);
            });
    }

    commitToApproval(ids: number[]) {
        return this.httpAdaptor.post(`/api/designatedplan/approvalStatus`, null, { params: { approvalStatus: 'A', ids: ids } });
    }

    cancelApproval(ids: number[]) {
        return this.httpAdaptor.post(`/api/designatedplan/approvalStatus`, null, { params: { approvalStatus: 'N', ids: ids } });
    }

    approve(argus: any) {
        let ids = [];
        let selected = argus.selected;
        let message = argus.message;
        let operate = argus.operate;
        // tslint:disable-next-line:forin
        for (let i in selected) {
            ids.push(selected[i].id);
        }
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.post(`/api/designatedplan/approve`, null, { params: { ids: ids, message: message, operate: operate } });
    }

    getAllHistoryPlan(id: number) {
        return this.httpAdaptor.get('/api/designatedplan/history', { params: { id: id } });
    }

    getApprovalInfo(id: number) {
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.get('/api/designatedplan/approve', { params: { id: id } });
    }

    import(annualPlanId: number, fullPath: string) {
        return this.httpAdaptor.post(`/api/designatedplan/import`, null, { params: { annualPlanId: annualPlanId, fullPath: fullPath } });
    }

    copy(plan: TrainingPlan) {
        return this.httpAdaptor.post(`/api/designatedplan/copy`, null,
            { params: { id: plan.id, annualPlanId: plan.annualPlanId, copyCount: plan.copyCount } });
    }

    download(type: string) {
        window.location.href = '/api/annualsubplan/download?type=' + type;
    }

    getLastYearPlan(params?: any, page?: Pagination<any>) {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }
        return this.httpAdaptor.get('/api/designatedplan/lastYear', { params: params });
    }

    copyLastYear(entity: TrainingPlan[], annualPlanId: number) {
        let ids = [];
        // tslint:disable-next-line:forin
        for (let i in entity) {
            ids.push(entity[i].id);
        }
        return this.httpAdaptor.post(`/api/designatedplan/copyLastyear`, null, { params: { ids: ids, annualPlanId: annualPlanId } });
    }

}

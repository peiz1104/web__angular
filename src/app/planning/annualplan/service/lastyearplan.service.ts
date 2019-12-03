import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { BaseService } from './../../../core/service/base.service';
import { AnnualSubPlan } from './../entity/annualsubplan';

@Injectable()
export class LastYearPlanService extends BaseService<AnnualSubPlan> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/annualsubplan/lastyear');
    }

    copy(entity: AnnualSubPlan[], annualPlanId: number) {
        let trainingIds = [];
        let researchIds = [];
        let otherIds = [];
        for (let i in entity) {
            if (entity[i].planType == 'RE') {
                // 课件研发
                researchIds.push(entity[i].id);
            } else if (entity[i].planType == 'EL') {
                // 其它
                otherIds.push(entity[i].id);
            } else {
                // 培训计划
                trainingIds.push(entity[i].id);
            }
        }
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.post(`/api/annualsubplan/lastyear/copy`, null, { params: { trainingIds: trainingIds, researchIds: researchIds, otherIds: otherIds, annualPlanId: annualPlanId } });
    }

}

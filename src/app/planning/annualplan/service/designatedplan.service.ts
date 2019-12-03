import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { BaseService } from './../../../core/service/base.service';
import { AnnualSubPlan } from './../entity/annualsubplan';

@Injectable()
export class DesignatedPlanService extends BaseService<AnnualSubPlan> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/designatedplan/introduce');
    }

    introduce(entity: AnnualSubPlan[], annualPlanId: number) {
        let trainingIds = [];
        // tslint:disable-next-line:forin
        for (let i in entity) {
            // 培训计划
            trainingIds.push(entity[i].id);
        }
        // tslint:disable-next-line:max-line-length
        return this.httpAdaptor.post(`/api/annualsubplan/introduce`, null, { params: { trainingIds: trainingIds, annualPlanId: annualPlanId } });
    }

}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { BaseService } from './../../../core/service/base.service';
import { DesignatedPlan } from './../entity/designatedplan';
import { Pagination } from './../../../core/entity/pagination';
import { FormDataUtil } from './../../../core/utils/form-data-util';

@Injectable()
export class DesignatedPlanService extends BaseService<DesignatedPlan> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/annualplan');
    }

    getCurrentUser() {
        return this.httpAdaptor.get('/api/account');
    }

    getAnnualPlan(params?: any, page?: Pagination<DesignatedPlan>) {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get('/api/designatedplan/getannualplan', { params: param });
    }

}

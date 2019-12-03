import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { BaseService } from './../../../core/service/base.service';
import { ResearchPlan } from './../entity/researchplan';

@Injectable()
export class ResearchPlanService extends BaseService<ResearchPlan> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/researchplan');
    }

}

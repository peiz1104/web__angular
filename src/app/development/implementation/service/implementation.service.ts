import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService, HttpAdaptor, Pagination, HttpUtils } from "app/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from 'app/system/entity/user';
import { ResearchPlan } from "app/planning/annualplan/entity/researchplan";


@Injectable()
export class ImplementationService extends BaseService<ResearchPlan> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/executable');
    }
    pageList(params?: any): Observable<Pagination<ResearchPlan>> {
        return this.http.get('/api/executable/plan', { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }


    addProject(ids: number[]): Observable<void> {
        let formdata = new FormData();
        formdata.append("ids", ids.toString());
        return this.http.post('/api/green/dream/project/add/list', formdata)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }


      // 获取单个项目信息
      getsinglemessage(id) {
        return this.http.get(`/api/researchplan/${id}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

}

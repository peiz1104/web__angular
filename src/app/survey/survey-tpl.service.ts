import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BaseService, HttpAdaptor, Pagination, FormDataUtil } from 'app/core';
import { Survey } from './survey.model';

@Injectable()
export class SurveyTplService extends BaseService<Survey> {

    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/survey/tpls');
    }

    publish(ids: any[]): Observable<void> {
        return super.batchOperate('publish', ids);
    }

    disPublish(ids: any[]): Observable<void> {
        return super.batchOperate('disPublish', ids);
    }

    lookup(params?: any, page?: Pagination<Survey>): Observable<Pagination<Survey>> {
        params = params || {};
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`${this.url}/lookup`, { params: param });
    }
}

import { BaseService, HttpAdaptor, FormDataUtil, Pagination } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UgcActivityAuditor } from "./../entity/ugc-activity-auditor";

@Injectable()
export class UgcActivityAuditorService extends BaseService<UgcActivityAuditor> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/ugc/activities');
    }

    getAllOfPage(ugcActivityId: number, params?: any, page?: Pagination<UgcActivityAuditor>) {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/auditors`, { params: param });
    }

    get(ugcActivityId: number, id: number): Observable<UgcActivityAuditor> {
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/auditors/${id}`);
    }

    add(ugcActivityId: number, ids: number[]): Observable<any> {
        return this.httpAdaptor.put(`${this.url}/${ugcActivityId}/auditors`, ids);
    };

    // edit(ugcActivityId: number, entity: UgcActivityAuditor): Observable<UgcActivityAuditor> {
    //     let formData: FormData = FormDataUtil.covert(entity);
    //     return this.httpAdaptor.post(`${this.url}/${ugcActivityId}/auditors/${entity.id}`, formData);
    // }

    deleted(ugcActivityId: number, ids: number[]): Observable<any> {
        return this.httpAdaptor.delete(`${this.url}/${ugcActivityId}/auditors`, { params: { ids: ids } });
    }

    addScope(ugcActivityId: number, entity: UgcActivityAuditor): Observable<UgcActivityAuditor> {
        let formData: FormData = FormDataUtil.covert(entity);
        return this.httpAdaptor.post(`${this.url}/${ugcActivityId}/auditors/${entity.id}`, formData );
    };
}

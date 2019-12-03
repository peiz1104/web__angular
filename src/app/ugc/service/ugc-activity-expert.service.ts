import { BaseService, HttpAdaptor, FormDataUtil, Pagination } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UgcActivityExpert } from './../entity/ugc-activity-expert';

@Injectable()
export class UgcActivityExpertService extends BaseService<UgcActivityExpert> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/ugc/activities');
    }

    getAllOfPage(ugcActivityId: number, params?: any, page?: Pagination<UgcActivityExpert>) {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/experts`, { params: param });
    }

    get(ugcActivityId: number, id: number): Observable<UgcActivityExpert> {
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/experts/${id}`);
    }

    add(ugcActivityId: number, ids: number[]): Observable<any> {
        return this.httpAdaptor.put(`${this.url}/${ugcActivityId}/experts`, ids);
    };

    edit(ugcActivityId: number, entity: UgcActivityExpert): Observable<UgcActivityExpert> {
        let formData: FormData = FormDataUtil.covert(entity);
        return this.httpAdaptor.post(`${this.url}/${ugcActivityId}/experts/${entity.id}`, formData);
    }

    deleted(ugcActivityId: number, ids: number[]): Observable<any> {
        return this.httpAdaptor.delete(`${this.url}/${ugcActivityId}/experts`, { params: { ids: ids } });
    }

}

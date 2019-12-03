import { BaseService, HttpAdaptor, FormDataUtil, Pagination } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UgcActivityAward } from "./../entity/ugc-activity-award";
import { UgcActivityWork } from '../entity/ugc-activity-work';

@Injectable()
export class UgcActivityAwardService extends BaseService<UgcActivityAward> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/ugc/activities');
    }

    getAllOfPage(ugcActivityId: number, params?: any, page?: Pagination<UgcActivityAward>) {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/awards`, { params: param });
    }

    getAllUnselectedOfPage(ugcActivityId: number,  params?: any, page?: Pagination<UgcActivityWork>) {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/works/notIsAwardList`, { params: param });
    }

    get(ugcActivityId: number, id: number): Observable<UgcActivityAward> {
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/awards/${id}`);
    }

    add(ugcActivityId: number, ids: number[]): Observable<UgcActivityAward> {
        return this.httpAdaptor.put(`${this.url}/${ugcActivityId}/awards`, ids);
    };

    edit(ugcActivityId: number, entity: UgcActivityAward): Observable<UgcActivityAward> {
        let formData: FormData = FormDataUtil.covert(entity);
        return this.httpAdaptor.post(`${this.url}/${ugcActivityId}/awards/${entity.id}`, formData);
    }


    publish(ugcActivityId: number, ids: number[]): Observable<any> {
        let formData = FormDataUtil.toArrayFileds('ids', ids);
        return this.httpAdaptor.post(`${this.url}/${ugcActivityId}/awards/publish`, formData);
    }
    cancel(ugcActivityId: number, ids: number[]): Observable<any> {
        let formData = FormDataUtil.toArrayFileds('ids', ids);
        return this.httpAdaptor.post(`${this.url}/${ugcActivityId}/awards/cancel`, formData);
    }

    deleted(ugcActivityId: number, ids: number[]): Observable<any> {
        return this.httpAdaptor.delete(`${this.url}/${ugcActivityId}/awards`, { params: { ids: ids } });
    }

}

import { BaseService, HttpAdaptor, FormDataUtil, Pagination } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UgcActivityWork } from "./../entity/ugc-activity-work";

@Injectable()
export class UgcActivityWorkService extends BaseService<UgcActivityWork> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/ugc/activities');
    }

    getAllOfPage(ugcActivityId: number, params?: any, page?: Pagination<UgcActivityWork>) {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/works`, { params: param });
    }

    get(ugcActivityId: any, id: any): Observable<UgcActivityWork> {
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/works/${id}`);
    }
    saveOrUpdate(ugcActivityId: number, entity: UgcActivityWork) {
        if (!entity) {
            return Observable.of(null);
        }

        if (entity['id']) {
            return this.edit(ugcActivityId, entity);
        } else {
            return this.add(ugcActivityId, entity);
        }
    }

    add(ugcActivityId: number, entity: UgcActivityWork): Observable<UgcActivityWork> {
        return this.httpAdaptor.put(`${this.url}/${ugcActivityId}/works`, entity);
    };

    edit(ugcActivityId: number, entity: UgcActivityWork): Observable<UgcActivityWork> {
        let formData: FormData = FormDataUtil.covert(entity);
        return this.httpAdaptor.post(`${this.url}/${ugcActivityId}/works/${entity.id}`, formData);
    }
    updateStatus(ugcActivityId: number, id: number, params: any) {
        let param: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`${this.url}/${ugcActivityId}/works/${id}/status`, param);
    }

    deleted(ugcActivityId: number, ids: number[]): Observable<any> {
        return this.httpAdaptor.delete(`${this.url}/${ugcActivityId}/works`, { params: { ids: ids } });
    }

    excellent(ugcActivityId: number, ids: number[]) {
        let formData = FormDataUtil.toArrayFileds('ids', ids);
        return this.httpAdaptor.post(`${this.url}/${ugcActivityId}/works/excellent`, formData);
    }

    disExcellent(ugcActivityId: number, ids: number[]): Observable<any> {
        let formData = FormDataUtil.toArrayFileds('ids', ids);
        return this.httpAdaptor.post(`${this.url}/${ugcActivityId}/works/disExcellent`, formData);
    }

}

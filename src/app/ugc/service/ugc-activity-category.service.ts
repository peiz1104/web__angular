import { BaseService, HttpAdaptor, FormDataUtil, Pagination } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UgcActivityCategory } from '../entity/ugc-activity-category';

@Injectable()
export class UgcActivityCategoryService extends BaseService<UgcActivityCategory> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/ugc/activities');
    }

    getAllOfPage(ugcActivityId: number, params?: any, page?: Pagination<UgcActivityCategory>) {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };

        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/categories`, { params: param });
    }

    get(ugcActivityId: number, id: number): Observable<UgcActivityCategory> {
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/categories/${id}`);
    }

    add(ugcActivityId: number, entity: UgcActivityCategory): Observable<UgcActivityCategory> {
        return this.httpAdaptor.put(`${this.url}/${ugcActivityId}/categories`, entity);
    };

    edit(ugcActivityId: number, entity: UgcActivityCategory): Observable<UgcActivityCategory> {
        let formData: FormData = FormDataUtil.covert(entity);
        return this.httpAdaptor.post(`${this.url}/${ugcActivityId}/categories/${entity.id}`, formData);
    }

    deleted(ugcActivityId: number, ids: number[]): Observable<any> {
         return this.httpAdaptor.delete(`${this.url}/${ugcActivityId}/categories`, { params: { ids: ids } });
    }


    moveUp(ugcActivityId: number, id: number, params?: any, page?: Pagination<UgcActivityCategory>): Observable<any> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`${this.url}/${ugcActivityId}/categories/${id}/up`, formData);
    }

    moveDown(ugcActivityId: number, id: number, params?: any, page?: Pagination<UgcActivityCategory>): Observable<any> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`${this.url}/${ugcActivityId}/categories/${id}/down`, formData);
    }

}

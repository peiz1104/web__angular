import { BaseService, HttpAdaptor, FormDataUtil, Pagination } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UgcActivity } from "./../entity/ugc-activity";
import { Forum } from '../../forum/ordinary-forum/entity/forum';
@Injectable()
export class UgcActivityService extends BaseService<UgcActivity> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/ugc/activities');
    }

    getAllOfPage(params?: any, page?: Pagination<UgcActivity>) {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(this.url, { params: param });
    }

    addCondition(id: number): Observable<any | null> {
        return this.httpAdaptor.post(`${this.url}/${id}/addCondition`, null);
    }

    initNoticeBox(id: number, noticeId: number): Observable<any | null> {
        return this.httpAdaptor.post(`${this.url}/${id}/initNoticeBox`, null);
    }

    getForum(id: any): Observable<Forum> {
        return this.httpAdaptor.get(`${this.url}/${id}/Forum`);
    }


    publish(ids: number[]): Observable<any> {
        let formData = FormDataUtil.toArrayFileds('ids', ids);
        return this.httpAdaptor.post(`${this.url}/publish`, formData);
    }
    cancel(ids: number[]): Observable<any> {
        let formData = FormDataUtil.toArrayFileds('ids', ids);
        return this.httpAdaptor.post(`${this.url}/cancel`, formData);
    }
}

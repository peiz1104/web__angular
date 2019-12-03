import { BaseService, HttpAdaptor, FormDataUtil, Pagination } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UgcActivityVote } from "./../entity/ugc-activity-vote";

@Injectable()
export class UgcActivityVoteService extends BaseService<UgcActivityVote> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/ugc/activities');
    }

    getAllOfPage(ugcActivityId: number, params?: any, page?: Pagination<UgcActivityVote>) {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/votes`, { params: param });
    }

    get(ugcActivityId: number, id: number): Observable<UgcActivityVote> {
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/votes/${id}`);
    }

    add(ugcActivityId: number, entity: UgcActivityVote): Observable<UgcActivityVote> {
        return this.httpAdaptor.put(`${this.url}/${ugcActivityId}/votes`, entity);
    };

    edit(ugcActivityId: number, entity: UgcActivityVote): Observable<UgcActivityVote> {
        let formData: FormData = FormDataUtil.covert(entity);
        return this.httpAdaptor.post(`${this.url}/${ugcActivityId}/votes/${entity.id}`, formData);
    }

    deleted(ugcActivityId: number, ids: number[]): Observable<any> {
        return this.httpAdaptor.delete(`${this.url}/${ugcActivityId}/votes`, { params: { ids: ids } });
    }

}

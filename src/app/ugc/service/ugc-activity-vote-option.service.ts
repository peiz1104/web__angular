import { BaseService, HttpAdaptor, FormDataUtil, Pagination } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UgcActivityVoteOption } from "./../entity/ugc-activity-vote-option";
import { UgcActivityWork } from 'app/ugc/entity/ugc-activity-work';

@Injectable()
export class UgcActivityVoteOptionService extends BaseService<UgcActivityVoteOption> {

    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/ugc/activities');
    }

    getAllOptionsOfPage(ugcActivityId: number, voteId: number, params?: any, page?: Pagination<UgcActivityVoteOption>) {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/votes/${voteId}/options`, { params: param });
    }
    getAllUnselectedOfPage(ugcActivityId: number, voteId: number, params?: any, page?: Pagination<UgcActivityWork>) {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/votes/${voteId}/options/unselected`, { params: param });
    }


    add(ugcActivityId: number, voteId: number, workIds: number[]): any {
        return this.httpAdaptor.put(`${this.url}/${ugcActivityId}/votes/${voteId}/options`, workIds);
    };

    deleteOptions(ugcActivityId: number, voteId: number, ids: any[]): Observable<any> {
        return this.httpAdaptor.delete(`${this.url}/${ugcActivityId}/votes/${voteId}/options`, { params: { ids: ids } });
    }

    edit(ugcActivityId: number, entity: UgcActivityVoteOption): Observable<UgcActivityVoteOption> {
        let formData: FormData = FormDataUtil.covert(entity);
        return this.httpAdaptor.post(`${this.url}/${ugcActivityId}/votes/${entity.id}`, formData);
    }


}

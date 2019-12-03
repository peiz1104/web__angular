import { BaseService, HttpAdaptor, FormDataUtil, Pagination } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UgcActivityEnrollment } from "./../entity/ugc-activity-enrollment";
import { User } from 'app/system/entity/user';

@Injectable()
export class UgcActivityEnrollmentService extends BaseService<UgcActivityEnrollment> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/ugc/activities');
    }

    getAllOfPage(ugcActivityId: number, params?: any, page?: Pagination<UgcActivityEnrollment>) {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/enrollments`, { params: param });
    }

    get(ugcActivityId: number, id: number): Observable<UgcActivityEnrollment> {
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/enrollments/${id}`);
    }

    getDistinctList(ugcActivityId: number, params?: any, page?: Pagination<UgcActivityEnrollment>): Observable<User> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/enrollments/distinctEnrollments`, { params: param });
    }


    notEnrollments(ugcActivityId: number, params?: any, page?: Pagination<UgcActivityEnrollment>): Observable<User> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`${this.url}/${ugcActivityId}/enrollments/notEnrollments`, { params: param });
    }

    add(ugcActivityId: number, ids: number[]): Observable<UgcActivityEnrollment> {
        return this.httpAdaptor.put(`${this.url}/${ugcActivityId}/enrollments`, ids);
    };

    edit(ugcActivityId: number, entity: UgcActivityEnrollment): Observable<UgcActivityEnrollment> {
        let formData: FormData = FormDataUtil.covert(entity);
        return this.httpAdaptor.post(`${this.url}/${ugcActivityId}/enrollments/${entity.id}`, formData);
    }

    deleted(ugcActivityId: number, ids: number[]): Observable<any> {
        return this.httpAdaptor.delete(`${this.url}/${ugcActivityId}/enrollments`, { params: { ids: ids } });
    }

}

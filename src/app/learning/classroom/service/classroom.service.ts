import { Pagination } from './../../../core/entity/pagination';
import { FormDataUtil } from './../../../core/utils/form-data-util';
import { Observable } from 'rxjs/Observable';
import { Classroom } from './../entity/classroom';
import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { BaseService } from './../../../core/service/base.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Forum } from '../../../forum/ordinary-forum/entity/forum';

@Injectable()
export class ClassroomService extends BaseService<Classroom> {

    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/classrooms');
    }

    publish(ids: number[]): Observable<any> {
         return this.httpAdaptor.post(`${this.url}/publish`, null, {params: {ids: ids}});
    }
    cancel(ids: number[]): Observable<any> {
        let formData = FormDataUtil.toArrayFileds('ids', ids);
        return this.httpAdaptor.post(`${this.url}/cancel`, formData);
    }
    getCanRecommends(params?: any, page?: Pagination<Classroom>): Observable<Pagination<Classroom>> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }
        return this.httpAdaptor.get(`${this.url}/canRecommend`, {params: params});
    }

    refresh(offeringId, courseId): Observable<any> {
        return this.httpAdaptor.post(`/api/offering/${offeringId}/course/${courseId}/performace/refresh`, null);
    }

    performance(classroomId: number, params?: any, page?: any): Observable<Pagination<any>> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }
        return this.httpAdaptor.get(`${this.url}/${classroomId}/performance`, {params: params});
    }
    getForum(id: any): Observable<Forum> {
        return this.httpAdaptor.get(`${this.url}/${id}/Forum`);
    }

    exportCreate(classroomId: number, params?: any): Observable<void> {
        return this.httpAdaptor.get(`${this.url}/${classroomId}/performanceExport`, { params: params });
    }

    getCourseStatus(params): Observable<any> {
        return this.httpAdaptor.get(`/api/course/learner/info-list`, {params})
    }
    exportDatas(params): Observable<any> {
        return this.httpAdaptor.get(`/api/course/learner/export-info-list`, {params})
    }
}

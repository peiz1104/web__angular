import { UgcExampleCourse } from './../entity/ugc-example-course';
import { BaseService, HttpAdaptor, FormDataUtil, Pagination } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UgcExampleCourseService extends BaseService<UgcExampleCourse> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/ugc/example-courses');
    }


    getAllOfPage(params?: any, page?: Pagination<UgcExampleCourse>) {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(this.url, { params: param });
    }


    saveOrUpdate(entity: UgcExampleCourse) {
        if (!entity) {
            return Observable.of(null);
        }

        if (entity['id']) {
            return this.edit(entity);
        } else {
            return this.add(entity);
        }
    }

    add( entity: UgcExampleCourse): Observable<UgcExampleCourse> {
        return this.httpAdaptor.put(`${this.url}`, entity);
    };

    edit(entity: UgcExampleCourse): Observable<UgcExampleCourse> {
        let formData: FormData = FormDataUtil.covert(entity);
        return this.httpAdaptor.post(`${this.url}/${entity.id}`, formData );
    }

    publish(ids: number[]): Observable<any> {
        let formData = FormDataUtil.toArrayFileds('ids', ids);
        return this.httpAdaptor.post(`${this.url}/publish`, formData);
    }
    cancel(ids: number[]): Observable<any> {
        let formData = FormDataUtil.toArrayFileds('ids', ids);
        return this.httpAdaptor.post(`${this.url}/cancel`, formData);
    }

    moveUp(courseId: number, params?: any, page?: Pagination<UgcExampleCourse>): Observable<any> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }
        return this.httpAdaptor.post(`${this.url}/${courseId}/up`, { params: params });
    }

    moveDown(courseId: number, params?: any, page?: Pagination<UgcExampleCourse>): Observable<any> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        }
        return this.httpAdaptor.post(`${this.url}/${courseId}/down`, { params: params });
    }

}

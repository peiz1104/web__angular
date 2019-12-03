import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpAdaptor } from './../../../core/http/http-adaptor';
import { BaseService } from './../../../core/service/base.service';
import { Course } from './../entity/course';
import { OnlineCourse } from './../entity/online-course';
import { FormDataUtil } from 'app/core/utils/form-data-util';
import { Pagination } from 'app/core/entity/pagination';

@Injectable()
export class CourseService extends BaseService<Course> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/courses/');
    }
    getsavecategoryType(courseId) {
        return this.httpAdaptor.get(`/api/coursetype/${courseId}/getcategory`);
    }
    getsavecategoryTypenew(courseId) {
      return this.httpAdaptor.get(`/api/coursetype/${courseId}/getcategorynew`);
    }
    getsavecategory(param, courseId) {
        return this.httpAdaptor.get(`/api/coursetype/${courseId}/savecategory`, { params: param });
    }
    getCourseData(id?: any) {
        return this.httpAdaptor.get(`/api/coursetype/categorylist`);
    }
    getDesigntedPlanId(id?: any) {
        return this.httpAdaptor.get(`/api/trainingplan/designated/${id}`);
    }

    addcourse(params?: any) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/designatedplan/addcourse`, formData);
    }

    deletecourse(params?: any) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.post(`/api/designatedplan/deletecourse`, formData);
    }

    getaddcourse(params?: any) {
        return this.httpAdaptor.get(`/api/designatedplan/getaddcourse`, { params: params });
    }
    getnewcourse(params?: any) {
        return this.httpAdaptor.get(`/api/designatedplan/getnewcourse`, { params: params });
    }
    getAllGroupCourse(params?: any, page?: Pagination<Course>): Observable<Pagination<Course>> {
        params = params || {};
        if (page) {
            params['size'] = page.size;
            params['page'] = page.number;
        };
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(this.url + `/groups`, { params: param });
    }

    publish(ids: number[]) {
        return this.batchOperate('publish', ids);
    }

    disPublish(ids: number[]) {
        return this.batchOperate('disPublish', ids);
    }

    archive(ids: number[]) {
        return this.batchOperate('archive', ids);
    }

    disArchive(ids: number[]) {
        return this.batchOperate('disArchive', ids);
    }

    initMaterialGroup(id: number) {
        return this.httpAdaptor.post(`${this.url}/${id}/initMaterialGroup`, null);
    }

    getCourseCode(params?: any): Observable<any> {
        params = params || {};
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(this.url + `/courseCode`, { params: param });
    }
}

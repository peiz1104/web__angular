import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService, HttpAdaptor } from "app/core";
import { FormDataUtil } from '../../core/utils/form-data-util';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Pagination, HttpUtils } from '../../core';
import { Teacher } from '../entity/teacher';
import { User } from 'app/system/entity/user';


@Injectable()
export class TeacherService extends BaseService<Teacher> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/teacher');
    }
    pageList(params?: any): Observable<Pagination<Teacher>> {
        return this.http.get('/api/teacher', { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    pageUserList(params?: any): Observable<Pagination<User>> {
        return this.http.get('/api/teacher/user/list', { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    delete(id: number | number[]): Observable<void> {
        if (id instanceof Number) {
            id = [].push(id);
        }
        return this.http.delete('/api/teacher/', { params: { ids: id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    get(Id: number): Observable<Teacher> {
        return this.http.get(`/api/teacher/${Id}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    add(teacher: Teacher): Observable<Teacher> {
        return this.http.put('/api/teacher', teacher)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    update(teacher): Observable<Teacher> {
        return this.http.post(`/api/teacher/${teacher.id}`, teacher)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    users(api?: string, params?: any): Observable<Pagination<any>> {
        let url = api || '/api/employment/documents/add/teacher/list';

        return this.httpAdaptor.get(url, { params: params })
            .catch(HttpUtils.handleError);
    }
    // 提交讲师表单
    adddocumentput(params) {
        let formData: FormData = FormDataUtil.covert(params);
        return this.httpAdaptor.put(`/api/employment/documents`, params)
            .catch(HttpUtils.handleError);
    }
    // 获取编辑任聘信息
    geteditdetail(id) {
        return this.httpAdaptor.get(`/api/employment/documents/${id}`)
    }

    // 编辑保存
    updatedocumentput(params, id) {
        return this.httpAdaptor.post(`/api/employment/documents/${id}`, null, { params: params })
            .catch(HttpUtils.handleError);
    }

}

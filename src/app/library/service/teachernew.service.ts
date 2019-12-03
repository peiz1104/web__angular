import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService, HttpAdaptor } from "app/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Pagination, HttpUtils } from '../../core';
import { User } from 'app/system/entity/user';
import { FormDataUtil } from 'app/core/utils/form-data-util';


@Injectable()
export class TeachernewService extends BaseService<any> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/office/qualifications');
    }
    pageList(params?: any): Observable<Pagination<any>> {
        return this.http.get(this.url, { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    delete(id: number | number[]): Observable<void> {
        if (id instanceof Number) {
            id = [].push(id);
        }
        return this.http.delete(this.url, { params: { ids: id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    get(Id: number): Observable<any> {
        return this.http.get(`${this.url}/${Id}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    add(params: any): Observable<any> {
        return this.http.post(`${this.url}`, null, { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    update(id, params?: any): Observable<any> {
        return this.http.post(`${this.url}/${id}`, null, { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    recover(id: number | number[], status): Observable<void> {
        if (id instanceof Number) {
            id = [].push(id);
        }
        let param = {
            ids: id,
            status: status
        }
        return this.http.post(`${this.url}/update/status`, null, { params: param })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    isHas(id): Observable<any> {
        return this.http.get(`${this.url}/by/user/${id}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }


    //导出exl
    exportExl(param) {
        return this.httpAdaptor.post(`${this.url}/export`, null, { params: param });

    }

    //正式导出
    exportdownload(sessionName:any) {
        window.location.href = this.url + '/exportdownload?sessionName=' + sessionName;
    }

    //导入exl
    import(taskKey: string) {
        return this.httpAdaptor.put(`${this.url}/saveImport`, null, { params: { taskKey: taskKey } });
    }

    //导入进度
    importProgress(taskKey: string): Observable<any> {
        return this.httpAdaptor.get(`${this.url}/importProgress`, { params: { taskKey: taskKey } });
    }

    //下载模板
    download() {
        window.location.href = this.url + '/download';
    }

}
@Injectable()
export class TeacherPartService extends BaseService<any> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/teacher/management');
    }
    pageList(params?: any): Observable<Pagination<any>> {
        let param = FormDataUtil.searchParamFilter(params);
        return this.http.get(this.url, { params: param })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    delete(id: number | number[]): Observable<void> {
        if (id instanceof Number) {
            id = [].push(id);
        }
        return this.http.delete(this.url, { params: { ids: id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    get(Id: number): Observable<any> {
        return this.http.get(`${this.url}/${Id}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    add(params: any): Observable<any> {
        let param = FormDataUtil.searchParamFilter(params);
        return this.http.post(`${this.url}`, null, { params: param })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    addExternal(params: any): Observable<any> {
        let param = FormDataUtil.searchParamFilter(params);
        return this.http.post(`${this.url}/external/add`, null, { params: param })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    update(id, params?: any): Observable<any> {
        let param = FormDataUtil.searchParamFilter(params);
        return this.http.post(`${this.url}/${id}`, null, { params: param })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    recover(id: number | number[], status): Observable<void> {
        if (id instanceof Number) {
            id = [].push(id);
        }
        let param = {
            ids: id,
            status: status
        }
        return this.http.post(`${this.url}/update/status`, null, { params: param })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    isHas(id): Observable<any> {
        return this.http.get(`${this.url}/user/${id}/isexist`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    isPublish(id, param) {
        return this.http.post(`${this.url}/${id}/update/publish/status`, null, { params: param })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

  // 讲师列表按课程模糊查询
    getqueryCourse(params) {
        let param = FormDataUtil.searchParamFilter(params);
        return this.http.get(`/api/courses/`, { params: param })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }


    getCourse(params,teacherId) {
        let param = FormDataUtil.searchParamFilter(params);
        return this.http.get(`/api/teacher/empowerment/${teacherId}/list/authorization`, { params: param })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    isHasCourse(teacherId, courseId): Observable<String> {
        return this.http.get(`/api/teacher/empowerment/course/${courseId}/isexist/${teacherId}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    saveCourse(teacherId, courseIds) {
        let param = FormDataUtil.covert( {courseIds:courseIds});
        return this.http.post(`/api/teacher/empowerment/course/add/${teacherId}`, param )
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    lookCourse(params, teacherId) {
        let param = FormDataUtil.searchParamFilter(params);
        return this.http.get(`/api/teacher/empowerment/${teacherId}/list`, { params: param })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    deleteCourseTeacher(teacherId, courseId) {
        return this.http.post(`/api/teacher/empowerment/${teacherId}/course/${courseId}/delete`, null)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

        //下载模板
        download() {
            window.location.href = this.url + '/download';
        }
    
    //导入exl
    import(taskKey: string) {
        return this.httpAdaptor.put(`${this.url}/saveImport`, null, { params: { taskKey: taskKey } });
    }

    //导入进度
    importProgress(taskKey: string): Observable<any> {
        return this.httpAdaptor.get(`${this.url}/importProgress`, { params: { taskKey: taskKey } });
    } 

    // 获取登录人站点信息
    userToken(){
        return this.httpAdaptor.get(`${this.url}/get/userToken`);
    }

    // 外部讲师证件号是否已经存在
    vaildCardNumber(params:any){
        return this.httpAdaptor.get(`${this.url}/by/cardNumber`,{ params: params});
    }

       //导出exl
       exportExl(params) {
        return this.httpAdaptor.post(`${this.url}/export`, null, { params: params });

    }

    //正式导出
    exportdownload(sessionKey:any) {
        window.location.href = this.url + '/exportImpl?sessionName=' + sessionKey ;
    }



}

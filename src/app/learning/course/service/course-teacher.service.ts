import { Pagination, FormDataUtil } from 'app/core';
import { Teacher } from './../entity/teacher';
import { HttpAdaptor } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CourseTeacherService {
    constructor(private httpAdaptor: HttpAdaptor) { }
    list(courseId: number, params?: any): Observable<Teacher[]> {
        return this.httpAdaptor.get(`/api/courses/${courseId}/teachers`);
    }
    pageListByCourseId(courseId: number, params?: any){
        return this.httpAdaptor.get(`/api/courses/${courseId}/teachers/page/list`, { params: params });
    }
    pageList(params?: any): Observable<Teacher[]> {
        return this.httpAdaptor.get(`/api/teacher/management/chooseTeacher`, { params: params });
    }
    add(courseId: number, teachers: number[]): Observable<any> {
        return this.httpAdaptor.put(`/api/traingclass/course/${courseId}/teachers`, null, { params: { teacherId: teachers } });
    }

    delete(courseId: number, teachers: number[]): Observable<any> {
        return this.httpAdaptor.delete(`/api/traingclass/course/${courseId}/teachers/delete`, { params: { teacherId: teachers } });
    }

    lookupList(courseId: number, search?: any, page?: any): Observable<Pagination<Teacher>> {
        let searchs = FormDataUtil.searchParamFilter(search);
        return this.httpAdaptor.get(`/api/courses/${courseId}/teachers/lookupTea`, { params: searchs });
    }
    getIsLook(courseId: number, turnAuthorization: string): Observable<String> {
      return this.httpAdaptor.get(`/api/courses/${courseId}/teachers/getislook`, { params: {turnAuthorization: turnAuthorization} });
    }
}

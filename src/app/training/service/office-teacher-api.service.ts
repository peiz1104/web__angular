import { HttpAdaptor } from 'app/core';
import { BaseService } from 'app/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Pagination } from 'app/core/entity/pagination';
import { Teacher } from 'app/library/entity/teacher';
import { FormDataUtil } from 'app/core/utils/form-data-util';
@Injectable()
export class OfficeTeacherApiService extends BaseService<Teacher> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/teacher');
    }

    getAllCourses(teacherId: number, params?: any): Observable<any> {
        let param = FormDataUtil.searchParamFilter(params);
        return this.httpAdaptor.get(`/api/teacher/courses/${teacherId}`, { params: param });
    }
    getTeacherInfo(teacherId: number): Observable<any> {
        return this.httpAdaptor.get(`/api/teacher/info/${teacherId}`);
    }
}


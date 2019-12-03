import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseService, HttpAdaptor } from "app/core";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Pagination, HttpUtils } from '../../core';
import { Teacher } from '../entity/teacher';
import { User } from 'app/system/entity/user';


@Injectable()
export class TeacherGrantService extends BaseService<Teacher> {
    constructor(protected httpAdaptor: HttpAdaptor) {
        super(httpAdaptor.http, httpAdaptor, '/api/teacher/management');
    }
    pageList(params?: any): Observable<Pagination<Teacher>> {
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
}

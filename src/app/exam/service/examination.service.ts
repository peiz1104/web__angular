/**
 * 考试管理的API
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpAdaptor } from '../../core/http/http-adaptor';

@Injectable()
export class ExaminationManagementService {
    constructor(private http: HttpAdaptor) { }

    // 字典列表  获取字典列表
    getDictionariesList(type?: string): Observable<any> {
        return this.http.get('/api/exam/manager/getDictionaries', { params: { dicType: type } });
    }
}

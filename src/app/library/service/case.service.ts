import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Pagination, HttpUtils } from '../../core';
import { CaseInfo } from 'app/library/entity/case-info';
import { Params } from '@angular/router';
import { BaseService } from '../../core/service/base.service';
import { HttpAdaptor } from '../../core/http/http-adaptor';
import { FormDataUtil } from 'app/core';

@Injectable()
export class CaseInfoService {

    constructor(private http: Http) { }

    pageList(params?: any): Observable<Pagination<CaseInfo>> {
        console.log(params);
        return this.http.get('/api/cases', { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    searchData(params?: any): Observable<Pagination<CaseInfo>> {
        return this.http.get('/api/cases/search', { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    get(Id: number): Observable<CaseInfo> {
        return this.http.get(`/api/cases/one`, { params: { id: Id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    add(caseInfo: CaseInfo): Observable<CaseInfo> {
        return this.http.put('/api/cases', caseInfo)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    update(caseInfo: CaseInfo): Observable<CaseInfo> {
        if (!caseInfo.id) {
            Observable.throw('The id of case for upload must not be null');
        }
        let params = FormDataUtil.covert(caseInfo);
        return this.http.post(`/api/cases/${caseInfo.id}`, params)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    delete(id: number[]): Observable<void> {
        return this.http.delete('/api/cases/', { params: { ids: id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    publish(id: number[]): Observable<void> {
        let formdata = new FormData();
        formdata.append("ids", id.toString());
        return this.http.post('/api/cases/publish', formdata)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    disPublish(id: number[]): Observable<void> {
        let formdata = new FormData();
        formdata.append("ids", id.toString());
        return this.http.post('/api/cases/disPublish', formdata)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    deleteFile(id: number): Observable<void> {
        return this.http.get('/api/cases/deleteFile', { params: { id: id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    citeCase(params?: any): Observable<Pagination<CaseInfo>> {
        return this.http.get('/api/cases/cite', { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    caseImport(fullPath: string): Observable<Pagination<CaseInfo>> {
        return this.http.get('/api/cases/excelImport', { params: { fullPath: fullPath } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    saveImport(fullPath: string): Observable<Pagination<CaseInfo>> {
        return this.http.get('/api/cases/excelSave', { params: { fullPath: fullPath } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    codeExist(code: string): Observable<boolean> {
        return this.http.get(`/api/cases/caseCode`, { params: { caseCode: code } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    nameExist(name: string): Observable<boolean> {
        return this.http.get(`/api/cases/caseName`, { params: { caseName: name } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
}

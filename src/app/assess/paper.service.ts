import { FormDataUtil } from 'app/core/utils/form-data-util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpUtils } from '../core/http/http-utils';
import { Http } from '@angular/http';
import { Pagination } from 'app/core';
import { Paper } from './paper.model';
import { Assess } from 'app/assess/assess.model';

@Injectable()
export class PaperService {

    constructor(private http: Http) { }

    list(params?: any): Observable<Pagination<Paper>> {
        return this.http.get('/api/assess/papers', { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    get(id: any): Observable<Paper> {
        return this.http.get(`/api/assess/papers/${id}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    add(paper: Paper): Observable<Paper> {
        return this.http.put("/api/assess/papers", paper)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    edit(paper: Paper): Observable<Paper> {
        if (!paper.id) {
            throw Error('Id of Paper for update must exist.');
        }
        let formdata = FormDataUtil.covert(paper);
        return this.http.post(`/api/assess/papers/${paper.id}`, formdata)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    copy(paperId: number): Observable<Paper> {
        return this.http.post(`/api/assess/papers/${paperId}/copy`, paperId)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    delete(id: number | number[]): Observable<Boolean> {
        if (id instanceof Number) {
            id = [].push(id);
        }
        return this.http.delete('/api/assess/papers', { params: { ids: id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    getIsPublished(ids: number[]): Observable<Boolean> {
        return this.http.get('/api/assess/papers/isPublished', { params: { ids: ids } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    publish(ids: number[]): Observable<void> {
        return this.http.post(`/api/assess/papers/publish`, ids)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    publishList(params?: any): Observable<Pagination<Paper>> {
        let formData = FormDataUtil.searchParamFilter(params);
        return this.http.get('/api/assess/papers/publish', { params: formData })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    disPublish(ids: number[]): Observable<void> {
        return this.http.post(`/api/assess/papers/disPublish`, ids)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }


    // 培训班评估问卷
    trainList(trainingId, params?: any): Observable<Pagination<Assess>> {
        let formData = FormDataUtil.searchParamFilter(params);
        return this.http.get(`/api/offering/assess/list`, { params: formData })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    trainDelete(param?: any): Observable<void> {
        let formdata = FormDataUtil.covert(param);
        return this.http.post(`/api/offering/assess/${param.offeringId}/delete`, formdata)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    trainEdit(assess: Assess): Observable<Assess> {
        if (!assess.id) {
            throw Error('Id of Assess for update must exist.');
        }
        let formdata = FormDataUtil.covert(assess);
        return this.http.post(`/api/offering/assess/update`, formdata)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    trainPublishList(params?: any): Observable<Pagination<Assess>> {
        return this.http.get(`/api/offering/assess/template/list`, { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    copySourse(trainingId, params?: any): Observable<any> {
        let formdata = FormDataUtil.covert(params);
        return this.http.post(`/api/offering/assess/${trainingId}/copy`, formdata);
    }
    getTotalAnswer(offeringId: number, paperId: number): Observable<any> {
        return this.http.get(`/api/assess/${offeringId}/totalAnswer/${paperId}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }


    // 培训班课程评估
    trainCourseList(params?: any): Observable<any> {
        let formData = FormDataUtil.searchParamFilter(params);
        return this.http.get(`/api/offering/assess/tbcCourseAssess/list`, { params: formData })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    // 培训班讲师评估
    trainTeacherList(params?: any): Observable<any> {
        let formData = FormDataUtil.searchParamFilter(params);
        return this.http.get(`/api/offering/assess/tbcTeacherAssess/list`, { params: formData })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
}

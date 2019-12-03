import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpUtils } from '../core/http/http-utils';
import { Http } from '@angular/http';
import { Pagination } from 'app/core';
import { AssessPaper } from './assessPaper.model';
import { FormDataUtil } from 'app/core/utils/form-data-util';

@Injectable()
export class AssessService {

    assessType: string;
    constructor(private http: Http) { }

    list(params?: any): Observable<Pagination<AssessPaper>> {
        return this.http.get('/api/assess/list', { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    get(id: number): Observable<AssessPaper> {
        return this.http.get(`/api/assess/${id}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    add(assessPaper: AssessPaper): Observable<AssessPaper> {
        return this.http.put("/api/assess/create", assessPaper)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    edit(assessPaper: AssessPaper): Observable<AssessPaper> {
        if (!assessPaper.id) {
            throw Error('Id of AssessPaper for update must exist.');
        }
        let formdata = FormDataUtil.covert(assessPaper);
        return this.http.post(`/api/assess/update`, formdata)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    confirmPublish(id: number): Observable<any> {
        return this.http.get(`/api/assess/${id}/questions`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    setDefault(assessId: number, assessType: any): Observable<AssessPaper> {
        let params = {
            assessType: assessType
        }
        let formdata = FormDataUtil.covert(params);
        return this.http.post(`/api/assess/${assessId}/default`, formdata)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    cancleDefault(assessId: number): Observable<AssessPaper> {
        return this.http.post(`/api/assess/${assessId}/cancleDefault`, null)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    copy(assessId: number): Observable<AssessPaper> {
        return this.http.post(`/api/assess/assesses/copy`, assessId)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    delete(id: number | number[]): Observable<void> {
        if (id instanceof Number) {
            id = [].push(id);
        }
        return this.http.delete('/api/assess/delete', { params: { ids: id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    getIsPublished(ids: number[]): Observable<Boolean> {
        return this.http.get('/api/assess/isPublished', { params: { ids: ids } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    publish(ids: number[]): Observable<void> {
        return this.http.post(`/api/assess/publish`, ids)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    disPublish(ids: number[]): Observable<void> {
        return this.http.post(`/api/assess/disPublish`, ids)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }


    // 培训班
    trainAdd(trainingId, courseId, teacherId, assess: AssessPaper): Observable<AssessPaper> {
        let formdata = FormDataUtil.covert(assess);
        if (courseId) {
            formdata.append("courseId", courseId);
        }
        if (teacherId) {
            formdata.append("teacherId", teacherId);
        }
        return this.http.post(`/api/offering/assess/${trainingId}/add`, formdata)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    getAnalysis(paperId: number): Observable<any> {
        return this.http.get(`/api/assess/${paperId}/analysis`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    getTotalAnswer(offeringId: number, paperId: number): Observable<any> {
        return this.http.get(`/api/assess/${offeringId}/totalAnswer/${paperId}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    getSurvey(offeringId: number): Observable<any> {
        return this.http.get(`api/survey/training`, { params: { id: offeringId } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    getUserAnswerList(offeringId: number, paperId: number, params: any): Observable<any> {
        return this.http.get(`/api/assess/${offeringId}/users/${paperId}`, { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    getAnswerDetailList(optionId: number, params: any): Observable<any> {
        return this.http.get(`/api/assess/${optionId}/detail`,  { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
}

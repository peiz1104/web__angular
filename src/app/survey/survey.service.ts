import { FormDataUtil } from 'app/core/utils/form-data-util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpUtils } from '../core/http/http-utils';
import { Http } from '@angular/http';
import { Survey } from './survey.model';
import { Pagination } from 'app/core';

@Injectable()
export class SurveyService {

    constructor(private http: Http) { }

    list(params?: any): Observable<Pagination<Survey>> {
        let formData = FormDataUtil.searchParamFilter(params);
        return this.http.get('/api/survey/papers', { params: formData })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    get(id: any): Observable<Survey> {
        return this.http.get(`/api/survey/papers/${id}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    add(survey: Survey): Observable<Survey> {
        return this.http.put("/api/survey/papers", survey)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    edit(survey: Survey): Observable<Survey> {
        if (!survey.id) {
            throw Error('Id of Survey for update must exist.');
        }
        let formdata = FormDataUtil.covert(survey);
        return this.http.post(`/api/survey/papers/${survey.id}`, formdata)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    delete(id: number | number[]): Observable<Boolean> {
        if (id instanceof Number) {
            id = [].push(id);
        }
        return this.http.delete('/api/survey/papers', { params: { ids: id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    confirmPublish(id: number): Observable<any> {
        return this.http.get(`/api/assess/${id}/questions`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    getIsPublished(ids: number[]): Observable<Boolean> {
        return this.http.get('/api/survey/papers/isPublished', { params: { ids: ids } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    publish(ids: number[]): Observable<boolean> {
        return this.http.post(`/api/survey/papers/publish`, ids)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    disPublish(ids: number[]): Observable<void> {
        return this.http.post(`/api/survey/papers/disPublish`, ids)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    publishList(params?: any): Observable<Pagination<Survey>> {
        let formData = FormDataUtil.searchParamFilter(params);
        return this.http.get(`/api/survey/papers/publish`, { params: formData })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }


    // 培训班调查问卷
    trainList(trainingId, params?: any): Observable<Pagination<Survey>> {
        let formData = FormDataUtil.searchParamFilter(params);
        return this.http.get(`/api/survey/training/${trainingId}/list`, { params: formData })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    trainDelete(trainingId, id: number | number[]): Observable<void> {
        if (id instanceof Number) {
            id = [].push(id);
        }
        return this.http.delete(`/api/survey/training/${trainingId}`, { params: { ids: id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    trainPublishList(trainingId, params?: any): Observable<Pagination<Survey>> {
        let formData = FormDataUtil.searchParamFilter(params);
        return this.http.get(`/api/survey/training/${trainingId}/publish`, { params: formData })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    trainEdit(survey: Survey): Observable<Survey> {
        if (!survey.id) {
            throw Error('Id of Survey for update must exist.');
        }
        let formdata = FormDataUtil.covert(survey);
        return this.http.post(`/api/survey/training/${survey.id}`, formdata)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    copySourse(trainingId, params?: any): Observable<any> {
        return this.http.post(`/api/survey/training/${trainingId}/copy`, params)
    }
    getTotalAnswer(offeringId: number, paperId: number): Observable<any> {
        return this.http.get(`/api/assess/${offeringId}/totalAnswer/${paperId}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
}

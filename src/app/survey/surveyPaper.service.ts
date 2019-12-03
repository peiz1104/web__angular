import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpUtils } from '../core/http/http-utils';
import { Http } from '@angular/http';
import { SurveyPaper } from './surveyPaper.model';
import { Pagination, FormDataUtil, HttpAdaptor } from 'app/core';

@Injectable()
export class SurveyPaperService {
    constructor(private http: Http, private httpAdaptor: HttpAdaptor) { }
    list(params?: any): Observable<Pagination<SurveyPaper>> {
        return this.http.get('/api/survey/surveys', { params: params })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    get(id: any): Observable<SurveyPaper> {
        return this.http.get(`/api/survey/surveys/${id}`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    add(surveyPaper: SurveyPaper): Observable<SurveyPaper> {
        console.log(surveyPaper)
        return this.http.put("/api/survey/surveys", surveyPaper)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    edit(surveyPaper: SurveyPaper): Observable<SurveyPaper> {
        if (!surveyPaper.id) {
            throw Error('Id of Survey for update must exist.');
        }
        let formdata = FormDataUtil.covert(surveyPaper);
        return this.http.post(`/api/survey/surveys/${surveyPaper.id}`, formdata)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    confirmPublish(id: number): Observable<any> {
        return this.http.get(`/api/assess/${id}/questions`)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    delete(id: number | number[]): Observable<void> {
        if (id instanceof Number) {
            id = [].push(id);
        }
        return this.http.delete('/api/survey/surveys', { params: { ids: id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    copy(survey: SurveyPaper): Observable<void> {
        return this.http.post('/api/survey/surveys/copy', survey)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    getIsPublished(ids: number[]): Observable<Boolean> {
        return this.http.get('/api/survey/surveys/isPublished', { params: { ids: ids } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    publish(ids: number[]): Observable<void> {
        return this.http.post(`/api/survey/surveys/publish`, ids)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    disPublish(ids: number[]): Observable<void> {
        return this.http.post(`/api/survey/surveys/disPublish`, ids)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    // 培训班调查
    trainGet(id: any): Observable<SurveyPaper> {
        return this.http.get(`/api/survey/training`, { params: { id: id } })
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    trainAdd(trainingId, survey: SurveyPaper): Observable<SurveyPaper> {
        return this.http.put(`/api/survey/training/${trainingId}`, survey)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    trainEdit(survey: SurveyPaper): Observable<SurveyPaper> {
        if (!survey.id) {
            throw Error('Id of Survey for update must exist.');
        }
        let formdata = FormDataUtil.covert(survey);
        return this.http.post(`/api/survey/training/${survey.id}`, formdata)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }

    addFromTpl(surveyIds: number[]): Observable<void> {
        return this.httpAdaptor.post(`/api/survey/surveys/addFromTpl`, null, { params: { surveyIds: surveyIds } });
    }
    publishSurvey(ids: number[]): Observable<void> {
        return this.http.post(`/api/survey/surveys/publishSurvey`, ids)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
    disPublishSurvey(ids: number[]): Observable<void> {
        return this.http.post(`/api/survey/surveys/disPublishSurvey`, ids)
            .map(HttpUtils.extractData)
            .catch(HttpUtils.handleError);
    }
}
